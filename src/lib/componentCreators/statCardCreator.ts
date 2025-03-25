import { LLMResponseComponentType } from '../../types/llmResponseType';

const createSingleStatCard = (
  instance: InstanceNode,
  component: LLMResponseComponentType
) => {
  instance.layoutSizingHorizontal = "FILL";

  instance.setProperties({
    "Stat Label#27356:0": component.properties['Stat Label'] || 'Stat Label',
    "Stat Value#27356:5": component.properties['Stat Value'] || '100',
    "Stat Delta#27356:10": component.properties['Stat Delta'] || '8%',
    "Trend": component.properties['State'] || 'uptrend',
    "Type": component.properties['Type'] || 'horizontal'
  });

  if (component.properties['Type'] === 'action') {
    instance.setProperties({
      "Action Button Text#9995:0": component.properties['Action Button Text'] || 'Action Button Text'
    });
  }


};

export default createSingleStatCard;
