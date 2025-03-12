import { LLMResponseComponentType } from '../../types/llmResponseType';

const createDropDown = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  console.log('Creating dropdown', component.componentName);

  const mappedProps = {
    'Dropdown Hint#27356:64':
      component.properties['Dropdown Hint'] || 'Select an option',
    'Dropdown Label#27356:15':
      component.properties['Dropdown Label'] || 'Dropdown Label',
    'Has Hint Text#10131:580': component.properties['Has Hint Text'] || false,
    'Has Label#10131:578': component.properties['Has Label'] || true,
    Hirerchey: component.properties['Hirerchey'] || 'Secondary',
    Size: component.properties['Size'] || 'Large',
    State: component.properties['State'] || 'Default',
    Type: component.properties['Type'] || 'Single Select',
  };
  console.log(mappedProps);

  instance.setProperties(mappedProps);
};

export default createDropDown;
