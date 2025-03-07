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

export interface DropdownsProperties {
  Size: DropdownSizeValue;
  Hirerchey: DropdownHierarchyValue;
  Type: DropdownTypeValue;
  State: DropdownStateValue;
  "Has Label": boolean;
  "Has Hint Text": boolean;
  "Dropdown Label": string;
  "Dropdown Hint": string;
  placeholder?: string;
} 