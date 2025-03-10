import { populate } from "dotenv";
import { Frame } from "../../types";
import { listComponentProperties } from "../utils";

export async function createTableColComponent(frame: Frame) {
  const tableFrame = figma.createFrame();
  tableFrame.name = "Table";
  tableFrame.layoutMode = "HORIZONTAL";
  tableFrame.primaryAxisSizingMode = "AUTO";
  tableFrame.counterAxisSizingMode = "AUTO";
  tableFrame.itemSpacing = 0;

  // Iterate through each column in cells
  for (const column of frame.cells) {
    // Create a column frame with vertical layout
    const columnFrame = figma.createFrame();
    columnFrame.name = "Column";
    columnFrame.layoutMode = "VERTICAL";
    columnFrame.primaryAxisSizingMode = "AUTO";
    columnFrame.counterAxisSizingMode = "AUTO";
    columnFrame.itemSpacing = 0;

    // Create cells within the column
    for (const cell of column) {
      const cellFrame = await createTableCell(cell);
      if (cellFrame) {
        columnFrame.appendChild(cellFrame);
      }
    }

    tableFrame.appendChild(columnFrame);
  }

  return tableFrame;
}

async function createTableCell(cell: any) {
  const component = await figma.importComponentByKeyAsync(cell.key);
  if (!component) {
    console.error(`Component not found for key: ${cell.key}`);
    return null;
  }
  const instance = component.createInstance();
  listComponentProperties(instance);

  const props = cell.properties;
  const cellType = props.type || "header";

  if(cellType === "header") {
    console.log(props);
  }

  const mappedProps: { [key: string]: string | boolean } = {
    "type": cellType,
    "variant": props["variant"]?.value || "text",
    "state": props["state"]?.value || "default",
    "position": props.position || "left",
  };

  // Add the appropriate content property based on cell type
  if (cellType === "cell") {
    mappedProps["Cell Content - Text#10157:224"] = props["Cell Content - Text"] || "";
  } else if (cellType === "header") {
    mappedProps["Header Content#10157:166"] = props["Header Content"] || "";
  }

  console.log(mappedProps);

  instance.setProperties(mappedProps);
  return instance;
}

