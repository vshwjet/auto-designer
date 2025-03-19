import { LLMResponseComponentType } from "../../types/llmResponseType";
import { listComponentProperties } from "../utils";

export default function createTag(instance: InstanceNode, component: LLMResponseComponentType) {
  listComponentProperties(instance)
  const mappedProps = {
    "Color": component.properties['Color'] || 'Primary',
    "Has Label#10063:91": component.properties['Has Label'] || false,
    "Has Leading Icon#10063:273": component.properties['Has Leading Icon'] || false,
    "Has Trailing Icon#10063:364": component.properties['Has Trailing Icon'] || false,
    "Label Text#10063:10": component.properties['labelText'] || '',
    'Leading Icon#10063:182': component.properties['Leading Icon'] || '',
    "Size#10063:12": component.properties['Size'] || 'md',
    "Trailing Icon#10063:455": component.properties['Trailing Icon'] || '',
    "Type": component.properties['Type'] || 'Pill',
    "Variant": component.properties['Variant'] || 'Subtle',
  }
  instance.setProperties(mappedProps);
}