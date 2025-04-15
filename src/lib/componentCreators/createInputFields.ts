import { LLMResponseComponentType } from "../../types/llmResponseType";

const createInputField = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {

  let mappedProps: any = {
    "Has Help Icon#9987:910": true,
    "Has Main Icon#9987:819": false,
  }

  if(component.properties["Has Hint"]){
    mappedProps["Has Hint#9987:637"] = true;
    mappedProps["Hint Text#9987:728"] = component.properties["Hint Text"] || "Hint da text";
  }

  switch (component.properties["Type"]) {
    case "Text":
      mappedProps["Type"] = "Text";
      mappedProps["Text Placeholder#10157:2"] = component.properties["Placeholder"] || "Enter text here";
      mappedProps["Label Text#9987:546"] = component.properties["Label Text"] || "Label text";
      break;
    case "Phone Number":
      mappedProps["Type"] = "Phone Number";
      // mappedProps["Phone Placeholder#10157:84"] = component.properties["Placeholder"] || "Floating Label - Number";
      mappedProps["Label Phone#9987:1005"] = component.properties["Label Text"] || "Label text";
      break;
    case "Floating Label - Text":
      mappedProps["Type"] = "Floating Label - Text";
      mappedProps["Text Placeholder#10157:2"] = component.properties["Placeholder"] || "Enter text here";
      break;
    case "Floating Label - Number":
      mappedProps["Type"] = "Floating Label - Number";
      // mappedProps["Phone Placeholder#10157:84"] = component.properties["Placeholder"] || "Floating Label - Number";
      break;
  }

  instance.setProperties(mappedProps);
};

export default createInputField;