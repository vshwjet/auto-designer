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
