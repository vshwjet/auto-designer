import { LLMResponseComponentType } from "../../types/llmResponseType";

export const createButton = async (instance: InstanceNode, component: LLMResponseComponentType) => {
  // instance.setProperties(component.properties);
  console.log("Creating button", component.properties);
}
