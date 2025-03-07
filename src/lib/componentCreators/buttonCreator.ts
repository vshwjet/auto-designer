
export async function createButtonComponent(instance: InstanceNode, properties: any) {
  console.log("--------------------CREATING BUTTON COMPONENT new--------------------");
  console.log(properties);

  const mappedProperties = {
    "Button Text#9995:0": properties["Button Text"],
    "Has Leading Icon#9995:484": properties["Has Leading Icon"],
  };
  
  instance.setProperties(mappedProperties);
  console.log("--------------------BUTTON COMPONENT CREATED--------------------");
} 

