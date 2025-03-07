import { 
  CustomComponentProperties,
  ButtonProperties,
  BreadcrumbsProperties,
  DropdownsProperties,
  SelectionProperties,
  CursorsProperties,
  InputFieldsProperties,
  StatCardProperties,
  TableColumnProperties,
  TableCellProperties,
  TagProperties
} from './types';

// Type guard functions
export function isButtonProperties(props: CustomComponentProperties): props is ButtonProperties {
  return 'Size' in props && 'Hirerchey' in props && 'Type' in props && 'State' in props && 'Width' in props;
}

export function isBreadcrumbsProperties(props: CustomComponentProperties): props is BreadcrumbsProperties {
  return 'Count' in props && 'State' in props;
}

export function isDropdownsProperties(props: CustomComponentProperties): props is DropdownsProperties {
  return 'Size' in props && 'Hirerchey' in props && 'Type' in props && 'State' in props &&
         'Has Label' in props && 'Has Hint Text' in props && 'Dropdown Label' in props && 'Dropdown Hint' in props;
}

export function isSelectionProperties(props: CustomComponentProperties): props is SelectionProperties {
  return 'Type' in props && 'Divider' in props;
}

export function isCursorsProperties(props: CustomComponentProperties): props is CursorsProperties {
  return 'Type' in props && !('Divider' in props) && !('State' in props);
}

export function isInputFieldsProperties(props: CustomComponentProperties): props is InputFieldsProperties {
  return 'size' in props && 'variant' in props && 'type' in props && 'state' in props && 'labelInfo' in props;
}

export function isStatCardProperties(props: CustomComponentProperties): props is StatCardProperties {
  return 'Type' in props && 'State' in props;
}

export function isTableColumnProperties(props: CustomComponentProperties): props is TableColumnProperties {
  return 'Position' in props && 'Variant' in props;
}

export function isTableCellProperties(props: any): props is TableCellProperties {
  return (
    props &&
    typeof props === 'object' &&
    'type' in props &&
    'position' in props &&
    'variant' in props &&
    'state' in props
  );
}

// Add these types and function
export function isTagProperties(props: CustomComponentProperties): props is TagProperties {
  return (
    'Size' in props &&
    'Color' in props &&
    'Variant' in props &&
    'Type' in props
  );
} 