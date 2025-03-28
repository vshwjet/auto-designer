import { LLMResponseComponentType } from "../../types/llmResponseType";

export const createText = async (component: LLMResponseComponentType) => {
    const properties = component.properties;
    await figma.loadFontAsync({ family: 'Inter', style: "Regular" });
    const text = figma.createText();
    text.characters = properties.text;
    text.fontSize = Number(properties.fontsize) || 24;
    text.fontName = { family: 'Inter', style: properties.fontweight };
    if (properties.color_hex) {
      const hex = properties.color_hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255; 
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      text.fills = [{type: 'SOLID', color: {r, g, b}}];
    }
    return text;
  };