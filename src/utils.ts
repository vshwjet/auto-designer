import { 
  CustomComponentProperties,
  ButtonProperties,
  BreadcrumbsProperties,
  DropdownsProperties,
  SelectionProperties,
  CursorsProperties,
  InputFieldsProperties
} from './types';

// Type guard functions
export function isButtonProperties(props: CustomComponentProperties): props is ButtonProperties {
  return 'Size' in props && 'Hirerchey' in props && 'Type' in props && 'State' in props && 'Width' in props;
}

export function isBreadcrumbsProperties(props: CustomComponentProperties): props is BreadcrumbsProperties {
  return 'Count' in props && 'State' in props;
}

export function isDropdownsProperties(props: CustomComponentProperties): props is DropdownsProperties {
  return 'State Visibility' in props && 'Label Visibility' in props && 'Stacking Direction' in props;
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