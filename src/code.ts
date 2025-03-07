/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
  width: 400,
  height: 500,
  themeColors: true
});

import {
  PluginMessage,
} from './types';

import { generateDesign } from './services/openai';
import createFrameWithComponents from './lib/createFrameWithComponents';

figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        figma.notify('Generating design...');

        const designSpec = await generateDesign(msg.prompt);
        const frame = await createFrameWithComponents(designSpec.frame);

        const viewport = figma.viewport.center;
        frame.x = viewport.x - frame.width / 2;
        frame.y = viewport.y - frame.height / 2;
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