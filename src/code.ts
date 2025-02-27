/// <reference types="@figma/plugin-typings" />

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
  TableCellVariantValue
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

async function createComponent(parent: FrameNode, spec: ComponentSpec): Promise<InstanceNode | null> {
  try {
    let key = spec.key;
    
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
  // Validate layout type - enforce auto-layout
  if (!frameSpec.layout.type || frameSpec.layout.type === "NONE") {
    console.warn(`Invalid layout type: ${frameSpec.layout.type}. Defaulting to VERTICAL auto-layout.`);
    frameSpec.layout.type = "VERTICAL";
  }

  // Validate stat card consistency
  let statCardType: StatCardTypeValue | null = null;
  const validateStatCards = (components: ComponentSpec[]) => {
    components.forEach(component => {
      if (component.type === "StatCard" && isStatCardProperties(component.properties)) {
        if (statCardType === null) {
          statCardType = component.properties.Type;
        } else if (statCardType !== component.properties.Type) {
          console.warn(`Inconsistent stat card types detected. Converting ${component.properties.Type} to ${statCardType} for consistency.`);
          component.properties.Type = statCardType;
        }
      }
    });
  };

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

  // Set auto-layout properties
  frame.layoutMode = frameSpec.layout.type; // Will be either "VERTICAL" or "HORIZONTAL"
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
          currentTableRow.layoutMode = "HORIZONTAL";
          currentTableRow.itemSpacing = 0; // No spacing between columns
          currentTableRow.paddingLeft = 0;
          currentTableRow.paddingRight = 0;
          currentTableRow.paddingTop = 0;
          currentTableRow.paddingBottom = 0;
          currentTableRow.layoutSizingHorizontal = "HUG";
          currentTableRow.layoutSizingVertical = "HUG";
          currentTableRow.layoutAlign = "STRETCH";
          frame.appendChild(currentTableRow);
        }
        
        // Create the cell in the current row
        const cellInstance = await createComponent(currentTableRow, component);
        if (cellInstance) {
          cellInstance.layoutAlign = "STRETCH";
        }
      } else {
        // If this is not a table cell, reset the current row
        currentTableRow = null;
        await createComponent(frame, component);
      }
    }
  }

  // After all components are added, set the sizing modes and adjust heights
  // For the main frame (parent), keep fixed height
  if (frameSpec.height === 1080) {
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
    frame.layoutSizingHorizontal = "FIXED";
    frame.layoutSizingVertical = "FIXED";
    frame.resize(frame.width, 1080);
  } else {
    // For child frames, use HUG content
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "FIXED";
    frame.layoutSizingHorizontal = "HUG";
    frame.layoutSizingVertical = "HUG";
    frame.layoutAlign = "STRETCH";
    
    // Force the frame to recalculate its size based on content
    frame.resize(frame.width, frame.height);
  }

  return frame;
}

// Initialize plugin
figma.showUI(__html__, { width: 400, height: 500 });

// Handle messages from UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        figma.notify('Generating design...');
        
        // Generate design using LLM
        const designSpec = await generateDesign(msg.prompt);
        
        // Create the design frame with components
        const frame = await createFrameWithComponents(designSpec.frame);
        
        // Center the frame in viewport
        const viewport = figma.viewport.center;
        frame.x = viewport.x - frame.width / 2;
        frame.y = viewport.y - frame.height / 2;
        
        // Center the view on the generated design
        figma.viewport.scrollAndZoomIntoView([frame]);
        
        figma.notify('Design generated successfully');
        break;
        
      case 'cancel':
        figma.closePlugin();
        break;
    }
  } catch (error) {
    console.error('Failed to generate design:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    figma.notify('Failed to generate design: ' + errorMessage, { error: true });
  }
}; 