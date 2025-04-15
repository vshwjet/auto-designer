// Button Types
export type ButtonKey = {
  [key in ButtonWidthValue]: string;
};

export type ButtonState = {
  [key in ButtonStateValue]: string;
};

export type ButtonType = {
  [key in ButtonSizeValue]: {
    [key in ButtonWidthValue]: {
      [key in ButtonStateValue]: string;
    };
  };
};

export type ButtonHierarchy = {
  'Solid Fill': ButtonType;
  'Subtle Fill'?: ButtonType;
  'No Fill'?: ButtonType;
};

export type ButtonSize = {
  Primary: ButtonHierarchy;
  Secondary?: ButtonHierarchy;
  Danger?: ButtonHierarchy;
  Success?: ButtonHierarchy;
};

// Enums
export enum ButtonSizeValue {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum ButtonHierarchyValue {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Danger = 'Danger',
  Success = 'Success',
}

export enum ButtonTypeValue {
  SolidFill = 'Solid Fill',
  SubtleFill = 'Subtle Fill',
  NoFill = 'No Fill',
}

export enum ButtonStateValue {
  Default = 'Default',
  Hover = 'Hover',
  Focused = 'Focused',
  Disabled = 'Disabled',
}

export enum ButtonWidthValue {
  Half = 'Half',
  Full = 'Full',
}

// Dropdown Types
export enum DropdownSizeValue {
  Large = 'Large',
  Medium = 'Medium',
}

export enum DropdownTypeValue {
  SingleSelect = 'Single Select',
  Multiselect = 'Multiselect',
}

export enum DropdownStateValue {
  Default = 'Default',
  Hovered = 'Hovered',
  Focused = 'Focused',
  Opened = 'Opened',
  Filled = 'Filled',
  Disabled = 'Disabled',
}

export enum DropdownHierarchyValue {
  Secondary = 'Secondary',
  Tertiary = 'Tertiary',
}

export type DropdownState = {
  [key in DropdownStateValue]: string;
};

export type DropdownType = {
  [key in DropdownTypeValue]: DropdownState;
};

export type DropdownSize = {
  [key in DropdownSizeValue]: DropdownType;
};

export type DropdownHierarchy = {
  [key in DropdownHierarchyValue]: DropdownSize;
};

// Input Field Types
export enum InputFieldSizeValue {
  Medium = 'Medium',
  Small = 'Small',
}

export enum InputFieldTypeValue {
  Text = 'Text',
  PhoneNumber = 'Phone Number',
  FloatingLabelText = 'Floating Label - Text',
  FloatingLabelNumber = 'Floating Label - Number',
}

export enum InputFieldStateValue {
  Default = 'Default',
  Hovered = 'Hovered',
  Focused = 'Focused',
  Disabled = 'Disabled',
  Error = 'Error',
}

export enum InputFieldVariantValue {
  Placeholder = 'Placeholder',
  Filled = 'Filled',
}

export type InputFieldState = {
  [key in InputFieldStateValue]: string;
};

export type InputFieldType = {
  [key in InputFieldTypeValue]: InputFieldState;
};

export type InputFieldVariant = {
  [key in InputFieldVariantValue]: InputFieldType;
};

export type InputFieldSize = {
  [key in InputFieldSizeValue]: InputFieldVariant;
};

// Component Properties
export interface ButtonProperties {
  Size: ButtonSizeValue;
  Hirerchey: ButtonHierarchyValue;
  Type: ButtonTypeValue;
  State: ButtonStateValue;
  Width: ButtonWidthValue;
  label?: string;
}

export interface BreadcrumbsProperties {
  Count: string;
  State: string;
}

export interface DropdownsProperties {
  Size: DropdownSizeValue;
  Hirerchey: DropdownHierarchyValue;
  Type: DropdownTypeValue;
  State: DropdownStateValue;
  'Has Label': boolean;
  'Has Hint Text': boolean;
  'Dropdown Label': string;
  'Dropdown Hint': string;
  placeholder?: string;
}

export interface SelectionProperties {
  Type: string;
  Divider: string;
}

export interface CursorsProperties {
  Type: string;
}

export interface InputFieldsProperties {
  size: InputFieldSizeValue;
  variant: InputFieldVariantValue;
  type: InputFieldTypeValue;
  state: InputFieldStateValue;
  hasLabel: boolean;
  rightIcon: boolean;
  leftIcon: boolean;
  hasHint: boolean;
  labelInfo: string;
  isMandatory: boolean;
  placeholder: string;
  value: string;
  hintText?: string;
}

export enum StatCardTypeValue {
  Horizontal = 'Horizontal',
  Stacked = 'Stacked',
}

export enum StatCardStateValue {
  Uptrend = 'Uptrend',
  Downtrend = 'Downtrend',
}

export interface StatCardProperties {
  Type: StatCardTypeValue;
  State: StatCardStateValue;
  'Stat Label': string;
  'Stat Value': string;
  'Stat Delta': string;
}

export enum TableColumnPositionValue {
  Left = 'Left',
  Intermediate = 'Intermediate',
  Right = 'Right',
}

export enum TableColumnVariantValue {
  Text = 'text',
  Checkbox = 'checkbox',
  Spacer = 'spacer',
  Amount = 'amount',
  Date = 'date',
  Tag = 'tag',
  Icon = 'icon',
  User = 'user',
  CustomiseColumn = 'Customise Column',
}

export enum TableColumnTypeValue {
  Header = 'header',
  Cell = 'cell',
}

export enum TableColumnStateValue {
  Default = 'default',
  Hover = 'hover',
  Active = 'active',
}

export interface TableColumnProperties {
  Type: TableColumnTypeValue;
  Position: TableColumnPositionValue;
  Variant: TableColumnVariantValue;
  State: TableColumnStateValue;
  label?: string;
  value?: string;
}

export enum TableCellVariantValue {
  Text = 'text',
  Checkbox = 'checkbox',
  Spacer = 'spacer',
  Amount = 'amount',
  Date = 'date',
  Tag = 'tag',
  Icon = 'icon',
  User = 'user',
  CustomiseColumn = 'CustomiseColumn',
}

export interface TableCellProperties {
  type: 'header' | 'cell';
  position: 'left' | 'intermediate' | 'right';
  variant: TableCellVariantValue;
  state: 'default' | 'hover' | 'active';
  'Header Content'?: string;
  'Cell Content - Text'?: string;
  'Cell Content - Amount'?: string;
  'Cell Content - Date'?: string;
  'Cell Content - Tag'?: string;
  'Cell Content - User'?: string;
  'Has Cell Icon 1'?: boolean;
  'Has Cell Icon 2'?: boolean;
  'Has Cell Icon 3'?: boolean;
  'Has Cell Icon More'?: boolean;
  'Has Filter'?: boolean;
}

export interface GraphProperties {
  type: 'Graph';
}

export interface TagProperties {
  Size: 'sm' | 'md' | 'lg';
  Color:
    | 'Primary'
    | 'Error'
    | 'Warning'
    | 'Success'
    | 'Gray'
    | 'Light Gray'
    | 'Yellow'
    | 'Magenta'
    | 'Teal'
    | 'Cyan';
  Variant: 'Subtle' | 'Attentive' | 'Outline';
  Type: 'Pill' | 'Round';
  text?: string;
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

// Component Specs
export interface ComponentSpec {
  type:
    | 'Button'
    | 'Dropdown'
    | 'InputField'
    | 'StatCard'
    | 'TableColumn'
    | 'TableCell'
    | 'Graph'
    | 'Tag';
  key: string;
  properties: CustomComponentProperties;
  stretch?: boolean;
}

export interface ComponentConfig {
  name: string;
  key: string;
  properties: string[];
  layoutRules: string[];
}

// API Response Types
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
  cells?: any;
}

export interface LLMResponse {
  frame: Frame;
}

export type PluginMessage = 
  | { type: 'generate-design'; prompt: string; designSystem: string; addToSidebar?: boolean }
  | { type: 'update-design'; prompt: string }
  | { type: 'cancel' }
  | { type: 'create-chart' }
  | { type: 'save-prompt'; prompt: string }
  | { type: 'get-prompts' }
  | { type: 'clear-prompts' };

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
