import { LLMResponseFrameType } from '../../types/llmResponseType';

const createTableFrame = async (frame: LLMResponseFrameType) => {
  console.log('Creating table frame', frame.name);
  const tableFrame = figma.createFrame();
  tableFrame.name = frame.name;

  tableFrame.layoutMode = 'HORIZONTAL';
  tableFrame.primaryAxisSizingMode = 'AUTO';
  tableFrame.counterAxisSizingMode = 'AUTO';
  tableFrame.itemSpacing = 0;
  tableFrame.layoutGrow = 1;

  if (!frame.cells) return tableFrame;

  for (const cols of frame.cells) {
    const colFrame = figma.createFrame();
    colFrame.name = 'Column';
    colFrame.layoutMode = 'VERTICAL';
    colFrame.primaryAxisSizingMode = 'AUTO';
    colFrame.counterAxisSizingMode = 'AUTO';
    colFrame.itemSpacing = 0;

    for (const cell of cols) {
      const cellFrame = await createTableCell(cell);
      if (cellFrame) {
        colFrame.appendChild(cellFrame);
      }
    }

    tableFrame.appendChild(colFrame);
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

  const props = cell.properties;
  const cellType = props.type || 'header';

  const mappedProps: { [key: string]: string | boolean } = {
    type: cellType,
    variant: props['variant']?.value || 'text',
    state: props['state']?.value || 'default',
    position: props.position || 'left',
  };

  // Add the appropriate content property based on cell type
  if (cellType === 'cell') {
    mappedProps['Cell Content - Text#10157:224'] =
      props['Cell Content - Text'] || '';
  } else if (cellType === 'header') {
    mappedProps['Header Content#10157:166'] = props['Header Content'] || '';
  }

  instance.setProperties(mappedProps);
  return instance;
}

export { createTableFrame, createTableCell };
