import { LLMResponseComponentType } from '../types/llmResponseType';
import { createButton } from './componentCreators';
import createDropDown from './componentCreators/dropdownCreator';
import createSingleStatCard from './componentCreators/statCardCreator';
import { listComponentProperties, loadInterFonts } from './utils';

const createComponent = async (
  parentFrame: FrameNode,
  component: LLMResponseComponentType
) => {
  // console.log('Creating component', component.componentName);
  console.log('Creating a new component ---- ', component.componentName);
  try {
    await loadInterFonts();
    const key = component.key;
    const importedComponent = await figma.importComponentByKeyAsync(key);
    if (!importedComponent) {
      console.error(`Component not found for key: ${key}`);
      return null;
    }

    const instance = importedComponent.createInstance();

    switch (component.componentName) {
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
    }

    parentFrame.appendChild(instance);
  } catch (error) {
    console.error('Error creating component:', error);
    return null;
  }
};

const createInputField = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  console.log('Creating input field', component.componentName);
  listComponentProperties(instance);
};

export default createComponent;

// import { createButtonComponent, createDropdownComponent, createInputFieldComponent, createStatCardComponent, createTableColComponent, createTagComponent } from "./componentCreators";
// import { listComponentProperties, loadInterFonts } from "./utils";

// const createComponent = async (parent: FrameNode, spec: any): Promise<InstanceNode | null> => {
//   try {
//     let key = spec.key;
//     await loadInterFonts();
//     console.log("Creating component with key:", key, spec.type);

//     const component = await figma.importComponentByKeyAsync(key);
//     if (!component) {
//       console.error(`Component not found for key: ${key}`);
//       return null;
//     }
//     const instance = component.createInstance();
//     parent.appendChild(instance);
//     listComponentProperties(instance);

//     if (!instance.setProperties) {
//       console.warn('Component does not support setting properties:', spec.type);
//       return instance;
//     }

//     switch (spec.type) {
//       case "InputField":
//         await createInputFieldComponent(instance, spec.properties);
//         break;
//       case "Button":
//         await createButtonComponent(instance, spec.properties);
//         break;
//       case "Dropdown":
//         await createDropdownComponent(instance, spec.properties);
//         break;
//       case "StatCard":
//         await createStatCardComponent(instance, spec.properties);
//         break;

//       // case "TableCell":
//       //   await createTableCellComponent(instance);
//       //   break;
//       case "Tag":
//         await createTagComponent(instance, spec.properties);
//         break;
//       case "Graph":
//         console.log('Creating Graph component');
//         break;
//       default:
//         console.warn('Unsupported component type:', spec.type);
//     }

//     return instance;
//   } catch (error) {
//     console.error(`Error creating component: ${error}`);
//     return null;
//   }
// };

// export default createComponent;
