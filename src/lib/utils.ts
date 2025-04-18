/**
 * Lists all properties of a Figma component instance
 * @param instance The Figma component instance to inspect
 * @returns An object containing all properties and their values
 */
export function listComponentProperties(
  instance: InstanceNode
): Record<string, any> {
  const properties = instance.componentProperties;
  return properties;
}

export async function loadInterFonts(): Promise<void> {
  const fontStyles = [
    'Thin',
    'Extra Light',
    'Light',
    'Regular',
    'Medium',
    'Semi Bold',
    'Bold',
    'Extra Bold',
    'Black',
  ];

  await Promise.all(
    fontStyles.map((style) => figma.loadFontAsync({ family: 'Inter', style }))
  );
}


export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));