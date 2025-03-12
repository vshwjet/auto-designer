import {
  ChildType,
  LLMResponseComponentType,
  LLMResponseFrameType,
} from '../types/llmResponseType';
import { createTableFrame } from './componentCreators';
import createComponent from './createComponent';

export const createParentFrame = async (frame: LLMResponseFrameType) => {
  console.log('Creating parent frame', frame.name);

  const parentFrame = figma.createFrame();
  parentFrame.name = frame.name;

  setFrameLayoutDetails(
    parentFrame,
    frame.layout,
    frame.width,
    frame.height,
    frame.background
  );

  const children = frame.children;
  for (const child of children) {
    if (
      child.type === ChildType.FRAME ||
      child.type === ChildType.TABLE_FRAME
    ) {
      const childFrame = await createFrame(child);
      parentFrame.appendChild(childFrame);
    }
  }

  return parentFrame;
};

const createFrame = async (frame: LLMResponseFrameType) => {
  console.log(`Creating frame of type ${frame.type}`, frame.name);

  if (frame.type === ChildType.TABLE_FRAME) {
    const tableFrame = await createTableFrame(frame);
    return tableFrame;
  }

  const frameNode = figma.createFrame();
  frameNode.name = frame.name;
  setFrameLayoutDetails(
    frameNode,
    frame.layout,
    frame.width,
    frame.height,
    frame.background
  );

  if (frame.children) {
    for (const child of frame.children) {
      if (child.type === ChildType.FRAME) {
        const childFrame = await createFrame(child);
        frameNode.appendChild(childFrame);
      } else if (child.type === ChildType.COMPONENT) {
        const childComponent = await createComponent(
          frameNode,
          child as LLMResponseComponentType
        );
        if (childComponent) {
          frameNode.appendChild(childComponent);
        }
      }
    }
  }

  return frameNode;
};

const setFrameLayoutDetails = (
  frame?: FrameNode,
  layoutDetails?: LLMResponseFrameType['layout'],
  width?: number,
  height?: number,
  backgroundColor?: LLMResponseFrameType['background']
) => {
  if (!frame) return;

  if (width && height) {
    frame.resize(Math.max(width || 100, 0.01), height);
  }

  if (layoutDetails) {
    frame.layoutMode = layoutDetails.type;
    frame.paddingTop = layoutDetails.padding.top;
    frame.paddingRight = layoutDetails.padding.right;
    frame.paddingBottom = layoutDetails.padding.bottom;
    frame.paddingLeft = layoutDetails.padding.left;
    frame.itemSpacing = layoutDetails.itemSpacing;
    // frame.primaryAxisAlignItems = layoutDetails.alignment.primary;
    // frame.counterAxisAlignItems = layoutDetails.alignment.counter;
    frame.counterAxisSizingMode = 'AUTO';
    frame.primaryAxisSizingMode = 'AUTO';
  }

  if (backgroundColor) {
    frame.fills = [
      {
        type: 'SOLID',
        color: {
          r: 1,
          g: 1,
          b: 1,
        },
        opacity: backgroundColor.opacity,
      },
    ];
  }
};
