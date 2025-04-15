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
    const key = component.key;
    const importedComponent = await figma.importComponentByKeyAsync(component.componentName == "Chart" ? "d23b37c43e17e6dc198003affcc8a7ba22567863" : key);
    if (!importedComponent) {
      console.error(`Component not found for key: ${key}`);
      return null;
    }

    const instance = importedComponent.createInstance();
    parentFrame.appendChild(instance);

    switch (component.componentName) {
      case "Switch":
        createSwitch(instance, component);
        break;
      case "Information Bar":
        createInformationBar(instance, component);
        break;
      case "Selector":
        createSelector(instance, component);
        break;  
      case "Icons":
        createIcon(instance, component);
        break;
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

const createIcon = (instance: InstanceNode, component: LLMResponseComponentType) => {
  console.log("Creating icon", component);
}

const createSelector = (instance: InstanceNode, component: LLMResponseComponentType) => {
  console.log("Creating selector", component);

  instance.setProperties({
    "Type": component.properties["Type"],
    "Size" : component.properties["Size"],
    "State" : component.properties["State"],
    "Interaction State" : component.properties["Interaction State"],
    "Has Content#10053:0" : component.properties["Has Content"],
    "Has Main Text#10018:91" : component.properties["Has Main Text"],
    "Has Hint Text#10018:157" : component.properties["Has Hint Text"],
  })

  if(component.properties["Has Main Text"]){
    instance.setProperties({
      "Main Text#10018:58" : component.properties["Main Text"],
    })
  }

  if(component.properties["Has Hint Text"]){
    instance.setProperties({
      "Hint Text#10018:124" : component.properties["Hint Text"],
    })
  }
  
}

const createAdvertCard = (instance: InstanceNode, component: LLMResponseComponentType) => {
  
}

const createInformationBar = (instance: InstanceNode, component: LLMResponseComponentType) => {
  console.log("Creating information bar", component);

  instance.setProperties({
    "Type": component.properties["Type"],
    "Message#10026:3": component.properties["Message"],
    "Heading#10026:0": component.properties["Heading"],
    "Has Action#10026:18": true,
  })

  const actionButton = instance.findOne(node => node.name === "Button") as InstanceNode;

  if(actionButton){
    actionButton.setProperties({
      "Button Text#9995:0": component.properties['Action Button Text'] || "View More", 
      "Has Leading Icon#9995:484": false,
      "Has Trailing Icon#10131:0": false,
      "Has Text#9995:121": true,
      "Hirerchey": component.properties['Action Button Hirerchey'] || "Primary",
      "Size": component.properties['Action Button Size'] || "small",
      "State": component.properties['Action Button State'] || "Default",
      "Type": component.properties['Action Button Type'] || "Solid Fill",
      "Width": component.properties['Action Button Width'] || "Half"
    })
  }
}

export const createSwitch = (instance: InstanceNode, component: LLMResponseComponentType) => {
  console.log("Creating switch", component);
  
  switch (component.properties["Type"]) {
    case "Icons":
      break;
    case "Text":
      const labelText = instance.findOne(node => node.name === "Text") as TextNode;
      labelText.characters = component.properties["Label Text"] || "Remember Me";

      const supportingText = instance.findOne(node => node.name === "Supporting text") as TextNode;
      supportingText.characters = component.properties["Supporting Text"] || "";

      const optionsFrame = instance.findOne(node => node.name === "Default/Filled") as InstanceNode;
      console.log("Options frame found", optionsFrame);
      if (optionsFrame) {
        // Find all switch blocks inside the options frame
        const switchBlocks = optionsFrame.findAll(node => node.name.includes("Switch Block")) as InstanceNode[];
        console.log("Switch blocks found", switchBlocks);
        
        // Get the options from the properties
        const optionsString = component.properties["Switch Options"] || "Option 1, Option 2, JSR";
        const options = optionsString.split(",").map(option => option.trim());
        
        // Update each switch block with the corresponding option
        switchBlocks.forEach((switchBlock, index) => {
          console.log("Switch block found", switchBlock);   
          if (index < options.length) {
            // Find the label text node inside the switch block
            const labelNode = switchBlock.findOne(node => node.name.includes("Label") && node.type === "TEXT") as TextNode;
            console.log("Label node found", labelNode);
            if (labelNode) {
              labelNode.characters = options[index];
            }
          }
        });
      }
      break;
  }

}



export default createComponent;
