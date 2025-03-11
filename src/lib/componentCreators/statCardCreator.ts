import { LLMResponseComponentType } from "../../types/llmResponseType";

const createSingleStatCard = (instance: InstanceNode, component: LLMResponseComponentType)=> {
  console.log("Creating single stat card", component.componentName);
  const mappedProps = {
    "Stat Delta#27356:10": component.properties["Stat Delta"] || "8%",
    "Stat Label#27356:0": component.properties["Stat Label"] || "Stat Label",
    "State": component.properties["State"] || "uptrend",
    "Type": component.properties["Type"] || "horizontal",
    "Stat Value#27356:5": component.properties["Stat Value"] || "100",
  }
  console.log(mappedProps)
  instance.setProperties(mappedProps);
}


export default createSingleStatCard;