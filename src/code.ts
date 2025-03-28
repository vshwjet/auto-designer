/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
  width: 500,
  height: 300,
  themeColors: true,
  title: "Figmate"
});

import { createParentFrame } from './lib/createFlow';
import { delay } from './lib/utils';
import { generateDesign } from './services/openai';
import { PluginMessage } from './types';

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

        

        for (const prompt of prompts) {
          const designSpec: any = await generateDesign(prompt);
          const flowDetails = designSpec.section;

          await createParentFrame(flowDetails, artboard);

          await delay(3000);
          console.log('Getting next prompt response');
        }

        // Scroll to the generated content after completion
        figma.viewport.scrollAndZoomIntoView([artboard]);

        await savePrompt(msg.prompt);
        figma.notify('Design generation completed!', {timeout: 1000});
        break;
      case 'save-prompt':
        await savePrompt(msg.prompt);
        break;
      case 'get-prompts':
        const savedPrompts = await getSavedPrompts();
        figma.ui.postMessage({ type: 'saved-prompts', prompts: savedPrompts });
        break;
      case 'cancel':
        figma.closePlugin();
        break;
      case 'create-chart':

        // action stat card
        // createInstance("e65e73efaa3409f22911401412152d8e46593643");

        // button
        // createInstance("c51d18f7addda3a79d26c31ce33d0d7d394a50cf");

        // advert card
        // createInstance("8da576d58256bec6595649022b5c864d39d862ee");

        //input field
        createInstance("8b7de6b46a9f5382402012f5c8613936d5206669");
        break;
    }
  } catch (error) {
    console.error('Failed to generate design:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    figma.notify('Failed to generate design: ' + errorMessage, { error: true });
  }
};

async function savePrompt(prompt: string) {
  let prompts = await figma.clientStorage.getAsync("userPrompts") || [];
  if (!Array.isArray(prompts)) {
    prompts = [];
  }
  prompts.push(prompt);

  await figma.clientStorage.setAsync("userPrompts", prompts);
  console.log("Prompt saved:", prompt);
}

async function getSavedPrompts() {
  const prompts = await figma.clientStorage.getAsync("userPrompts") || [];
  console.log("Saved Prompts:", prompts);
  return prompts;
}


const createInstance = async (key: string) => {
  const parentFrame = figma.createFrame();
  parentFrame.resize(1726, 1080);
  parentFrame.layoutMode = "VERTICAL";
  parentFrame.layoutSizingHorizontal = "HUG";
  parentFrame.paddingTop = 100;
  parentFrame.paddingRight = 100;
  parentFrame.paddingBottom = 100;
  parentFrame.paddingLeft = 100;
  const importedComponent = await figma.importComponentByKeyAsync(key);
  const instance = importedComponent.createInstance();
  parentFrame.appendChild(instance);


  if(key == "e65e73efaa3409f22911401412152d8e46593643"){
    console.log('stat card');
  }


  if(key == "e65e73efaa3409f22911401412152d8e46593643"){
    instance.setProperties({
      "Type": "Action"
    })
    const actionButton = instance.findOne(node => node.name === "Button") as InstanceNode;
    if(actionButton){
      actionButton.setProperties({
        "Button Text#9995:0": "Test", 
        "Has Leading Icon#9995:484": false
      })
    }
  }

  // Input Field
  if(key == "8b7de6b46a9f5382402012f5c8613936d5206669"){
    instance.setProperties({
      "Label Text#9987:546": "Test",
      "Text Placeholder#10157:2": "Placeholder",
      "Hint Text#9987:728": "Hint da text",
      "Type": "Floating Label - Number"
    })
  }

  if(key == "c51d18f7addda3a79d26c31ce33d0d7d394a50cf"){
    // Button
    instance.setProperties({
      "Button Text#9995:0": "Custom Button Text", 
      "Has Leading Icon#9995:484": false,
      "Has Trailing Icon#10131:0": false,
      "Has Text#9995:121": true,
      "Hirerchey": "Primary",
      "Size": "small",
      "State": "Default",
      "Type": "Solid Fill",
      "Width": "Half"
    })
  }
}


// createImageFromUrl("https://i.ibb.co/CKv1sSfT/Screenshot-2025-03-26-at-4-19-21-PM.png", {
        //   width: 500,
        //   height: 500,
        //   cornerRadius: 10,
        //   name: "Google Logo",
        //   scaleMode: "FIT"
        // })
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



        // figma.notify('Chart creation requested');
        // const chartFrame = figma.createFrame();
        // chartFrame.resize(1726, 1080);
        // chartFrame.layoutMode = "VERTICAL";
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
        // const barChartInstance = importedComponent.createInstance();
        // chartFrame.appendChild(barChartInstance);
        // barChartInstance.layoutSizingHorizontal = "FILL";

        // const header = barChartInstance.findOne(node => node.name === "Header") as InstanceNode;
        // console.log('header', header);
        // header.setProperties({
        //   "Subtext#27504:335": "sss"
        // })
        // const barChartDropdown = header.findOne(node => node.name === "Dropdown") as InstanceNode;
        // const barChartDropdownButton = barChartDropdown.findOne(node => node.name === "Button") as InstanceNode;
        // barChartDropdownButton.setProperties({
        //   "Button Text#9995:0": "Test"
        // })


        // const chartBody = barChartInstance.findOne(node => node.name === "Chart Body") as InstanceNode;

        // chartBody.setProperties({
        //   "Chart Type": "Bar",
        //   "Data Point": "5",
        //   "State": "Default",
        //   "X-Axis": "NA",
        //   "Y-Axis": "7",
        //   "X-Axis Text#27504:167": "X-Axis Title",
        //   "Y-Axis Text#27432:0": "Y-Axis Title",
        //   "Has Legend#27723:0": false,
        //   "Has X-Axis Title#27410:25": true,
        //   "Has Y-Axis Title#27410:0": true,
        // })


        // const lineChartInstance = importedComponent.createInstance();
        // chartFrame.appendChild(lineChartInstance);
        // lineChartInstance.layoutSizingHorizontal = "FILL";
        // const lineHeader = lineChartInstance.findOne(node => node.name === "Header") as InstanceNode;
        // lineHeader.setProperties({
        //   "Subtext#27504:335": "sss"
        // })

        // const lineChartBody = lineChartInstance.findOne(node => node.name === "Chart Body") as InstanceNode;
        // listComponentProperties(lineChartBody);
        // lineChartBody.setProperties({
        //   // "Chart Type": "Line",
        //   "Data Point": "5",
        //   "State": "Default",
        //   "X-Axis": "8",
        //   "Y-Axis": "6",
        //   // "X-Axis Text#27504:167": "X-Axis Title",
        //   // "Y-Axis Text#27432:0": "Y-Axis Title",
        //   // "Has Legend#27723:0": true,
        //   // "Has X-Axis Title#27410:25": true,
        //   // "Has Y-Axis Title#27410:0": true,
        // })
