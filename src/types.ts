// Button Types
export type ButtonKey = {
  [key in ButtonWidthValue]: string;
}

export type ButtonState = {
  [key in ButtonStateValue]: string;
}

export type ButtonType = {
  [key in ButtonSizeValue]: {
    [key in ButtonWidthValue]: {
      [key in ButtonStateValue]: string;
    };
  };
}

export type ButtonHierarchy = {
  "Solid Fill": ButtonType;
  "Subtle Fill"?: ButtonType;
  "No Fill"?: ButtonType;
}

export type ButtonSize = {
  "Primary": ButtonHierarchy;
  "Secondary"?: ButtonHierarchy;
  "Danger"?: ButtonHierarchy;
  "Success"?: ButtonHierarchy;
}

// Enums
export enum ButtonSizeValue {
  Large = "large",
  Medium = "medium",
  Small = "small"
}

export enum ButtonHierarchyValue {
  Primary = "Primary",
  Secondary = "Secondary",
  Danger = "Danger",
  Success = "Success"
}

export enum ButtonTypeValue {
  SolidFill = "Solid Fill",
  SubtleFill = "Subtle Fill",
  NoFill = "No Fill"
}

export enum ButtonStateValue {
  Default = "Default",
  Hover = "Hover",
  Focused = "Focused",
  Disabled = "Disabled"
}

export enum ButtonWidthValue {
  Half = "Half",
  Full = "Full"
}

// Dropdown Types
export enum DropdownSizeValue {
  Large = "Large",
  Medium = "Medium"
}

export enum DropdownTypeValue {
  SingleSelect = "Single Select",
  Multiselect = "Multiselect"
}

export enum DropdownStateValue {
  Default = "Default",
  Hovered = "Hovered",
  Focused = "Focused",
  Opened = "Opened",
  Filled = "Filled",
  Disabled = "Disabled"
}

export enum DropdownHierarchyValue {
  Secondary = "Secondary",
  Tertiary = "Tertiary"
}

export type DropdownState = {
  [key in DropdownStateValue]: string;
}

export type DropdownType = {
  [key in DropdownTypeValue]: DropdownState;
}

export type DropdownSize = {
  [key in DropdownSizeValue]: DropdownType;
}

export type DropdownHierarchy = {
  [key in DropdownHierarchyValue]: DropdownSize;
}

// Input Field Types
export enum InputFieldSizeValue {
  Medium = "Medium",
  Small = "Small"
}

export enum InputFieldTypeValue {
  Text = "Text",
  PhoneNumber = "Phone Number",
  FloatingLabelText = "Floating Label - Text",
  FloatingLabelNumber = "Floating Label - Number"
}

export enum InputFieldStateValue {
  Default = "Default",
  Hovered = "Hovered",
  Focused = "Focused",
  Disabled = "Disabled",
  Error = "Error"
}

export enum InputFieldVariantValue {
  Placeholder = "Placeholder",
  Filled = "Filled"
}

export type InputFieldState = {
  [key in InputFieldStateValue]: string;
}

export type InputFieldType = {
  [key in InputFieldTypeValue]: InputFieldState;
}

export type InputFieldVariant = {
  [key in InputFieldVariantValue]: InputFieldType;
}

export type InputFieldSize = {
  [key in InputFieldSizeValue]: InputFieldVariant;
}

// Component Properties
export interface ButtonProperties {
  Size: ButtonSizeValue;
  Hirerchey: ButtonHierarchyValue;
  Type: ButtonTypeValue;
  State: ButtonStateValue;
  Width: ButtonWidthValue;
}

export interface BreadcrumbsProperties {
  Count: string;
  State: string;
}

export interface DropdownsProperties {
  "State Visibility": string;
  "Label Visibility": string;
  "Stacking Direction": string;
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
}

export type CustomComponentProperties = 
  | ButtonProperties 
  | BreadcrumbsProperties 
  | DropdownsProperties 
  | SelectionProperties 
  | CursorsProperties 
  | InputFieldsProperties;

// Component Specs
export interface ComponentSpec<T = CustomComponentProperties> {
  type: string;
  key: string;
  properties: T;
  position: { x: number; y: number };
  children?: ComponentSpec<T>[];
}

export interface ComponentConfig {
  name: string;
  key: string;
  properties: string[];
  layoutRules: string[];
}

// API Response Types
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

export interface PluginMessage {
  type: 'generate-design' | 'cancel';
  prompt?: string;
} 