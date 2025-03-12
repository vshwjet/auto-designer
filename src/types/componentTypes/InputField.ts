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
