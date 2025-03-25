import { LLMResponseFrameType } from '../../types/llmResponseType';
import { listComponentProperties } from '../utils';

const createTableFrame = async (
  frameDetails: LLMResponseFrameType,
  tableFrame: FrameNode
) => {
  tableFrame.name = frameDetails.name;
  tableFrame.paddingTop = frameDetails.layout?.padding.top || 0;
  tableFrame.paddingRight = frameDetails.layout?.padding.right || 0;
  tableFrame.paddingBottom = frameDetails.layout?.padding.bottom || 0;
  tableFrame.paddingLeft = frameDetails.layout?.padding.left || 0;

  if (!frameDetails.cells) return tableFrame;



  for (const cols of frameDetails.cells) {
    const colFrame = figma.createFrame();
    tableFrame.appendChild(colFrame);
    colFrame.name = 'Column';
    colFrame.layoutMode = 'VERTICAL';
    colFrame.layoutSizingVertical = 'HUG';
    colFrame.layoutSizingHorizontal = 'FILL';
    colFrame.itemSpacing = 0;

    for (const cell of cols) {
      const cellFrame = await createTableCell(cell);
      if (cellFrame) {
        colFrame.appendChild(cellFrame);
        cellFrame.layoutSizingHorizontal = "FILL";
      }
    }
  }
  return tableFrame;
};

async function createTableCell(cell: any) {
  const component = await figma.importComponentByKeyAsync(cell.key);
  if (!component) {
    console.error(`Component not found for key: ${cell.key}`);
    return null;
  }
  const instance = component.createInstance();
  const properties = cell.properties;
  const cellVariant = properties.variant;
  const cellType = properties.type;


  // if(cellVariant === "tag"){

  // }
  switch (cellType) {
    case "header":
      instance.setProperties({
        "Header Content#10157:166": properties['Header Content'] || 'Header'
      });
      break;
    case "cell":
      switch (cellVariant) {
        case "text":
          instance.setProperties({
            "Cell Content - Text#10157:224": properties['Cell Content - Text'] || 'Text'
          });
          break;

        case "date":
          instance.setProperties({
            "Cell Content - Alphanumeric#10157:340": properties['Cell Content - Alphanumeric'] || 'Date'
          });
          break;

        case "amount":
          instance.setProperties({
            "Cell Content - Number#10157:282": properties['Cell Content - Number'] || 'Amount'
          });
          break;
        case "tag":
          const content = instance.findOne(node => node.name === "Content") as FrameNode;
          console.log('content found', !!content);
          if (content) {
            const tag = content.findOne(node => node.name === "Tags") as InstanceNode;
            console.log('tag found', !!tag);

            tag.setProperties({
              "Color": properties['Color'] || "Primary",
              "Variant": properties['Tag Variant'] || "Subtle",
              "Label Text#10063:0": properties['Cell Content - Text'] || 'Tag'
            });

            // if(tag){
            //   const tag_base = tag.findOne(node => node.name === "Tag_Base") as InstanceNode;
            //   console.log('tag_base found', !!tag_base);

            //   if(tag_base){
            //    const text = tag_base.findOne(node => node.type === "TEXT" && node.name === "Text") as TextNode;
            //    if(text){
            //     text.characters = properties['Cell Content - Text'] || 'Tassg';
            //    }
            //   }
            // }
          }

      }
      break;
  }



  return instance;
}

export { createTableFrame, createTableCell };
