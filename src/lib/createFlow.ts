import {
  ChildType,
  LLMResponseComponentType,
  LLMResponseFrameType,
} from '../types/llmResponseType';
import { createTableFrame } from './componentCreators';
import createComponent from './createComponent';

export const createParentFrame = async (
  sectionDetails: LLMResponseFrameType,
  artboard: FrameNode
) => {
  const sectionFrame = figma.createFrame();
  sectionFrame.name = sectionDetails.name;
  artboard.appendChild(sectionFrame);

  // artboard.primaryAxisAlignItems = sectionDetails.layout?.alignment?.primary;
  // artboard.counterAxisAlignItems = sectionDetails.layout?.alignment?.counter;

  if(sectionDetails.type === ChildType.TABLE_FRAME ){
    sectionFrame.layoutMode = "HORIZONTAL";
    sectionFrame.layoutSizingHorizontal = "FILL";
    sectionFrame.layoutSizingVertical = "HUG";
    await createTableFrame(sectionDetails, sectionFrame)
    return;
  }

  setFrameLayoutDetails(
    sectionFrame,
    sectionDetails.layout,
    sectionDetails.width,
    sectionDetails.height,
    sectionDetails.background
  );
  
  sectionFrame.layoutSizingHorizontal = "FILL"
  sectionFrame.layoutSizingVertical = "HUG"



  const children = sectionDetails.children;
  
  for (const childDetails of children) {
    if (
      childDetails.type === ChildType.FRAME || childDetails.type === ChildType.TABLE_FRAME
    ) {
      const childFrame = figma.createFrame();
      sectionFrame.appendChild(childFrame);
      await createFrame(childDetails, childFrame);
    } else if (childDetails.type === ChildType.COMPONENT) {
      const childComponent = await createComponent(sectionFrame, childDetails as LLMResponseComponentType);
      if(childComponent) {
        sectionFrame.appendChild(childComponent);
        applyComponentSpecificProperties(childComponent, childDetails as LLMResponseComponentType);
      }
    }
  }
};


const createFrame = async (frameData: LLMResponseFrameType, currFrame: FrameNode) => {
  if(frameData.type === ChildType.TABLE_FRAME) {
    currFrame.layoutMode = "HORIZONTAL";
    currFrame.layoutSizingHorizontal = "FILL";
    currFrame.layoutSizingVertical = "HUG";
    currFrame.itemSpacing = 0;
    await createTableFrame(frameData, currFrame)
    return;
  }

  currFrame.name = frameData.name;
  setFrameLayoutDetails(
    currFrame,
    frameData.layout,
    frameData.width,
    frameData.height,
    frameData.background
  )

  currFrame.layoutMode = frameData.layout?.type; 
  currFrame.layoutSizingHorizontal = "FILL"
  currFrame.layoutSizingVertical = "HUG"

  if(!frameData.children || frameData.children.length === 0) return;

  for(const child of frameData.children){
    if(child.type === ChildType.FRAME) {
      const childFrame = figma.createFrame();
      currFrame.appendChild(childFrame);
      await createFrame(child, childFrame);
    } else if(child.type === ChildType.COMPONENT) {
      const childComponent = await createComponent(currFrame, child as LLMResponseComponentType);
    
      if(childComponent) {
        currFrame.appendChild(childComponent);
        applyComponentSpecificProperties(childComponent, child as LLMResponseComponentType);
      }
    }
  }
  return currFrame;
}

const setFrameLayoutDetails = (
  frame?: FrameNode,
  layoutDetails?: LLMResponseFrameType['layout'],
  width?: number,
  height?: number,
  backgroundColor?: LLMResponseFrameType['background']
) => {
  if (!frame) return;

  if (width && height) {
    frame.resize(width, height);
  }

  if (layoutDetails) {
    frame.layoutMode = layoutDetails.type;
    frame.paddingTop = layoutDetails.padding.top;
    frame.paddingRight = layoutDetails.padding.right;
    frame.paddingBottom = layoutDetails.padding.bottom;
    frame.paddingLeft = layoutDetails.padding.left;
    frame.itemSpacing = layoutDetails.itemSpacing;
  }

  if(layoutDetails?.alignment){
    frame.primaryAxisAlignItems = layoutDetails.alignment.primary;
    frame.counterAxisAlignItems = layoutDetails.alignment.counter;
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

const applyComponentSpecificProperties = (
  component: InstanceNode,
  componentData: LLMResponseComponentType
) => {
  if (componentData.componentName === "StatCard") {
    component.layoutSizingHorizontal = "FILL";
  }
};
