import { Frame } from "../types";
import { createTableColComponent } from "./componentCreators/createTableColsComponent";
import createComponent from "./createComponent";

// Change createFrameWithComponents to arrow syntax
export default async function createFrameWithComponents(frameSpec: Frame): Promise<FrameNode> {
  console.log("--------CREATING FRAME--------")
  console.log(frameSpec)
  // Validate layout type - enforce auto-layout
  if (!frameSpec.layout.type || frameSpec.layout.type === "NONE") {
    console.warn(`Invalid layout type: ${frameSpec.layout.type}. Defaulting to VERTICAL auto-layout.`);
    frameSpec.layout.type = "VERTICAL";
  }

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

  if (frameSpec.components) {
    for (const component of frameSpec.components) {
      await createComponent(frame, component);
    }
  }

  if(frameSpec.cells && frameSpec.cells.length > 0){
    const tableFrame = await createTableColComponent(frameSpec);
    frame.appendChild(tableFrame);
  }

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
};
