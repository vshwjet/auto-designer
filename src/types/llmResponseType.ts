export enum ChildType {
  PARENT = 'PARENT',
  FRAME = 'FRAME',
  COMPONENT = 'COMPONENT',
  TABLE_FRAME = 'TABLE_FRAME',
  PROMPT_SEGMENT = 'PROMPT_SEGMENT',
}

export interface LLMResponseFrameType {
  name: string;
  type: ChildType;
  width: number;
  height: number;
  layout: {
    type: 'VERTICAL' | 'HORIZONTAL';
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    itemSpacing: number;
    alignment: {
      primary: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
      counter: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
    };
  };
  background: {
    color: {
      r: number;
      g: number;
      b: number;
    };
    opacity: number;
  };
  children: LLMResponseFrameType[] | LLMResponseComponentType[];
  cells?: TableCellType[][];
  stroke: {
    color: {
      r: number;
      g: number;
      b: number;
    };
    opacity: number;
    width: number;
    style: 'SOLID' | 'DASHED' | 'DOTTED' | 'NONE';
    alignment: 'INSIDE' | 'CENTER' | 'OUTSIDE';
  };
  cornerRadius: {
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
  };
  effects: {
    shadow: {
      type: 'DROP_SHADOW' | 'INNER_SHADOW';
      color: {
        r: number;
        g: number;
        b: number;
      };
      opacity: number;
      offset: {
        x: number;
        y: number;
      };
      blur: number;
      spread: number;
      visible: boolean;
    }[];
    blur?: {
      type: 'LAYER_BLUR' | 'BACKGROUND_BLUR';
      radius: number;
    };
  };
  clipsContent: boolean;
  transform: {
    rotation: number;
    flipHorizontal: boolean;
    flipVertical: boolean;
  };
  opacity: number;
  blendMode: 'NORMAL' | 'MULTIPLY' | 'SCREEN' | 'OVERLAY' | 'COLOR' | 'COLOR_BURN' | 'COLOR_DODGE' | 'DARKEN' | 'DIFFERENCE' | 'EXCLUSION' | 'HARD_LIGHT' | 'HUE' | 'LIGHTEN' | 'LUMINOSITY' | 'SATURATION' | 'SOFT_LIGHT';
  constraints: {
    horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'SCALE' | 'STRETCH';
    vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'SCALE' | 'STRETCH';
  };
}

export interface LLMResponseComponentType {
  type: ChildType.COMPONENT;
  componentName:
    | 'Button'
    | 'Dropdown'
    | 'InputField'
    | 'StatCard'
    | 'Data Table'
    | 'Graph'
    | 'Text'
    | 'Tag'
    | 'Tabs'
    | 'Chart'
    | 'Image'
    | 'Advert Card'
    | 'Image Component'
    | 'Icons'
    | 'Selector'
    | 'Information Bar'
    | 'Switch';
  key: string;
  properties: Record<string, string>;
  cells: TableCellType[][];
}

type TableCellType = {
  key: string;
  properties: Record<string, string>;
};

export type LLMResponseType = {
  section: LLMResponseFrameType;
};