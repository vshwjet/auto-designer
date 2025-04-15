import { LLMResponseComponentType } from '../../types/llmResponseType';
import { listComponentProperties } from '../utils';

export const createButton = async (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  instance.setProperties({
    "Button Text#9995:0": component.properties['Button Text'] || "Button Text", 
    "Has Leading Icon#9995:484": false,
    "Has Trailing Icon#10131:0": false,
    "Has Text#9995:121": true,
    "Hirerchey": component.properties['Hirerchey'] || "Primary",
    "Size": component.properties['Size'] || "small",
    "State": component.properties['State'] || "Default",
    "Type": component.properties['Type'] || "Solid Fill",
    "Width": component.properties['Width'] || "Half"
  })
};
