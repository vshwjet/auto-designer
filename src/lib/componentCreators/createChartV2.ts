import { LLMResponseComponentType } from "../../types/llmResponseType";

const createChartv2 = (
    instance: InstanceNode,
    component: LLMResponseComponentType
) => {

    instance.layoutSizingHorizontal = "FILL";

    const properties = component.properties;

    // Handle header component (title and subtext)
    const header = instance.findOne(node => node.name === "Header") as FrameNode;

    if (header) {
        const title = header.findOne(node => node.name === "Title") as FrameNode;

        if (title) {
            const name = title.findOne(node => node.name === "Name") as FrameNode;

            if (name) {
                const dropdownInstance = name.findOne(node =>
                    node.type === "INSTANCE" && node.name.includes("Dropdown")
                ) as InstanceNode;

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
                        }
                    } else {

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

                        if (dropdownButton) {
                            dropdownButton.characters = properties["Title"] || "Title";
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
    }
    // Handle body component (chart properties)
    const body = instance.findOne(node => node.name === "Body") as InstanceNode;

    if (body) {

        if (properties["Chart Type"]) {
            const chartTypeVariant = properties["Chart Type"];
            body.setProperties({ "Chart Type": chartTypeVariant });
        }
    }
}


export const createChart = async (chartInstance: InstanceNode, component: LLMResponseComponentType) => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    const header = chartInstance.findOne(node => node.name === "Header") as InstanceNode;
    const body = chartInstance.findOne(node => node.name === "Chart Body") as InstanceNode;
    chartInstance.layoutSizingHorizontal = "FILL";
    chartInstance.layoutSizingVertical = "HUG";
    if (header && body) {

        header.setProperties({
            "Subtext#27504:335": component.properties["Chart Header Subtext"] || "Subtext about the graph here",
        })

        const dropdownInstance = header.findOne(node => node.name === "Dropdown") as InstanceNode;
        if (dropdownInstance) {
            const buttonNode = dropdownInstance.findOne(node => node.name === "Button") as InstanceNode;
            if (buttonNode) {
                buttonNode.setProperties({
                    "Button Text#9995:0": component.properties["Chart Title"] || "Chart Title",
                })
            }
        }

        if (component.properties["Chart Type"] == "Bar") {
            body.setProperties({
                "Chart Type": "Bar",
                "Data Point": String(Math.min(Math.max(Number(component.properties["Data Point"] || "5"), 5), 8)),
                "State": "Default",
                "X-Axis": "NA",
                "Y-Axis": "7",
                "X-Axis Text#27504:167": String(component.properties["X-Axis Title"] || "X-Axis Title"),
                "Y-Axis Text#27432:0": String(component.properties["Y-Axis Title"] || "Y-Axis Title"),
                "Has Legend#27723:0": false,
                "Has X-Axis Title#27410:25": true,
                "Has Y-Axis Title#27410:0": true,
            })
        } else {
            body.setProperties({
                "Data Point": "3",
                "State": "Default",
                "X-Axis": component.properties["X-Axis"] || "8",
                "Y-Axis": component.properties["Y-Axis"] || "6",
                "X-Axis Text#27504:167": String(component.properties["X-Axis Title"] || "X-Axis Title"),
                "Y-Axis Text#27432:0": String(component.properties["Y-Axis Title"] || "Y-Axis Title"),
            })
        }
    }


}

export default createChartv2;