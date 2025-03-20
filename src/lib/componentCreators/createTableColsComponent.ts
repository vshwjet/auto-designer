import { LLMResponseFrameType } from '../../types/llmResponseType';
import { listComponentProperties } from '../utils';

const createTableFrame = async (
  frameDetails: LLMResponseFrameType,
  tableFrame: FrameNode
) => {
  tableFrame.name = frameDetails.name;
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

  
  if(cellVariant === "tag") listComponentProperties(instance);
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
      }
      break;
  }



  return instance;
}

export { createTableFrame, createTableCell };
