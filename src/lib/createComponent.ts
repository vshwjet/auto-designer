import { LLMResponseComponentType } from '../types/llmResponseType';
import { createButton } from './componentCreators';
import { createChart } from './componentCreators/createChartV2';
import createImage from './componentCreators/createImage';
import createInputField from './componentCreators/createInputFields';
import createTabs from './componentCreators/createTabs';
import createTag from './componentCreators/createTag';
import { createText } from './componentCreators/createText';
import createDropDown from './componentCreators/dropdownCreator';
import createSingleStatCard from './componentCreators/statCardCreator';
import { loadInterFonts } from './utils';

const createComponent = async (
  parentFrame: FrameNode,
  component: LLMResponseComponentType
) => {
  try {
    await loadInterFonts();
    if (component.componentName === 'Text') {
      const textNode = await createText(component);
      parentFrame.appendChild(textNode);
      return;
    }

    if (component.componentName === 'Image') {
      const imageNode = await createImage( component, parentFrame);
      if(imageNode){
        parentFrame.layoutSizingVertical = "FILL";
        imageNode.layoutSizingVertical = "FILL";
        imageNode.layoutSizingHorizontal = "FILL";
      }
      return;
    }

    console.log('component name ---', component.componentName);
    const key = component.key;
    const importedComponent = await figma.importComponentByKeyAsync(component.componentName == "Chart" ? "d23b37c43e17e6dc198003affcc8a7ba22567863" : key);
    if (component.componentName == "Chart") console.log('importedComponent', importedComponent);
    if (!importedComponent) {
      console.error(`Component not found for key: ${key}`);
      return null;
    }

    const instance = importedComponent.createInstance();
    parentFrame.appendChild(instance);

    switch (component.componentName) {
      case "Image Component":
        createImage(component);
        break;
      case "Advert Card":
        createAdvertCard(instance, component);
        break;
      case "Chart":
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
    console.log('Error', error);
    return null;
  }
};


const createAdvertCard = (instance: InstanceNode, component: LLMResponseComponentType) => {
  
}



export default createComponent;
