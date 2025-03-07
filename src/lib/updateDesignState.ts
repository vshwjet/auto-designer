import { DesignState, Frame } from "../types";

// Initialize plugin with state management
export const designState: DesignState = {
  currentFrame: null,
  frameNode: null,
  history: [],
  historyIndex: -1
};


// Change updateDesignState to arrow syntax
export default function updateDesignState(frame: Frame, frameNode: FrameNode): void {
  // Add new state to history, removing any forward history if we're not at the end
  designState.history = designState.history.slice(0, designState.historyIndex + 1);
  designState.history.push(frame);
  designState.historyIndex++;

  // Update current state
  designState.currentFrame = frame;

  // Update the existing frame instead of removing it
  if (designState.frameNode) {
    // Keep the existing frame's position
    const oldX = designState.frameNode.x;
    const oldY = designState.frameNode.y;

    // Remove all children from the existing frame
    while (designState.frameNode.children.length > 0) {
      designState.frameNode.children[0].remove();
    }

    // Copy properties from the new frame to the existing frame
    designState.frameNode.name = frameNode.name;
    designState.frameNode.resize(frameNode.width, frameNode.height);
    designState.frameNode.layoutMode = frameNode.layoutMode;
    designState.frameNode.primaryAxisAlignItems = frameNode.primaryAxisAlignItems;
    designState.frameNode.counterAxisAlignItems = frameNode.counterAxisAlignItems;
    designState.frameNode.itemSpacing = frameNode.itemSpacing;
    designState.frameNode.paddingTop = frameNode.paddingTop;
    designState.frameNode.paddingRight = frameNode.paddingRight;
    designState.frameNode.paddingBottom = frameNode.paddingBottom;
    designState.frameNode.paddingLeft = frameNode.paddingLeft;
    designState.frameNode.fills = frameNode.fills;

    // Move all children from the new frame to the existing frame
    while (frameNode.children.length > 0) {
      const child = frameNode.children[0];
      designState.frameNode.appendChild(child);
    }

    // Restore the frame's position
    designState.frameNode.x = oldX;
    designState.frameNode.y = oldY;

    // Remove the temporary frame
    frameNode.remove();
  } else {
    // If there's no existing frame, use the new one
    designState.frameNode = frameNode;
  }
};




// // Handle messages from UI
// figma.ui.onmessage = async (msg: PluginMessage) => {
//   try {
//     switch (msg.type) {
//       case 'generate-design':
//       case 'update-design':
//         if (!msg.prompt) {
//           throw new Error('Design prompt is required');
//         }

//         // Check if we can do an incremental update
//         if (msg.isIncremental && !designState.currentFrame) {
//           throw new Error('No existing design found to update');
//         }

//         figma.notify(msg.isIncremental ? 'Updating design...' : 'Generating design...');

//         // Generate design using LLM, passing current state for incremental updates
//         const designSpec = await generateDesign(
//           msg.prompt,
//           msg.isIncremental && designState.currentFrame ? designState.currentFrame : undefined
//         );

//         // Create the design frame with components
//         const frame = await createFrameWithComponents(designSpec.frame);

//         // Update state
//         updateDesignState(designSpec.frame, frame);

//         // Only adjust viewport for new designs
//         if (!msg.isIncremental) {
//           const viewport = figma.viewport.center;
//           frame.x = viewport.x - frame.width / 2;
//           frame.y = viewport.y - frame.height / 2;
//           figma.viewport.scrollAndZoomIntoView([frame]);
//         }

//         figma.notify(msg.isIncremental ? 'Design updated successfully' : 'Design generated successfully');
//         break;

//       case 'cancel':
//         figma.closePlugin();
//         break;
//     }
//   } catch (error) {
//     console.error('Failed to generate/update design:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     figma.notify('Failed to generate/update design: ' + errorMessage, { error: true });
//   }
// }; 