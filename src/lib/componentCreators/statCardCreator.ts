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

  if (component.properties['Type'] === 'Action') {
    // const actionButton = instance.findOne(node => node.name === "Button") as InstanceNode;
    const actionButton = instance.findOne(node => node.name === "Button") as InstanceNode;
    if(actionButton){
      actionButton.setProperties({
        "Button Text#9995:0": component.properties['Action Button Text'] || 'Action Button Text',
        "Has Leading Icon#9995:484": false
      })
    }
    // if(actionButton){
    //   actionButton.setProperties({
    //     "Button Text#9995:0": component.properties['Action Button Text'] || 'Action Button Text',
    //     "Has Leading Icon#9995:484": "false"
    //   })
    // }
  }


};

export default createSingleStatCard;
