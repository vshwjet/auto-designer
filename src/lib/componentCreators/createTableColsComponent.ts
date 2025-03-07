import { TableCellVariantValue } from '../../types';

export async function createTableColComponent(instance: InstanceNode, properties: any) {
  // console.log("--------CREATING TABLE COL--------")
  // console.log(properties, instance.name)
  // const props: { [key: string]: string | boolean } = {};
  
  // if (properties.type === "header") {
  //   props["Header Content"] = properties["Header Content"] || "";
  //   if (properties["Has Filter"]) {
  //     props["Has Filter"] = true;
  //   }
  // } else {
  //   switch (properties.variant) {
  //     case TableCellVariantValue.Text:
  //       props["Cell Content - Text"] = properties["Cell Content - Text"] || "";
  //       break;
  //     case TableCellVariantValue.Amount:
  //       props["Cell Content - Amount"] = properties["Cell Content - Amount"] || "";
  //       break;
  //     case TableCellVariantValue.Date:
  //       props["Cell Content - Date"] = properties["Cell Content - Date"] || "";
  //       break;
  //     case TableCellVariantValue.Tag:
  //       props["Cell Content - Tag"] = properties["Cell Content - Tag"] || "";
  //       break;
  //     case TableCellVariantValue.User:
  //       props["Cell Content - User"] = properties["Cell Content - User"] || "";
  //       break;
  //   }
  // }

  // if (properties["Has Cell Icon 1"]) props["Has Cell Icon 1"] = true;
  // if (properties["Has Cell Icon 2"]) props["Has Cell Icon 2"] = true;
  // if (properties["Has Cell Icon 3"]) props["Has Cell Icon 3"] = true;
  // if (properties["Has Cell Icon More"]) props["Has Cell Icon More"] = true;

  // instance.setProperties(props);
  // console.log("--------TABLE CELL CREATED--------")

  //--------------------------------
  console.log("--------CREATING TABLE COL--------")
  const props: { [key: string]: string | boolean } = {};

  if(instance.children && instance.children.length > 0){
    for(const child of instance.children){
      console.log("Found a child - table", child.name)
      if(child.type.toLocaleLowerCase() === "tablecell"){
        await createTableCellComponent(child);
      }
    }
  }

  instance.setProperties(props);
  console.log("--------TABLE COL CREATED--------")

} 

export async function createDataTableComponent(instance: InstanceNode, properties: any) {
  console.log("--------CREATING TABLE COLS--------")
  console.log(properties, instance.name)
}

export async function createTableCellComponent(instance: any) {
  console.log("--------CREATING TABLE CELL--------")
  console.log(instance)
}