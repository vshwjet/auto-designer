import { ChildType, LLMResponseComponentType, LLMResponseFrameType } from "../types/llmResponseType";
import createComponent from "./createComponent";

export const createParentFrame = async (frame: LLMResponseFrameType) => {
    console.log("Creating parent frame", frame.name);

    const parentFrame = figma.createFrame();
    parentFrame.name = frame.name;

    setFrameLayoutDetails(parentFrame, frame.layout, frame.width, frame.height, frame.background);

    const children = frame.children;
    for(const child of children){
        if(child.type === ChildType.FRAME || child.type === ChildType.TABLE_FRAME){
            const childFrame = await createFrame(child);
            parentFrame.appendChild(childFrame);
        }
    }

    return parentFrame;
}

const createFrame = async (frame: LLMResponseFrameType) => {
    console.log(`Creating frame of type ${frame.type}`, frame.name);

    if(frame.type === ChildType.TABLE_FRAME){

        const tableFrame = await createTableFrame(frame);
        return tableFrame;
    }

    const frameNode = figma.createFrame();
    frameNode.name = frame.name;
    setFrameLayoutDetails(frameNode, frame.layout, frame.width, frame.height, frame.background);



    if(frame.children){
        for(const child of frame.children){
            if(child.type === ChildType.FRAME){
                const childFrame = await createFrame(child);
                frameNode.appendChild(childFrame);
            }else if(child.type === ChildType.COMPONENT){
                const childComponent = await createComponent(frameNode, child as LLMResponseComponentType);
                if (childComponent) {
                    frameNode.appendChild(childComponent);
                }
            }
        }
    }

    return frameNode;
}

const createTableFrame = async (frame: LLMResponseFrameType) => {
    console.log("Creating table frame", frame.name);
    const tableFrame = figma.createFrame();
    tableFrame.name = frame.name;

    tableFrame.layoutMode = "HORIZONTAL";
    tableFrame.primaryAxisSizingMode = "AUTO";
    tableFrame.counterAxisSizingMode = "AUTO";
    tableFrame.itemSpacing = 0;

    if(!frame.cells)return tableFrame;

    for(const cols of frame.cells){
        const colFrame = figma.createFrame();
        colFrame.name = "Column";
        colFrame.layoutMode = "VERTICAL";
        colFrame.primaryAxisSizingMode = "AUTO";
        colFrame.counterAxisSizingMode = "AUTO";
        colFrame.itemSpacing = 0;

        for(const cell of cols){
            const cellFrame = await createTableCell(cell);
            if(cellFrame){
                colFrame.appendChild(cellFrame);
            }
        }
  
        tableFrame.appendChild(colFrame);
    }

    return tableFrame;

}

async function createTableCell(cell: any) {
    const component = await figma.importComponentByKeyAsync(cell.key);
    if (!component) {
      console.error(`Component not found for key: ${cell.key}`);
      return null;
    }
    const instance = component.createInstance();

  
    const props = cell.properties;
    const cellType = props.type || "header";
  
    if(cellType === "header") {
      console.log(props);
    }
  
    const mappedProps: { [key: string]: string | boolean } = {
      "type": cellType,
      "variant": props["variant"]?.value || "text",
      "state": props["state"]?.value || "default",
      "position": props.position || "left",
    };
  
    // Add the appropriate content property based on cell type
    if (cellType === "cell") {
      mappedProps["Cell Content - Text#10157:224"] = props["Cell Content - Text"] || "";
    } else if (cellType === "header") {
      mappedProps["Header Content#10157:166"] = props["Header Content"] || "";
    }
  
    console.log(mappedProps);
  
    instance.setProperties(mappedProps);
    return instance;
  }
  


// const createComponent = async (component: LLMResponseComponentType): Promise<InstanceNode | null> => {
//     console.log("Creating component", component.componentName);

//     switch(component.componentName){
//         case "Button":
//             return createButton(component);
//         default:
//             return null;
//     }
// }


const setFrameLayoutDetails = (frame?: FrameNode, layoutDetails?: LLMResponseFrameType['layout'], width?: number, height?: number, backgroundColor?: LLMResponseFrameType['background']) => {
    if(!frame)return;

    if(width && height){
        frame.resize( Math.max(width || 100, 0.01), height);
    }

    if(layoutDetails){
        frame.layoutMode = layoutDetails.type;
        frame.paddingTop = layoutDetails.padding.top;
        frame.paddingRight = layoutDetails.padding.right;
        frame.paddingBottom = layoutDetails.padding.bottom;
        frame.paddingLeft = layoutDetails.padding.left;
        frame.itemSpacing = layoutDetails.itemSpacing;
        frame.primaryAxisAlignItems = layoutDetails.alignment.primary;
        frame.counterAxisAlignItems = layoutDetails.alignment.counter;
    }

    if(backgroundColor){
        frame.fills = [{
            type: 'SOLID',
            color: {
                r: 1,
                g: 1,
                b: 1,
            },
            opacity: backgroundColor.opacity,
        }];
    }
}


// const createParentFrame = async (flows: LLMResponseFrameType[]) => {
//     console.log("Creating flows");
//     const createdFrames: FrameNode[] = [];
//     for (const flow of flows) {
//         const frame = await createFrame(flow);
//         createdFrames.push(frame);
//     }
//     return createdFrames;
// }

// const createFrame = async (flow: LLMResponseFrameType): Promise<FrameNode> => {
//     console.log("Creating a frame", flow.name);
//     const frame = figma.createFrame();
//     frame.name = flow.name || "Untitled Frame";

//     // Set frame dimensions
//     const width = Math.max(flow.width || 100, 0.01);
//     frame.resize(width, flow.height || 100);

//     // Set layout properties if they exist
//     if (flow.layout) {
//         // Enforce auto-layout - default to VERTICAL if not specified
//         frame.layoutMode = flow.layout.type || "VERTICAL";

//         if (flow.layout.padding) {
//             frame.paddingTop = flow.layout.padding.top;
//             frame.paddingRight = flow.layout.padding.right;
//             frame.paddingBottom = flow.layout.padding.bottom;
//             frame.paddingLeft = flow.layout.padding.left;
//         }
//         if (flow.layout.itemSpacing) {
//             frame.itemSpacing = flow.layout.itemSpacing;
//         }
//         if (flow.layout.alignment) {
//             frame.primaryAxisAlignItems = flow.layout.alignment.primary;
//             frame.counterAxisAlignItems = flow.layout.alignment.counter;
//         }
//     } else {
//         // Default to vertical auto-layout if no layout specified
//         frame.layoutMode = "VERTICAL";
//     }

//     // Set background if it exists
//     if (flow.background) {
//         frame.fills = [{
//             type: 'SOLID',
//             color: {
//                 r: 1,
//                 g: 1,
//                 b: 1,
//             },
//             opacity: flow.background.opacity
//         }];
//     }

//     // Handle children recursively
//     if (flow.children) {
//         for (const child of flow.children) {
//             if (child.type === "FRAME") {
//                 // Ensure child frames have auto-layout
//                 if (!child.layout || !child.layout.type) {
//                     child.layout = child.layout || {};
//                     child.layout.type = "VERTICAL";
//                 }
//                 const childFrame = await createFrame(child);
//                 frame.appendChild(childFrame);
//             } else if (child.type === "COMPONENT") {
//                 await handleComponent(frame, child as LLMResponseComponentType);
//             }
//         }
//     }

//     // Set frame sizing behavior
//     if (flow.height === 1080) {
//         // For main/parent frames, use fixed sizing
//         frame.primaryAxisSizingMode = "FIXED";
//         frame.counterAxisSizingMode = "FIXED";
//         frame.layoutSizingHorizontal = "FIXED";
//         frame.layoutSizingVertical = "FIXED";
//         frame.resize(frame.width, 1080);
//     } else {
//         // For child frames, use HUG content
//         frame.primaryAxisSizingMode = "AUTO";
//         frame.counterAxisSizingMode = "FIXED";
//         frame.layoutSizingHorizontal = "HUG";
//         frame.layoutSizingVertical = "HUG";
//         frame.layoutAlign = "STRETCH";

//         // Force the frame to recalculate its size based on content
//         frame.resize(frame.width, frame.height);
//     }

//     return frame;
// }

// const handleComponent = async (parentFrame: FrameNode, component: LLMResponseComponentType) => {
//     console.log("Creating component:", component.type);

//     const key = component.key;
//     const type = component.type;
//     const properties = component.properties;

//     const publishedComponent = figma.importComponentByKeyAsync(key);
//     if (!publishedComponent) {
//         console.error(`Component with key ${key} not found`);
//         return;
//     }

//     // Create an instance of the component
//     const instance = await publishedComponent.then(component => {
//         return component.createInstance();
//     });

//     // Set component properties if they exist
//     if (properties) {
//         for (const [key, value] of Object.entries(properties)) {
//             try {
//                 instance.setProperties({ [key]: value });
//             } catch (error) {
//                 console.error(`Error setting property ${key}:`, error);
//             }
//         }
//     }

 
// }

