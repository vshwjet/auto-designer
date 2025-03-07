export async function createInputFieldComponent(instance: InstanceNode, properties: any) {
  console.log("Creating input field component with properties:", properties);
  const props = {
    "Label Text#9987:546": properties.labelInfo || "",
    "Text Placeholder#10157:2": properties.placeholder || "",
    "Text Filled#10157:43": properties.value || "",
    "Has Label#9987:455": properties.hasLabel,
    "Has Hint#9987:637": properties.hasHint,
    "Has Help Icon#9987:910": false,
    "Has Main Icon#9987:819": false,
    "Hint Text#9987:728": properties.hasHint ? properties.hintText || "" : ""
  };
  instance.setProperties(props);
} 