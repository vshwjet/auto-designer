import { ButtonProperties } from './componentTypes/Button';
import { BreadcrumbsProperties } from './componentTypes/Breadcrumbs';
import { DropdownsProperties } from './componentTypes/Dropdown';
import { InputFieldsProperties } from './componentTypes/InputField';
import { StatCardProperties } from './componentTypes/StatCard';
import { TableCellProperties, TableColumnProperties } from './componentTypes/Table';
import { TagProperties } from './componentTypes/Tag';

export interface SelectionProperties {
  Type: string;
  Divider: string;
}

export interface CursorsProperties {
  Type: string;
}

export interface GraphProperties {
  type: "Graph";
}

export type CustomComponentProperties = 
  | ButtonProperties 
  | BreadcrumbsProperties 
  | DropdownsProperties 
  | SelectionProperties 
  | CursorsProperties 
  | InputFieldsProperties
  | StatCardProperties
  | TableColumnProperties
  | TableCellProperties
  | GraphProperties
  | TagProperties;

export interface ComponentSpec {
  type: "Button" | "Dropdown" | "InputField" | "StatCard" | "TableColumn" | "TableCell" | "Graph" | "Tag";
  key: string;
  properties: CustomComponentProperties;
}

export interface ComponentConfig {
  name: string;
  key: string;
  properties: string[];
  layoutRules: string[];
}

export interface PluginMessage {
  type: 'generate-design' | 'update-design' | 'cancel';
  prompt?: string;
  isIncremental?: boolean;
}

export interface DesignState {
  currentFrame: Frame | null;
  frameNode: FrameNode | null;
  history: Frame[];
  historyIndex: number;
}

export interface ComponentRegistry<T> {
  components: {
    [key: string]: T;
  };
}

export interface FrameLayout {
  type: "NONE" | "VERTICAL" | "HORIZONTAL";
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  itemSpacing: number;
  alignment: {
    primary: "MIN" | "CENTER" | "MAX";
    counter: "MIN" | "CENTER" | "MAX";
  };
}

export interface Frame {
  type?: "FRAME";
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