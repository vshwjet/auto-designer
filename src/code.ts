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

figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        figma.notify('Generating design...');
        const designSpec: LLMResponseType = await generateDesign(msg.prompt);
          // console.log(designSpec);

        const createdFrames: FrameNode[] = [];

        const flows = designSpec.flows;
        for (const flow of flows) {
          if (flow.type === ChildType.PARENT) {
            const flowNode = await createParentFrame(flow);
            createdFrames.push(flowNode);
          }
        }



        figma.viewport.scrollAndZoomIntoView(createdFrames);


        // ------------------------------------------------------------
        // console.log('Creating sample');
        // const parentFrame = figma.createFrame();
        // parentFrame.name = 'Parent Frame';
        // parentFrame.layoutMode = 'HORIZONTAL';
        // parentFrame.primaryAxisSizingMode = 'AUTO';
        // parentFrame.counterAxisSizingMode = 'AUTO';
        // parentFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      
        // parentFrame.paddingLeft = 20;
        // parentFrame.paddingRight = 20;
        // parentFrame.paddingTop = 20;
        // parentFrame.paddingBottom = 20;
        // parentFrame.itemSpacing = 10;
      
        // const childFrame1 = figma.createFrame();
        // childFrame1.name = 'Child Frame 1';
        // childFrame1.layoutMode = 'HORIZONTAL';
        // childFrame1.layoutGrow = 1;
        // childFrame1.primaryAxisSizingMode = 'AUTO';
        // childFrame1.counterAxisSizingMode = 'AUTO';
        // childFrame1.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];
      
        // const rectangle = figma.createRectangle();
        // rectangle.resize(500, 500);
        // rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      
        // childFrame1.appendChild(rectangle);
        // rectangle.constraints = { horizontal: 'MIN', vertical: 'CENTER' };
      
        // parentFrame.appendChild(childFrame1);
        // figma.currentPage.appendChild(parentFrame);
      
        // console.log('Done');
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

const createSample = () => {
  const parentFrame = figma.createFrame();
  parentFrame.name = 'Parent Frame';
  parentFrame.layoutMode = 'HORIZONTAL';
  parentFrame.primaryAxisSizingMode = 'AUTO';
  parentFrame.counterAxisSizingMode = 'AUTO';
  parentFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  parentFrame.paddingLeft = 20;
  parentFrame.paddingRight = 20;
  parentFrame.paddingTop = 20;
  parentFrame.paddingBottom = 20;
  parentFrame.itemSpacing = 10;

  const childFrame1 = figma.createFrame();
  childFrame1.name = 'Child Frame 1';
  childFrame1.layoutMode = 'HORIZONTAL';
  childFrame1.layoutGrow = 1;
  childFrame1.primaryAxisSizingMode = 'AUTO';
  childFrame1.counterAxisSizingMode = 'AUTO';
  childFrame1.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];

  const rectangle = figma.createRectangle();
  rectangle.resize(50, 50);
  rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  childFrame1.appendChild(rectangle);
  rectangle.constraints = { horizontal: 'MIN', vertical: 'CENTER' };

  parentFrame.appendChild(childFrame1);
  figma.currentPage.appendChild(parentFrame);

  console.log('Done');
};
