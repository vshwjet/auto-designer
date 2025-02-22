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

async function createFrameWithComponents(frameSpec: Frame): Promise<FrameNode> {
  // Create frame
  const frame = figma.createFrame();
  frame.name = frameSpec.name;
  
  // Ensure minimum dimensions (Figma requires at least 0.01)
  const width = Math.max(frameSpec.width, 0.01);
  const height = Math.max(frameSpec.height, 0.01);
  frame.resize(width, height);
  
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

    // For frames with auto-layout, set sizing mode
    frame.primaryAxisSizingMode = height === 0.01 ? "AUTO" : "FIXED";
    frame.counterAxisSizingMode = width === 0.01 ? "AUTO" : "FIXED";
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