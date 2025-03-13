/// <reference types="@figma/plugin-typings" />

console.log('Plugin starting...');

// Show the plugin UI
figma.showUI(__html__, {
  width: 400,
  height: 500,
  themeColors: true
});

console.log('UI window created');

import {
  ButtonProperties,
  ButtonSizeValue,
  ButtonHierarchyValue,
  ButtonTypeValue,
  ButtonStateValue,
  ButtonWidthValue,
  ComponentSpec,
  CustomComponentProperties,
  LLMResponse,
  PluginMessage,
  Frame,
  FrameLayout,
  StatCardTypeValue,
  TableCellProperties,
  TableCellVariantValue,
  DesignState
} from './types';

import { 
  buttonRegistry, 
  getButtonKey, 
  createButtonProperties,
  getDropdownKey,
  createDropdownProperties,
  getInputFieldKey,
  createInputFieldProperties,
  getTableCellKey,
  createTableCellProperties
} from './componentRegistry';

import { 
  isButtonProperties,
  isBreadcrumbsProperties,
  isDropdownsProperties,
  isSelectionProperties,
  isCursorsProperties,
  isInputFieldsProperties,
  isStatCardProperties,
  isTableColumnProperties,
  isTableCellProperties
} from './utils';

import { generateDesign } from './services/openai';

// Helper function to load all Inter font styles
async function loadInterFonts() {
  const fontStyles = [
    "Thin",
    "Extra Light",
    "Light",
    "Regular",
    "Medium",
    "Semi Bold",
    "Bold",
    "Extra Bold",
    "Black"
  ];

  // Load all font styles
  await Promise.all(
    fontStyles.map(style => 
      figma.loadFontAsync({ family: "Inter", style })
    )
  );
}

async function createComponent(parent: FrameNode, spec: ComponentSpec): Promise<InstanceNode | null> {
  try {
    let key = spec.key;
    
    // Load all Inter fonts at the start
    await loadInterFonts();
    
    // Get the appropriate key based on component type and properties
    if (spec.type === "TableCell" && isTableCellProperties(spec.properties)) {
      key = getTableCellKey(spec.properties);
    }
    
    const component = await figma.importComponentByKeyAsync(key);
    if (!component) {
      console.error(`Component not found for key: ${key}`);
      return null;
    }
    const instance = component.createInstance();
    parent.appendChild(instance);

    // Set layout alignment based on stretch property or component type
    if (spec.type === "StatCard") {
      // For StatCards, set both layoutAlign and layoutGrow
      instance.layoutAlign = "STRETCH";
      instance.layoutGrow = 1; // Make StatCards share space equally in horizontal layouts
      instance.layoutSizingVertical = "HUG"; // Ensure height is always HUG
    } else if (spec.stretch) {
      instance.layoutAlign = "STRETCH";
    } else {
      instance.layoutAlign = "INHERIT";
    }

    // Set component properties based on type
    if (instance.setProperties) {
      // Debug: Log available properties
      console.log('Component type:', spec.type);
      console.log('Available properties:', instance.componentProperties);
      
      if (spec.type === "InputField" && isInputFieldsProperties(spec.properties)) {
        // Add text-related properties and boolean flags
        const props = {
          // Text properties
          "Label Text#9987:546": spec.properties.labelInfo || "",
          "Text Placeholder#10157:2": spec.properties.placeholder || "",
          "Text Filled#10157:43": spec.properties.value || "",
          // Boolean flags
          "Has Label#9987:455": spec.properties.hasLabel,
          "Has Hint#9987:637": spec.properties.hasHint,
          "Has Help Icon#9987:910": false,
          "Has Main Icon#9987:819": false,
          // Hint text (only if hint is enabled)
          "Hint Text#9987:728": spec.properties.hasHint ? spec.properties.hintText || "" : ""
        };
        console.log('Setting InputField properties:', props);
        instance.setProperties(props);
      } else if (spec.type === "Button" && isButtonProperties(spec.properties)) {
        const props = {
          // Text properties
          "Button Text#9995:0": spec.properties.label || "Button",
          // Boolean flags
          "Has Text#9995:121": true,
          "Has Leading Icon#9995:484": false,
          "Has Trailing Icon#10131:0": false,
          // Icon instances (only if icons are enabled)
          "Leading Icon#9995:363": "27158:26282",
          "Trailing Icon#10131:289": "27158:26280"
        };
        console.log('Setting Button properties:', props);
        instance.setProperties(props);
      } else if (spec.type === "Dropdown" && isDropdownsProperties(spec.properties)) {
        const props = {
          // Boolean flags
          "Has Label#10131:578": spec.properties["Has Label"],
          "Has Hint Text#10131:580": spec.properties["Has Hint Text"],
          // Text properties
          "Dropdown Label#27356:15": spec.properties["Dropdown Label"] || "",
          "Dropdown Hint#27356:64": spec.properties["Dropdown Hint"] || "",
          // Variant properties
          "Size": spec.properties.Size,
          "Hirerchey": spec.properties.Hirerchey,
          "Type": spec.properties.Type,
          "State": spec.properties.State
        };
        console.log('Setting Dropdown properties:', props);
        instance.setProperties(props);

        // Find and update the placeholder text if provided
        if (spec.properties.placeholder) {
          // Fonts are already loaded at the start of createComponent
          // Find the text node that contains the placeholder text
          const findPlaceholderTextNode = (node: SceneNode): TextNode | null => {
            if (node.type === 'TEXT' && node.characters.toLowerCase().includes('select')) {
              return node as TextNode;
            }
            if ('children' in node) {
              for (const child of node.children) {
                const result = findPlaceholderTextNode(child);
                if (result) return result;
              }
            }
            return null;
          };

          // Find the text node and update its characters
          const textNode = findPlaceholderTextNode(instance);
          if (textNode) {
            textNode.characters = spec.properties.placeholder;
          }
        }
      } else if (spec.type === "StatCard" && isStatCardProperties(spec.properties)) {
        const props = {
          // Use the exact Figma instance property names with their IDs
          "Stat Label#27356:0": spec.properties["Stat Label"] || "Stat Label",
          "Stat Value#27356:5": spec.properties["Stat Value"] || "0",
          "Stat Delta#27356:10": spec.properties["Stat Delta"] || "0%"
        };
        console.log('Setting StatCard properties:', props);
        instance.setProperties(props);
      } else if (spec.type === "TableColumn" && isTableColumnProperties(spec.properties)) {
        const props = {
          "Label#1234:0": spec.properties.label || "",
          "Value#1234:1": spec.properties.value || ""
        };
        console.log('Setting TableColumn properties:', props);
        instance.setProperties(props);
      } else if (spec.type === "TableCell" && isTableCellProperties(spec.properties)) {
        const props: { [key: string]: string | boolean } = {};
        
        // Set content based on type and variant
        if (spec.properties.type === "header") {
          props["Header Content"] = spec.properties["Header Content"] || "";
          if (spec.properties["Has Filter"]) {
            props["Has Filter"] = true;
          }
        } else {
          // Set cell content based on variant
          switch (spec.properties.variant) {
            case TableCellVariantValue.Text:
              props["Cell Content - Text"] = spec.properties["Cell Content - Text"] || "";
              break;
            case TableCellVariantValue.Amount:
              props["Cell Content - Amount"] = spec.properties["Cell Content - Amount"] || "";
              break;
            case TableCellVariantValue.Date:
              props["Cell Content - Date"] = spec.properties["Cell Content - Date"] || "";
              break;
            case TableCellVariantValue.Tag:
              props["Cell Content - Tag"] = spec.properties["Cell Content - Tag"] || "";
              break;
            case TableCellVariantValue.User:
              props["Cell Content - User"] = spec.properties["Cell Content - User"] || "";
              break;
          }
        }

        // Set icon flags
        if (spec.properties["Has Cell Icon 1"]) props["Has Cell Icon 1"] = true;
        if (spec.properties["Has Cell Icon 2"]) props["Has Cell Icon 2"] = true;
        if (spec.properties["Has Cell Icon 3"]) props["Has Cell Icon 3"] = true;
        if (spec.properties["Has Cell Icon More"]) props["Has Cell Icon More"] = true;

        console.log('Setting TableCell properties:', props);
        instance.setProperties(props);
      } else if (spec.type === "Graph") {
        // Graph component doesn't require any additional properties to be set
        console.log('Creating Graph component');
      } else {
        console.warn('Component does not support setting properties:', spec.type);
      }
    } else {
      console.warn('Component does not support setting properties:', spec.type);
    }

    return instance;
  } catch (error) {
    console.error(`Error creating component: ${error}`);
    return null;
  }
}

async function createFrameWithComponents(frameSpec: Frame): Promise<FrameNode> {
  // Create frame with auto-layout
  const frame = figma.createFrame();
  frame.name = frameSpec.name;
  
  // Set width
  const width = Math.max(frameSpec.width, 0.01);
  frame.resize(width, frameSpec.height);
  
  // Set background if specified
  if (frameSpec.background) {
    frame.fills = [{
      type: 'SOLID',
      color: frameSpec.background.color,
      opacity: frameSpec.background.opacity
    }];
  }

  // Set auto-layout properties first
  frame.layoutMode = frameSpec.layout.type || "VERTICAL"; // Ensure auto-layout is always set
  frame.primaryAxisAlignItems = frameSpec.layout.alignment.primary;
  frame.counterAxisAlignItems = frameSpec.layout.alignment.counter;
  frame.itemSpacing = frameSpec.layout.itemSpacing;
  
  // Set padding
  frame.paddingTop = frameSpec.layout.padding.top;
  frame.paddingRight = frameSpec.layout.padding.right;
  frame.paddingBottom = frameSpec.layout.padding.bottom;
  frame.paddingLeft = frameSpec.layout.padding.left;

  // Create child frames recursively
  if (frameSpec.children) {
    for (const childSpec of frameSpec.children) {
      // Ensure child frames use auto-layout
      if (!childSpec.layout.type || childSpec.layout.type === "NONE") {
        childSpec.layout.type = "VERTICAL";
      }
      const childFrame = await createFrameWithComponents(childSpec);
      frame.appendChild(childFrame);
      
      // Set child frame properties after it's added to parent
      childFrame.layoutAlign = "STRETCH";
      if (childFrame.layoutMode === "VERTICAL" || childFrame.layoutMode === "HORIZONTAL") {
        childFrame.layoutSizingHorizontal = "FILL";
      }
    }
  }

  // Create components within this frame
  if (frameSpec.components) {
    let currentTableRow: FrameNode | null = null;
    
    for (const component of frameSpec.components) {
      if (component.type === "TableCell") {
        // If this is a table cell and we don't have a current row, create one
        if (!currentTableRow) {
          currentTableRow = figma.createFrame();
          currentTableRow.name = "Table Row";
          currentTableRow.layoutMode = "HORIZONTAL"; // Set auto-layout first
          currentTableRow.itemSpacing = 0;
          currentTableRow.paddingLeft = 0;
          currentTableRow.paddingRight = 0;
          currentTableRow.paddingTop = 0;
          currentTableRow.paddingBottom = 0;
          frame.appendChild(currentTableRow); // Add to parent before setting sizing
          currentTableRow.layoutAlign = "STRETCH";
          currentTableRow.layoutSizingHorizontal = "FILL";
          currentTableRow.layoutSizingVertical = "HUG";
        }
        
        // Create the cell in the current row
        const cellInstance = await createComponent(currentTableRow, component);
        if (cellInstance) {
          cellInstance.layoutAlign = "STRETCH";
        }
      } else {
        // If this is not a table cell, reset the current row
        currentTableRow = null;
        const componentInstance = await createComponent(frame, component);
        if (componentInstance && component.stretch) {
          componentInstance.layoutAlign = "STRETCH";
        }
      }
    }
  }

  // After all components are added, set the sizing modes and adjust heights
  if (frameSpec.height === 1080) {
    // For the main frame (parent), keep fixed height
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
    frame.layoutSizingHorizontal = "FIXED";
    frame.layoutSizingVertical = "FIXED";
    frame.resize(frame.width, 1080);
  } else {
    // For child frames, use AUTO for both dimensions initially
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
    
    // Only set FILL if this is a child of an auto-layout frame
    if (frame.parent && ("layoutMode" in frame.parent) && 
        (frame.parent.layoutMode === "VERTICAL" || frame.parent.layoutMode === "HORIZONTAL")) {
      frame.layoutSizingHorizontal = "FILL";
    }
    frame.layoutSizingVertical = "HUG";
    
    // Force the frame to recalculate its size based on content
    frame.resize(frame.width, frame.height);
  }

  return frame;
}

// Initialize plugin with state management
const designState: DesignState = {
  currentFrame: null,
  frameNode: null,
  history: [],
  historyIndex: -1
};

function updateDesignState(frame: Frame, frameNode: FrameNode) {
  // Add new state to history, removing any forward history if we're not at the end
  designState.history = designState.history.slice(0, designState.historyIndex + 1);
  designState.history.push(frame);
  designState.historyIndex++;
  
  // Update current state
  designState.currentFrame = frame;
  
  // Update the existing frame instead of removing it
  if (designState.frameNode) {
    // Keep the existing frame's position
    const oldX = designState.frameNode.x;
    const oldY = designState.frameNode.y;
    
    // Remove all children from the existing frame
    while (designState.frameNode.children.length > 0) {
      designState.frameNode.children[0].remove();
    }
    
    // Copy properties from the new frame to the existing frame
    designState.frameNode.name = frameNode.name;
    designState.frameNode.resize(frameNode.width, frameNode.height);
    designState.frameNode.layoutMode = frameNode.layoutMode;
    designState.frameNode.primaryAxisAlignItems = frameNode.primaryAxisAlignItems;
    designState.frameNode.counterAxisAlignItems = frameNode.counterAxisAlignItems;
    designState.frameNode.itemSpacing = frameNode.itemSpacing;
    designState.frameNode.paddingTop = frameNode.paddingTop;
    designState.frameNode.paddingRight = frameNode.paddingRight;
    designState.frameNode.paddingBottom = frameNode.paddingBottom;
    designState.frameNode.paddingLeft = frameNode.paddingLeft;
    designState.frameNode.fills = frameNode.fills;
    
    // Move all children from the new frame to the existing frame
    while (frameNode.children.length > 0) {
      const child = frameNode.children[0];
      designState.frameNode.appendChild(child);
    }
    
    // Restore the frame's position
    designState.frameNode.x = oldX;
    designState.frameNode.y = oldY;
    
    // Remove the temporary frame
    frameNode.remove();
  } else {
    // If there's no existing frame, use the new one
    designState.frameNode = frameNode;
  }
}

// Handle messages from UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
      case 'update-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        // Check if we can do an incremental update
        if (msg.isIncremental && !designState.currentFrame) {
          throw new Error('No existing design found to update');
        }

        figma.notify(msg.isIncremental ? 'Updating design...' : 'Generating design...');
        
        // Generate design using LLM, passing current state for incremental updates
        const designSpec = await generateDesign(
          msg.prompt, 
          msg.isIncremental && designState.currentFrame ? designState.currentFrame : undefined
        );
        
        // Create the design frame with components
        const frame = await createFrameWithComponents(designSpec.frame);
        
        // Update state
        updateDesignState(designSpec.frame, frame);
        
        // Only adjust viewport for new designs
        if (!msg.isIncremental) {
          const viewport = figma.viewport.center;
          frame.x = viewport.x - frame.width / 2;
          frame.y = viewport.y - frame.height / 2;
          figma.viewport.scrollAndZoomIntoView([frame]);
        }
        
        figma.notify(msg.isIncremental ? 'Design updated successfully' : 'Design generated successfully');
        break;
        
      case 'cancel':
        figma.closePlugin();
        break;
    }
  } catch (error) {
    console.error('Failed to generate/update design:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    figma.notify('Failed to generate/update design: ' + errorMessage, { error: true });
  }
}; 