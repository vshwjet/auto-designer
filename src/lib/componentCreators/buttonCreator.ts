import { LLMResponseComponentType } from '../../types/llmResponseType';
import { listComponentProperties } from '../utils';

export const createButton = async (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  const mappedProps = {
    'Button Text#9995:0': component.properties['Button Text'],
    'Has Leading Icon#9995:484': component.properties['Has Leading Icon'],
    'Has Trailing Icon#10131:0': component.properties['Has Trailing Icon'],
    'Has Text#9995:121': component.properties['Has Text'],
    'Hirerchey#9995:187': component.properties['Hirerchey'],
    'Leading Icon#9995:363': component.properties['Leading Icon'],
    Size: component.properties['Size'],
    State: component.properties['State'],
    'Trailing Icon#10131:289': component.properties['Trailing Icon'],
    Type: component.properties['Type'],
    Width: component.properties['Width'],
  };
  instance.setProperties(mappedProps);
};

// {
//   "Size": "small",
//   "Hirerchey": "Primary",
//   "Type": "Solid Fill",
//   "State": "Default",
//   "Width": "Half",
//   "Button Text": "Delete",
//   "Has Leading Icon": false,
//   "Has Trailing Icon": false
// }
