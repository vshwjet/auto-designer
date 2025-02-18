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
  PluginMessage
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
  isCursorsProperties
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
    return instance;
  } catch (error) {
    console.error(`Error creating component: ${error}`);
    return null;
  }
}

async function createDesignFrame(designSpec: LLMResponse): Promise<FrameNode> {
  // Create frame and set up auto layout
  const frame = figma.createFrame();
  frame.name = "Generated Design";
  frame.resize(1728, 1117); // Desktop frame size
  
  // Set background fill
  frame.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 1
  }];

  // Set up auto layout
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "MIN";
  frame.primaryAxisSizingMode = "FIXED";
  frame.counterAxisSizingMode = "FIXED";
  frame.itemSpacing = 16;
  
  // Set padding
  frame.paddingLeft = 24;
  frame.paddingRight = 24;
  frame.paddingTop = 24;
  frame.paddingBottom = 24;

  // Create components
  for (const component of designSpec.components) {
    const instance = await createComponent(frame, component);
    // Components will maintain their default width
  }

  // Center frame in viewport
  const viewport = figma.viewport.center;
  frame.x = viewport.x - frame.width / 2;
  frame.y = viewport.y - frame.height / 2;

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
        const frame = await createDesignFrame(designSpec);
        
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