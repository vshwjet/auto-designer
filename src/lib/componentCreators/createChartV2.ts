import { LLMResponseComponentType } from "../../types/llmResponseType";

const createChartv2 = (
    instance: InstanceNode,
    component: LLMResponseComponentType
) => {
    console.log('Creating chart', component, component.key);
    instance.layoutSizingHorizontal = "FILL";

    const properties = component.properties;
    console.log('properties', properties);

    // Handle header component (title and subtext)
    const header = instance.findOne(node => node.name === "Header") as FrameNode;
    console.log('Found header:', !!header);

    if (header) {
        const title = header.findOne(node => node.name === "Title") as FrameNode;
        console.log('Found title:', !!title);

        if (title) {
            const name = title.findOne(node => node.name === "Name") as FrameNode;
            console.log('Found name:', !!name);

            if (name) {
                const dropdownInstance = name.findOne(node =>
                    node.type === "INSTANCE" && node.name.includes("Dropdown")
                ) as InstanceNode;
                console.log('Found dropdown instance:', !!dropdownInstance);

                if (dropdownInstance) {
                    const buttonNode = dropdownInstance.findOne(node =>
                        node.name === "Button"
                    ) as InstanceNode;

                    if (buttonNode) {
                        const textNode = buttonNode.findOne(node =>
                            node.type === "TEXT" && node.name === "Text"
                        ) as TextNode;

                        if (textNode) {
                            textNode.characters = properties["Title"] || "Title";
                            console.log('Successfully updated button text to:', properties["Title"]);
                        } else {
                            console.log('Text node not found in Button component');
                        }
                    } else {
                        console.log('Button node not found in dropdown instance');

                        const findDropdownButton = (node: SceneNode): TextNode | null => {
                            if (node.type === 'TEXT' && node.name.includes('Button Text')) {
                                return node as TextNode;
                            }

                            if ('children' in node) {
                                for (const child of node.children) {
                                    const result = findDropdownButton(child);
                                    if (result) return result;
                                }
                            }
                            return null;
                        };

                        const dropdownButton = findDropdownButton(dropdownInstance);
                        console.log('Found dropdown button:', !!dropdownButton);

                        if (dropdownButton) {
                            dropdownButton.characters = properties["Title"] || "Title";
                            console.log('Successfully updated dropdown text to:', properties["Title"]);
                        }
                    }
                }
            }
        }
    }

    const subtextNode = instance.findOne(node =>
        node.type === "TEXT" && node.name === "Subtext about the graph here"
    ) as TextNode;

    if (subtextNode) {
        subtextNode.characters = properties["Title Subtext"] || "Subtext about the graph here";
        console.log('Successfully updated subtext to:', properties["Title Subtext"]);
    } else {
        console.log('Subtext node not found');
    }

    // Handle body component (chart properties)
    const body = instance.findOne(node => node.name === "Body") as InstanceNode;
    console.log('Found body:', !!body);

    if (body) {

        if (properties["Chart Type"]) {
            const chartTypeVariant = properties["Chart Type"];
            body.setProperties({ "Chart Type": chartTypeVariant });
            console.log('Set Chart Type to:', chartTypeVariant);
        }

        // Apply chart type
        //   if (properties["Chart Type"]) {
        //     const chartTypeVariant = properties["Chart Type"];
        //     body.setProperties({ "Chart Type": chartTypeVariant });
        //     console.log('Set Chart Type to:', chartTypeVariant);
        //   }

        //   // Apply state
        //   if (properties["State"]) {
        //     body.setProperties({ "State": properties["State"] });
        //     console.log('Set State to:', properties["State"]);
        //   }

        //   // Apply data point
        //   if (properties["Data Point"]) {
        //     body.setProperties({ "Data Point": properties["Data Point"] });
        //     console.log('Set Data Point to:', properties["Data Point"]);
        //   }

        //   // Apply Y-Axis
        //   if (properties["Y-Axis"]) {
        //     body.setProperties({ "Y-Axis": properties["Y-Axis"] });
        //     console.log('Set Y-Axis to:', properties["Y-Axis"]);
        //   }

        //   // Apply X-Axis
        //   if (properties["X-Axis"]) {
        //     body.setProperties({ "X-Axis Text#27504:167": properties["X-Axis"] });
        //     console.log('Set X-Axis to:', properties["X-Axis"]);
        //   }

        //   // Apply Has Legend
        //   if (properties["Has Legend"] !== undefined) {
        //     body.setProperties({ "Has Legend": properties["Has Legend"] });
        //     console.log('Set Has Legend to:', properties["Has Legend"]);
        //   }

        //   // Apply Has X-Axis Title
        //   if (properties["Has X-Axis Title"] !== undefined) {
        //     body.setProperties({ "Has X-Axis Title": properties["Has X-Axis Title"] });
        //     console.log('Set Has X-Axis Title to:', properties["Has X-Axis Title"]);
        //   }

        //   // Apply Has Y-Axis Title
        //   if (properties["Has Y-Axis Title"] !== undefined) {
        //     body.setProperties({ "Has Y-Axis Title": properties["Has Y-Axis Title"] });
        //     console.log('Set Has Y-Axis Title to:', properties["Has Y-Axis Title"]);
        //   }

        //   // Apply Has Dual Y Axis
        //   if (properties["Has Dual Y Axis"] !== undefined) {
        //     body.setProperties({ "Has Dual Y Axis": properties["Has Dual Y Axis"] });
        //     console.log('Set Has Dual Y Axis to:', properties["Has Dual Y Axis"]);
        //   }

        //   // Apply X-Axis Title text
        //   if (properties["X-Axis Title"]) {
        //     const xAxisTitleNode = body.findOne(node => 
        //       node.type === "TEXT" && node.name === "X-Axis Text"
        //     ) as TextNode;

        //     if (xAxisTitleNode) {
        //       xAxisTitleNode.characters = properties["X-Axis Title"];
        //       console.log('Set X-Axis Title text to:', properties["X-Axis Title"]);
        //     } else {
        //       console.log('X-Axis Text node not found');
        //       body.setProperties({ "X-Axis Text": properties["X-Axis Title"] });
        //     }
        //   }

        //   // Apply Y-Axis Title text
        //   if (properties["Y-Axis Title"]) {
        //     const yAxisTitleNode = body.findOne(node => 
        //       node.type === "TEXT" && node.name === "Y-Axis Text"
        //     ) as TextNode;

        //     if (yAxisTitleNode) {
        //       yAxisTitleNode.characters = properties["Y-Axis Title"];
        //       console.log('Set Y-Axis Title text to:', properties["Y-Axis Title"]);
        //     } else {
        //       console.log('Y-Axis Text node not found');
        //       body.setProperties({ "Y-Axis Text": properties["Y-Axis Title"] });
        //     }
        //   }
    } else {
        console.log('Body component not found');
    }
}


export const createChart = async (chartInstance: InstanceNode, component: LLMResponseComponentType) => {
    const header = chartInstance.findOne(node => node.name === "Header") as InstanceNode;
    const body = chartInstance.findOne(node => node.name === "Chart Body") as InstanceNode;
    chartInstance.layoutSizingHorizontal = "FILL";
    chartInstance.layoutSizingVertical = "HUG";
    if(header && body){

        console.log("Got header and body", component);
        console.log(component.properties["Chart Header Subtext"], component.properties["Chart Title"]);
        header.setProperties({
            "Subtext#27504:335": component.properties["Chart Header Subtext"] || "Subtext about the graph here",
        })

        const dropdownInstance = header.findOne(node => node.name === "Dropdown") as InstanceNode;
        console.log("Got dropdown instance", dropdownInstance);
        if(dropdownInstance){
            const buttonNode = dropdownInstance.findOne(node => node.name === "Button") as InstanceNode;
            console.log("Got button node", buttonNode);
            if(buttonNode){
                buttonNode.setProperties({
                    "Button Text#9995:0": component.properties["Chart Title"] || "Chart Title",
                })
            }
        }

        body.setProperties({
            "Chart Type": component.properties["Chart Type"] || "Line",
            "Data Point": component.properties["Data Point"] || "1",
            "State": component.properties["State"] || "Default",
            "X-Axis": component.properties["X-Axis"] || "8",
            "Y-Axis": component.properties["Y-Axis"] || "6",
            "X-Axis Text#27504:167": component.properties["X-Axis Title"] || "X-Axis Title",
            "Y-Axis Text#27432:0": component.properties["Y-Axis Title"] || "Y-Axis Title",
        })
    }

   
}

// export const createChart = async (component: LLMResponseComponentType, parentFrame: FrameNode) => {
//     console.log('Creating chart', component, component.key);

//     const chartFrame = await figma.createFrame();
//     parentFrame.appendChild(chartFrame);
//     chartFrame.layoutMode = "VERTICAL"
//     chartFrame.layoutSizingHorizontal = "FILL";

//     const headerFrame = await figma.importComponentByKeyAsync("405207dfa53fdbcf14a2c4bd8cb28a09f9afc8c8");
//     const headerInstance = headerFrame.createInstance();
//     chartFrame.appendChild(headerInstance);

//     const bodyFrame = await figma.importComponentByKeyAsync("16cb2818a37ff09c260a86763804748d1ab1ece6");
//     const bodyInstance = bodyFrame.createInstance();
//     chartFrame.appendChild(bodyInstance);

//     // const properties = component.properties;
//     // console.log('properties', properties);
// }


export default createChartv2;