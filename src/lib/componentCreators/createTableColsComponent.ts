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

  for (let i = 0; i < frameDetails.cells.length; i++) {
    const cols = frameDetails.cells[i];
    const colFrame = figma.createFrame();
    tableFrame.appendChild(colFrame);
    colFrame.name = 'Column';
    colFrame.layoutMode = 'VERTICAL';
    colFrame.layoutSizingVertical = 'HUG';
    colFrame.layoutSizingHorizontal = 'FILL';
    colFrame.itemSpacing = 0;

    for (let j = 0; j < cols.length; j++) {
      const cell = cols[j];
      // Determine cell type and position based on indices
      const cellType = j === 0 ? "header" : "cell";
      const cellPosition = i === 0 ? "left" : i === frameDetails.cells.length - 1 ? "right" : "intermediate";
      
      const cellFrame = await createTableCell(cell, cellType, cellPosition);
      if (cellFrame) {
        colFrame.appendChild(cellFrame);
        cellFrame.layoutSizingHorizontal = "FILL";
      }
    }
  }
  return tableFrame;
};

async function createTableCell(cell: any, cellType: string, cellPosition: string) {
  const component = await figma.importComponentByKeyAsync(cell.key);
  if (!component) {
    console.error(`Component not found for key: ${cell.key}`);
    return null;
  }
  const instance = component.createInstance();
  const properties = cell.properties;
  const cellVariant = properties.variant;
  // const cellType = properties.type;

  switch (cellType) {
    case "header":
      instance.setProperties({
        "Header Content#10157:166": properties['Header Content'] || 'Header',
        "position": cellPosition
      });
      break;
    case "cell":
      switch (cellVariant) {
        case "text":
          instance.setProperties({
            "Cell Content - Text#10157:224": properties['Cell Content - Text'] || 'Text',
            "position": cellPosition
          });
          break;

        case "date":
          instance.setProperties({
            "Cell Content - Alphanumeric#10157:340": properties['Cell Content - Alphanumeric'] || 'Date',
            "position": cellPosition
          });
          break;      

        case "amount":
          instance.setProperties({
            "Cell Content - Number#10157:282": properties['Cell Content - Number'] || 'Amount',
            "position": cellPosition
          });
          break;
        case "tag":
          instance.setProperties({
            "position": cellPosition
          });
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
          }
      }
      break;
  }



  return instance;
}

export { createTableFrame, createTableCell };
