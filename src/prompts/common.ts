export const INSTRUCTIONS = `CRITICAL: Your response must be a raw JSON object WITHOUT any JSON formatting markers or code block syntax.
DO NOT include \`\`\`json, {, } or any other markdown or code formatting.
The response should start directly with the frame property and its value.
Example of INCORRECT response:
\`\`\`json
{
  "section": {
    // section frame and its contents
  }
}
\`\`\`

Example of CORRECT response:
{
  "section": {
    // section frame and its contents
  }
}

enum ChildType {
    PARENT = "PARENT", // only use this for the main frame, if there are nested frames, they will be FRAME, so every top level frame in the flows will be PARENT, all the reset will be FRAME
    FRAME = "FRAME", 
    COMPONENT = "COMPONENT",
    TABLE_FRAME = "TABLE_FRAME" // only use this if you are creating a frame to make a table component. Find more details in the instructions for a table component
}

type LLMResponseType = {
    message: string; // any additional message or context that you want to provide for the descision you have made and what was your thought process
    section: LLMResponseFrameType; // a frame for the particular section
}

type LLMResponseFrameType = {
    name: string;
    type: ChildType; // "Frame" if there are nested frames, "Component" if there are only components
    width: number; // width of the frame in pixels, if this is a parent frame (used to create a flow), all direct children frames that are part of this parent frame must take the full width keeping in mind the padding and alignment
    height: number; // height of the frame in pixels (must be 1080px)
    layout: {
        type: "VERTICAL" | "HORIZONTAL"; // type of the layout, must be either VERTICAL or HORIZONTAL
        padding: {
            top: number; // padding from the top of the frame
            right: number; // padding from the right of the frame
            bottom: number; // padding from the bottom of the frame
            left: number; // padding from the left of the frame
        };
        itemSpacing: number; // spacing between items in the frame, use consistent spacing
        alignment: {
            primary: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'; // Controls how items are aligned along the primary axis (horizontal in horizontal layout, vertical in vertical layout)
                                                                // MIN = align to start, CENTER = align to center, MAX = align to end, SPACE_BETWEEN = distribute space between items
            counter: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';     // Controls how items are aligned along the counter axis (vertical in horizontal layout, horizontal in vertical layout)
                                                               // MIN = align to start, CENTER = align to center, MAX = align to end, BASELINE = align text baselines
        };
    };
    background: {
        color: {
            r: number; // red value of the color, must be between 0 and 1
            g: number; // green value of the color, must be between 0 and 1
            b: number; // blue value of the color, must be between 0 and 1
        };
        opacity: number; // opacity of the background color, must be between 0 and 1
    };
    children: LLMResponseFrameType[] | LLMResponseComponentType[]; // direct children frames that are part of this parent frame, can be used to create nested frames and layouts, if the type is "Frame", it will be a LLMResponseFrameType, if the type is "Component", it will be a LLMResponseComponentType
    
    // New fields below
    
    // Border/Stroke properties
    stroke?: {
        color: {
            r: number; // red value of the color, must be between 0 and 1
            g: number; // green value of the color, must be between 0 and 1
            b: number; // blue value of the color, must be between 0 and 1
        };
        opacity: number; // opacity of the stroke color, must be between 0 and 1
        width: number; // width of the stroke in pixels
        style: 'SOLID' | 'DASHED' | 'DOTTED' | 'NONE'; // style of the stroke
        alignment: 'INSIDE' | 'CENTER' | 'OUTSIDE'; // alignment of the stroke relative to the frame
    };
    
    // Corner radius
    cornerRadius?: {
        topLeft: number; // radius of the top-left corner in pixels
        topRight: number; // radius of the top-right corner in pixels
        bottomRight: number; // radius of the bottom-right corner in pixels
        bottomLeft: number; // radius of the bottom-left corner in pixels
    };
    
    // Shadow and blur effects
    effects?: {
        shadow?: {
            type: 'DROP_SHADOW' | 'INNER_SHADOW'; // type of shadow
            color: {
                r: number; // red value of the color, must be between 0 and 1
                g: number; // green value of the color, must be between 0 and 1
                b: number; // blue value of the color, must be between 0 and 1
            };
            opacity: number; // opacity of the shadow, must be between 0 and 1
            offset: {
                x: number; // horizontal offset of the shadow in pixels
                y: number; // vertical offset of the shadow in pixels
            };
            blur: number; // blur radius of the shadow in pixels
            spread: number; // spread of the shadow in pixels
            visible: boolean; // whether the shadow is visible
        }[];
        
        blur?: {
            type: 'LAYER_BLUR' | 'BACKGROUND_BLUR'; // type of blur
            radius: number; // blur radius in pixels
        };
    };
    
    // Clipping properties
    clipsContent?: boolean; // whether the frame clips its content
    
    // Transform properties
    transform?: {
        rotation: number; // rotation of the frame in degrees
        flipHorizontal: boolean; // whether the frame is flipped horizontally
        flipVertical: boolean; // whether the frame is flipped vertically
    };
    
    // Overall opacity
    opacity?: number; // overall opacity of the frame, must be between 0 and 1
    
    // Blend mode
    blendMode?: 'NORMAL' | 'MULTIPLY' | 'SCREEN' | 'OVERLAY' | 'DARKEN' | 'LIGHTEN' | 
                'COLOR_DODGE' | 'COLOR_BURN' | 'HARD_LIGHT' | 'SOFT_LIGHT' | 'DIFFERENCE' | 
                'EXCLUSION' | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY'; // blend mode of the frame
    
    // Constraints for responsive behavior
    constraints?: {
        horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'SCALE' | 'STRETCH'; // horizontal constraint
        vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'SCALE' | 'STRETCH'; // vertical constraint
    };
    
    // Optional cells for table layouts
    cells?: TableCellType[][]; // existing field for table cells
}

type LLMResponseComponentType = {
    type: "COMPONENT"; // must be "COMPONENT" 
    componentName: "Button" | "Dropdown" | "InputField" | "StatCard" | "TableColumn" | "Graph" | "Text" | "Tabs" | "Chart" | "Image" | "Advert Card";
    key: string;
    properties: Record<string, string>;
}`