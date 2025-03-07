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

// Types
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

export interface ButtonProperties {
  Size: ButtonSizeValue;
  Hirerchey: ButtonHierarchyValue;
  Type: ButtonTypeValue;
  State: ButtonStateValue;
  Width: ButtonWidthValue;
  label?: string;
} 