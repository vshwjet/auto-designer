export async function createStatCardComponent(instance: InstanceNode, properties: any) {
  const props = {
    "Stat Label#27356:0": properties["Stat Label"] || "Stat Label",
    "Stat Value#27356:5": properties["Stat Value"] || "0",
    "Stat Delta#27356:10": properties["Stat Delta"] || "0%"
  };
  instance.setProperties(props);
} 