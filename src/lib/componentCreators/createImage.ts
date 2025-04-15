import { LLMResponseComponentType } from '../../types/llmResponseType';
import { fetchUnsplashImagesByKeyword } from '../unsplashImages';

const createImage = async (
  component: LLMResponseComponentType,
  parentFrame?: FrameNode
): Promise<RectangleNode | null> => {
  try {

    let keyword = component.properties?.keyword;
    let unsplashImage = await fetchUnsplashImagesByKeyword(keyword);
    let imageURL = unsplashImage?.urls.regular;

    if(!imageURL) {
      imageURL = "https://i.ibb.co/CKv1sSfT/Screenshot-2025-03-26-at-4-19-21-PM.png"
    }
    
    const rect = figma.createRectangle();
    
    rect.resize(
      component.properties?.width ? parseInt(component.properties.width) : 300,
      component.properties?.height ? parseInt(component.properties.height) : 200
    );
    
    try {
      const imageData = await figma.createImageAsync(imageURL);
      
      const validScaleModes = ['FILL', 'FIT', 'CROP', 'TILE'] as const;
      const scaleMode = component.properties?.scaleMode;
      const validatedScaleMode = scaleMode && validScaleModes.includes(scaleMode as any) 
        ? scaleMode as "FILL" | "FIT" | "CROP" | "TILE" 
        : 'FILL';
      
      rect.fills = [
        {
          type: 'IMAGE',
          imageHash: imageData.hash,
          scaleMode: validatedScaleMode
        }
      ];
      
      rect.name = component.properties?.alt || 'Image';
      
      if (component.properties?.cornerRadius) {
        rect.cornerRadius = parseInt(component.properties.cornerRadius);
      }
      
      if (parentFrame) {
        parentFrame.appendChild(rect);
      }
      
      return rect;
    } catch (error) {
      console.error('Error fetching image:', error);
      
      const placeholder = figma.createRectangle();
      placeholder.resize(300, 200);
      placeholder.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
      placeholder.name = 'Failed to load image';
      
      if (parentFrame) {
        parentFrame.appendChild(placeholder);
      }
      
      return placeholder;
    }
  } catch (error) {
    console.error('Error creating image component:', error);
    return null;
  }
};

export const createImageFromUrl = async (
  url: string, 
  options: {
    width?: number;
    height?: number;
    cornerRadius?: number;
    name?: string;
    scaleMode?: 'FILL' | 'FIT' | 'CROP' | 'TILE';
    parentFrame?: FrameNode;
  } = {}
): Promise<RectangleNode | null> => {
  try {
    const rect = figma.createRectangle();
    
    rect.resize(
      options.width || 300,
      options.height || 200
    );
    
    try {
      const imageData = await figma.createImageAsync(url);
      
      const validScaleModes = ['FILL', 'FIT', 'CROP', 'TILE'] as const;
      const scaleMode = options.scaleMode;
      const validatedScaleMode = scaleMode && validScaleModes.includes(scaleMode as any) 
        ? scaleMode as "FILL" | "FIT" | "CROP" | "TILE" 
        : 'FILL';
      
      rect.fills = [
        {
          type: 'IMAGE',
          imageHash: imageData.hash,
          scaleMode: validatedScaleMode
        }
      ];
      
      rect.name = options.name || 'Image';
      
      if (options.cornerRadius) {
        rect.cornerRadius = options.cornerRadius;
      }
      
      if (options.parentFrame) {
        options.parentFrame.appendChild(rect);
      }
      
      return rect;
    } catch (error) {
      console.error('Error fetching image:', error);
      
      const placeholder = figma.createRectangle();
      placeholder.resize(options.width || 300, options.height || 200);
      placeholder.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
      placeholder.name = 'Failed to load image';
      
      if (options.parentFrame) {
        options.parentFrame.appendChild(placeholder);
      }
      
      return placeholder;
    }
  } catch (error) {
    console.error('Error creating image from URL:', error);
    return null;
  }
};

export default createImage;