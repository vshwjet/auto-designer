export async function createDropdownComponent(instance: InstanceNode, properties: any) {
  const props = {
    "Has Label#10131:578": properties["Has Label"],
    "Has Hint Text#10131:580": properties["Has Hint Text"],
    "Dropdown Label#27356:15": properties["Dropdown Label"] || "",
    "Dropdown Hint#27356:64": properties["Dropdown Hint"] || "",
    "Size": properties.Size,
    "Hirerchey": properties.Hirerchey,
    "Type": properties.Type,
    "State": properties.State
  };
  instance.setProperties(props);

  if (properties.placeholder) {
    const findPlaceholderTextNode = (node: SceneNode): TextNode | null => {
      if (node.type === 'TEXT' && node.characters.toLowerCase().includes('select')) {
        return node as TextNode;
      }
      if ('children' in node) {
        for (const child of node.children) {
          const result = findPlaceholderTextNode(child);
          if (result) return result;
        }
      }
      return null;
    };

    const textNode = findPlaceholderTextNode(instance);
    if (textNode) {
      textNode.characters = properties.placeholder;
    }
  }
} 