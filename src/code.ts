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
  FrameLayout
} from './types';

import { 
  buttonRegistry, 
  getButtonKey, 
  createButtonProperties,
  getDropdownKey,
  createDropdownProperties,
  getInputFieldKey,
  createInputFieldProperties
} from './componentRegistry';

import { 
  isButtonProperties,
  isBreadcrumbsProperties,
  isDropdownsProperties,
  isSelectionProperties,
  isCursorsProperties,
  isInputFieldsProperties
} from './utils';

import { generateDesign } from './services/openai';

async function createComponent(parent: FrameNode, spec: ComponentSpec): Promise<InstanceNode | null> {
  try {
    const component = await figma.importComponentByKeyAsync(spec.key);
    if (!component) {
      console.error(`Component not found for key: ${spec.key}`);
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
          "Label Text#9987:546": spec.properties.label || "",
          "Text Placeholder#10157:2": spec.properties.placeholder || ""
        };
        console.log('Setting Dropdown properties:', props);
        instance.setProperties(props);
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
  // Create frame
  const frame = figma.createFrame();
  frame.name = frameSpec.name;
  
  // Set width (ensure minimum of 0.01)
  const width = Math.max(frameSpec.width, 0.01);
  frame.resize(width, 0.01); // Initially set minimum height
  
  // Set background if specified
  if (frameSpec.background) {
    frame.fills = [{
      type: 'SOLID',
      color: frameSpec.background.color,
      opacity: frameSpec.background.opacity
    }];
  }

  // Set layout properties
  if (frameSpec.layout.type !== "NONE") {
    frame.layoutMode = frameSpec.layout.type;
    frame.primaryAxisAlignItems = frameSpec.layout.alignment.primary;
    frame.counterAxisAlignItems = frameSpec.layout.alignment.counter;
    frame.itemSpacing = frameSpec.layout.itemSpacing;
    
    // Set padding
    frame.paddingTop = frameSpec.layout.padding.top;
    frame.paddingRight = frameSpec.layout.padding.right;
    frame.paddingBottom = frameSpec.layout.padding.bottom;
    frame.paddingLeft = frameSpec.layout.padding.left;

    // Set sizing modes
    frame.primaryAxisSizingMode = frameSpec.height === 0.01 ? "AUTO" : "FIXED";
    frame.counterAxisSizingMode = frameSpec.width === 0.01 ? "AUTO" : "FIXED";
  }

  // Create child frames recursively
  if (frameSpec.children) {
    for (const childSpec of frameSpec.children) {
      const childFrame = await createFrameWithComponents(childSpec);
      frame.appendChild(childFrame);
    }
  }

  // Create components within this frame
  if (frameSpec.components) {
    for (const component of frameSpec.components) {
      await createComponent(frame, component);
    }
  }

  // If height is not auto (0.01), set it to specified height
  if (frameSpec.height !== 0.01) {
    frame.resize(frame.width, Math.max(frameSpec.height, frame.height));
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