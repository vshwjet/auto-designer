export async function createTagComponent(
  instance: InstanceNode,
  properties: any
) {

  // Create properly formatted properties object
  const mappedProps: { [key: string]: string | boolean } = {
    Color: properties.color || 'Primary',
    'Has Label#10063:91': Boolean(
      properties.hasLabel !== undefined ? properties.hasLabel : true
    ),
    'Has Leading Icon#10063:273': Boolean(
      properties.hasLeadingIcon !== undefined ? properties.hasLeadingIcon : true
    ),
    'Has Trailing Icon#10063:364': Boolean(
      properties.hasTrailingIcon !== undefined
        ? properties.hasTrailingIcon
        : true
    ),
    'Label Text#10063:0': properties.labelText || 'Label sdfsd s',
    'Leading Icon#10063:182': properties.leadingIcon || '27977:2255',
    Size: properties.size || 'sm',
    'Trailing Icon#10063:455': properties.trailingIcon || '27977:2253',
    Type: properties.type || 'Round',
    Variant: properties.variant || 'Attentive',
  };


  instance.setProperties(mappedProps);
}
