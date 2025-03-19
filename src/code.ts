/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
  width: 400,
  height: 500,
  themeColors: true,
});

import { createParentFrame } from './lib/createFlow';
import { generateDesign } from './services/openai';
import { PluginMessage } from './types';
import { ChildType, LLMResponseType } from './types/llmResponseType';

function parseNumberedList(input: string): string[] {
  return input
    .split('\n')
    .map((line) => line.replace(/^\d+\.\s*/, ''))
    .filter((line) => line.trim() !== '');
}

figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        figma.notify('Generating design...');

        console.log(parseNumberedList(msg.prompt));
        // const designSpec: LLMResponseType = await generateDesign(msg.prompt);

        // const createdFrames: FrameNode[] = [];

        // const flowDetails = designSpec.flows;
        // for (const flowDetail of flowDetails) {
        //   if (flowDetail.type === ChildType.PARENT) {
        //     const flowFrame = figma.createFrame();
        //     figma.currentPage.appendChild(flowFrame);
        //     createdFrames.push(flowFrame);
        //     await createParentFrame(flowDetail, flowFrame);
        //   }
        // }
      case 'cancel':
        figma.closePlugin();
        break;
    }
  } catch (error) {
    console.error('Failed to generate design:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    figma.notify('Failed to generate design: ' + errorMessage, { error: true });
  }
};
