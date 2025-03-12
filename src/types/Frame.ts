import { ComponentSpec } from './commonTypes';

export interface FrameLayout {
  type: 'NONE' | 'VERTICAL' | 'HORIZONTAL';
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  itemSpacing: number;
  alignment: {
    primary: 'MIN' | 'CENTER' | 'MAX';
    counter: 'MIN' | 'CENTER' | 'MAX';
  };
}

export interface Frame {
  type?: 'FRAME';
  name: string;
  width: number;
  height: number;
  layout: FrameLayout;
  background?: {
    color: { r: number; g: number; b: number };
    opacity: number;
  };
  children?: Frame[];
  components?: ComponentSpec[];
}

export interface LLMResponse {
  frame: Frame;
}
