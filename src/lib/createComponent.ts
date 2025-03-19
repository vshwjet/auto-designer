import { LLMResponseComponentType } from '../types/llmResponseType';
import { createButton } from './componentCreators';
import createTag from './componentCreators/createTag';
import createDropDown from './componentCreators/dropdownCreator';
import createSingleStatCard from './componentCreators/statCardCreator';
import { loadInterFonts } from './utils';

const createComponent = async (
  parentFrame: FrameNode,
  component: LLMResponseComponentType
) => {
  try {
    await loadInterFonts();

    console.log('Creating component', component.componentName);

    if (component.componentName === 'Text') {
      const textNode = await createText(component);
      parentFrame.appendChild(textNode);
      return;
    }

    const key = component.key;
    const importedComponent = await figma.importComponentByKeyAsync(key);
    if (!importedComponent) {
      console.error(`Component not found for key: ${key}`);
      return null;
    }

    const instance = importedComponent.createInstance();
    parentFrame.appendChild(instance);

    switch (component.componentName) {
      case "Chart":
        console.log('Reached here', component);
        createChart(instance, component);
        break;
      case 'Button':
        createButton(instance, component);
        break;
      case 'StatCard':
        createSingleStatCard(instance, component);
        break;
      case 'Dropdown':
        createDropDown(instance, component);
        break;
      case 'InputField':
        createInputField(instance, component);
        break;

      case "Tag":
        createTag(instance, component);
        break;

      case "Tabs":
        createTabs(instance, component);
        break;


    }

    return instance;
  } catch (error) {
    console.error('Error creating component:', error);
    return null;
  }
};

export const createText = async (component: LLMResponseComponentType) => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  console.log('Creating text');
  const text = figma.createText();
  const properties = component.properties;
  text.characters = properties.text;
  text.fontSize = 24;
  text.fontName = { family: 'Inter', style: 'Regular' };
  text.textAlignHorizontal = 'LEFT';
  return text;
};


const createChart = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  console.log('Creating chart', component);
}

const createTabs = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  const tabs = component.properties.tabs;
  
  if (typeof tabs === 'string' && tabs.trim() !== '') {
    const tabsArray = tabs.split(',').map(tab => tab.trim());
    
    const tabButtons = instance.findAll(node => 
      node.name === 'Tab Button'
    ) as FrameNode[];

    
    tabsArray.forEach((tabText: string, index: number) => {
      if (index < tabButtons.length) {
        const textNode = tabButtons[index].findOne(node => 
          node.type === 'TEXT'
        ) as TextNode;
        
        if (textNode) {
          textNode.characters = tabText;
        }
      }
    });
  }
};

const createInputField = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  console.log('Creating input field', component.componentName);
  
};

export default createComponent;
