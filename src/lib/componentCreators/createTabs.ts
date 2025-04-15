import { LLMResponseComponentType } from "../../types/llmResponseType";

export const createTabs = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  const tabs = component.properties.tabs;
  instance.layoutSizingHorizontal = "FILL";

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

export default createTabs;