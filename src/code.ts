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
import { LLMResponseType } from './types/llmResponseType';

const temp_prompt = `
You are a Senior Product Designer. For the given prompt, create a design layout and break down the requirements into smaller sections based on the layout that you think is best. 
According to the layout, create a response in JSON formal with the following details:

Since we have a limit on the number of token that you can respond with we want to break down the requirements into smaller sections. For each of the sections, create a new prompt from the original prompt, the prompt for each section should only contain the details for the section


For example if someone asks you to create a dashboard with a sidebar and a main content area, you should create a layout with a sidebar and a main content area. 

For example

{
"response":{
   a parent frame (for the artboard) of type LLMResponseFrameType with type = "PARENT"

   in the children array, add two frame of type LLMResponseFrameType with type = "FRAME"  // since this is a layout that you have already decided for we can directly add as a FRAME
    1. a frame for the sidebar of type LLMResponseFrameType with type = "PROMPT_SEGMENT", // inside this, add a key "prompt" with the prompt for the section 
    2. a frame for the main content area of type LLMResponseFrameType with type = "PROMPT_SEGMENT" // inside this, add a key "prompt" with the prompt for the section
  } 
}


Each children that has as a PROMPT_SEGMENT type, will have a prompt key inside it.
We will use this prompt to generate the design for the section.
So make sure to add a proper prompt accordingly

Maintain consistency across all the sections
`

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

        const sidebarReq = msg.addToSidebar; 

        if(sidebarReq){
          const artboard = figma.createFrame();
          artboard.resize(1728, 1024);
          figma.currentPage.appendChild(artboard);
  
          artboard.name = 'Flow';
          artboard.layoutMode = 'HORIZONTAL';
          artboard.layoutSizingVertical = "HUG"
          artboard.primaryAxisSizingMode = 'FIXED';
          artboard.primaryAxisAlignItems = "MAX";
          // Add light grey background to the parent frame
          artboard.fills = [{
            type: 'SOLID',
            color: { r: 0.95, g: 0.95, b: 0.95 },
            opacity: 1
          }];

          const sidebarFrame = figma.createFrame();
          sidebarFrame.resize(500, sidebarFrame.height);
          artboard.appendChild(sidebarFrame);

          sidebarFrame.name = 'Sidebar';
          sidebarFrame.layoutMode = 'VERTICAL';
          sidebarFrame.layoutSizingVertical = "HUG"
          sidebarFrame.counterAxisSizingMode = 'FIXED';
          // Ensure sidebar has white background
          sidebarFrame.fills = [{
            type: 'SOLID',
            color: { r: 1, g: 1, b: 1 },
            opacity: 1
          }];
          
          figma.notify('Generating sidebar design...');
          
          // Parse the prompts just like in the regular flow
          const prompts = parseNumberedList(msg.prompt);
          
          // Process each prompt and add to the sidebar
          for (const prompt of prompts) {
            console.log('--------------- \n Getting sidebar prompt design: ', `Generating for a sidebar: ${prompt}`);
            const designSpec: LLMResponseType = await generateDesign(prompt);
            const flowDetails = designSpec.section;
            console.log('flowDetails for sidebar item', flowDetails);
            
            // Add the design to the sidebar frame instead of artboard
            await createParentFrame(flowDetails, sidebarFrame);
            
            await delay(3000);
            console.log('--------------- \n');
          }
          
          figma.viewport.scrollAndZoomIntoView([artboard]);
          
          await savePrompt(msg.prompt);
          figma.notify('Sidebar design generation completed!', {timeout: 1000});
          return;
        }

        // const designSpec: any = await generateDesign(msg.prompt, temp_prompt);
        // console.log(designSpec);


        // --------- OLD --------

        figma.notify('Generating design...');

        const prompts = parseNumberedList(msg.prompt);
        const artboard = figma.createFrame();
        artboard.resize(1728, 1024);
        figma.currentPage.appendChild(artboard);

        artboard.name = 'Flow';
        artboard.layoutMode = 'VERTICAL';

        

        for (const prompt of prompts) {
          console.log('--------------- \n Getting prompt design: ', prompt);
           const designSpec: LLMResponseType = await generateDesign(prompt);
          const flowDetails = designSpec.section;
          console.log('flowDetails', flowDetails);
          
          await createParentFrame(flowDetails, artboard);
          
          await delay(3000);
          console.log('--------------- \n');
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
        // createInstance("8b7de6b46a9f5382402012f5c8613936d5206669");


        // createInstance("755e5a4a9708e8b91aaae75e180ee871f549f55e");


        break;
      case 'clear-prompts':
        // Clear the saved prompts
        figma.clientStorage.setAsync('savedPrompts', [])
          .then(() => {
            // Notify the UI that prompts have been cleared
            figma.ui.postMessage({
              type: 'saved-prompts',
              prompts: []
            });
          })
          .catch(error => {
            console.error('Failed to clear prompts:', error);
          });
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
}

async function getSavedPrompts() {
  const prompts = await figma.clientStorage.getAsync("userPrompts") || [];
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


  // if(key == "e65e73efaa3409f22911401412152d8e46593643"){
  //   console.log('stat card');
  // }

  if(key == "755e5a4a9708e8b91aaae75e180ee871f549f55e"){
    console.log('info bar');

    instance.setProperties({
      "Type": "Teal",
      "Message#10026:3": "sdfsdfs",
      "Heading#10026:0": "Heading Text",
      "Has Action#10026:18": true,
    })
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


