/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
  width: 400,
  height: 500,
  themeColors: true,
});

import { createParentFrame } from './lib/createFlow';
import { generateDesign } from './services/openai';
import { PluginMessage } from './types';
import { ChildType, LLMResponseFrameType, LLMResponseType } from './types/llmResponseType';

function parseNumberedList(input: string): string[] {
  return input
    .split('\n')
    .map((line) => line.replace(/^\d+\.\s*/, ''))
    .filter((line) => line.trim() !== '');
}

figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'generate-design':
        if (!msg.prompt) {
          throw new Error('Design prompt is required');
        }

        figma.notify('Generating design...');

        const prompts = parseNumberedList(msg.prompt);
        const artboard = figma.createFrame();
        artboard.resize(1728, 1024);
        figma.currentPage.appendChild(artboard);

        artboard.name = 'Flow';
        artboard.layoutMode = 'VERTICAL';

        // Add a delay function
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (const prompt of prompts) {
          const designSpec: any = await generateDesign(prompt);
          const flowDetails = designSpec.flows[0];

          await createParentFrame(flowDetails, artboard);

          await delay(3000);
          console.log('Getting next prompt response');
        }
        break;
      case 'cancel':
        figma.closePlugin();
        break;
      case 'create-chart':

        // const statCardFrame = figma.createFrame();
        // statCardFrame.resize(1726, 1080);
        // statCardFrame.layoutMode = "HORIZONTAL";
        // statCardFrame.layoutSizingHorizontal = "HUG";
        // statCardFrame.paddingTop = 100;
        // statCardFrame.paddingRight = 100;
        // statCardFrame.paddingBottom = 100;
        // statCardFrame.paddingLeft = 100;


        //  const importedComponent = await figma.importComponentByKeyAsync("e65e73efaa3409f22911401412152d8e46593643");
        // const statCardInstance = importedComponent.createInstance();
        // statCardFrame.appendChild(statCardInstance);

        // statCardInstance.setProperties({
        //   "Stat Label#27356:0": "Total Revenue",
        //   "Stat Value#27356:5": "$50,000",
        //   "Stat Delta#27356:10": "+12%",
        //   "Trend": "Uptrend",
        //   "Type": "Action"
        // });

        // ------------------------------------------------------------

        const res = `{
    "type": "COMPONENT",
    "componentName": "Chart",
    "key": "3961e8bf50f6cc7f5dcd9c4b66652f20e67627f3",
    "properties": {
        "Chart Title": "Chart 1",
        "Chart Header Subtext": "",
        "Has Subtext": false,
        "Chart Type": "Line",
        "Data Point": "1",
        "State": "Default",
        "X-Axis": "8",
        "Y-Axis": "5",
        "X-Axis Title": "X-Axis 1",
        "Y-Axis Title": "Y-Axis 1"
    }
}`


        // figma.notify('Chart creation requested');
        // const chartFrame = figma.createFrame();
        // chartFrame.resize(1726, 1080);
        // chartFrame.layoutMode = "HORIZONTAL";
        // chartFrame.layoutSizingHorizontal = "HUG";
        // figma.currentPage.appendChild(chartFrame);
        // chartFrame.paddingTop = 100;
        // chartFrame.paddingRight = 100;
        // chartFrame.paddingBottom = 100;
        // chartFrame.paddingLeft = 100;

        // figma.ui.postMessage({
        //   type: 'status',
        //   message: 'Chart creation completed!',
        // });

        // const importedComponent = await figma.importComponentByKeyAsync("d23b37c43e17e6dc198003affcc8a7ba22567863");
        // const chartInstance = importedComponent.createInstance();
        // chartFrame.appendChild(chartInstance);

        // const header = chartInstance.findOne(node => node.name === "Header") as InstanceNode;
        // console.log('header', header);
        // header.setProperties({
        //   "Subtext#27504:335": "sss"
        // })
        // const dropdown = header.findOne(node => node.name === "Dropdown") as InstanceNode;
        // const dropdownButton = dropdown.findOne(node => node.name === "Button") as InstanceNode;
        // dropdownButton.setProperties({
        //   "Button Text#9995:0": "Jai Shree Ram"
        // })


        // const chartBody = chartInstance.findOne(node => node.name === "Chart Body") as InstanceNode;
        // chartBody.setProperties({
        //   "Chart Type" : "Line",
        //   "Data Point": "2"
        // })

        break;
    }
  } catch (error) {
    console.error('Failed to generate design:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    figma.notify('Failed to generate design: ' + errorMessage, { error: true });
  }
};
