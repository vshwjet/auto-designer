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

import { ChildType, LLMResponseType } from './types/llmResponseType';
import { createParentFrame } from './lib/createFlow';

figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        figma.notify('Generating design...');

        const designSpec: LLMResponseType = await generateDesign(msg.prompt);
        console.log(designSpec)

        const createdFrames: FrameNode[] = [];


        const flows = designSpec.flows;
        for(const flow of flows){
          if(flow.type === ChildType.PARENT){
            const flowNode = await createParentFrame(flow);
            createdFrames.push(flowNode);
          }
        }

        figma.viewport.scrollAndZoomIntoView(createdFrames);

        
        // const createdFrames = await createFlows(designSpec.flows);

        // // Arrange frames horizontally with spacing
        // const FRAME_SPACING = 100; // 100 pixels gap between frames
        // let currentX = 0;

        // createdFrames.forEach((frame, index) => {
        //   frame.x = currentX;
        //   frame.y = 0; // All frames aligned to top
        //   currentX += frame.width + FRAME_SPACING;
        // });

        // const totalWidth = currentX - FRAME_SPACING; 
        // const maxHeight = Math.max(...createdFrames.map(frame => frame.height));
        // const viewport = figma.viewport.center;

        // createdFrames.forEach(frame => {
        //   frame.x += viewport.x - totalWidth / 2;
        //   frame.y = viewport.y - maxHeight / 2;
        // });

        // // Zoom viewport to show all frames
        // figma.viewport.scrollAndZoomIntoView(createdFrames);
        // figma.notify('Design generated successfully');
        // break;

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