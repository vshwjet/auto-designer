export enum ChildType {
  PARENT = 'PARENT',
  FRAME = 'FRAME',
  COMPONENT = 'COMPONENT',
  TABLE_FRAME = 'TABLE_FRAME',
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
    | 'Image Component';
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
