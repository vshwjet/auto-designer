import { LLMResponseFrameType } from "../types/llmResponseType";

const setFrameLayoutDetails = (
  frame: FrameNode,
  frameDetails: LLMResponseFrameType
) => {
  if (!frame) return;

  const {
    layout,
    width,
    height,
    background,
    stroke,
    cornerRadius,
    effects,
    clipsContent,
    transform,
    opacity,
    blendMode,
    constraints
  } = frameDetails;

  // Set size
  if (width && height) {
    frame.resize(width, height);
  }

  // Set layout
  if (layout) {
    frame.layoutMode = layout.type;
    frame.paddingTop = layout.padding.top;
    frame.paddingRight = layout.padding.right;
    frame.paddingBottom = layout.padding.bottom;
    frame.paddingLeft = layout.padding.left;
  }

  frame.itemSpacing = layout.itemSpacing;

  // Set alignment
  if (layout?.alignment) {
    frame.primaryAxisAlignItems = layout.alignment.primary;
    frame.counterAxisAlignItems = layout.alignment.counter;
  }

  // Set background
  if (background) {
    frame.fills = [
      {
        type: 'SOLID',
        color: {
          r: background.color.r,
          g: background.color.g,
          b: background.color.b,
        },
        opacity: background.opacity,
      },
    ];
  }

  // Set stroke
  if (stroke) {
    frame.strokeWeight = stroke.width;
    frame.strokeAlign = stroke.alignment;
    
    // Set stroke style (solid, dashed, etc.)
    let dashPattern: number[] = [];
    if (stroke.style === 'DASHED') {
      dashPattern = [10, 5]; // Example dash pattern
    } else if (stroke.style === 'DOTTED') {
      dashPattern = [2, 2]; // Example dot pattern
    }
    
    frame.dashPattern = dashPattern;
    
    // Only set stroke if it's not NONE
    if (stroke.style !== 'NONE') {
      frame.strokes = [
        {
          type: 'SOLID',
          color: {
            r: stroke.color.r,
            g: stroke.color.g,
            b: stroke.color.b,
          },
          opacity: stroke.opacity,
        },
      ];
    } else {
      frame.strokes = [];
    }
  }

  // Set corner radius
  if (cornerRadius) {
    frame.cornerRadius = Math.max(
      cornerRadius.topLeft,
      cornerRadius.topRight,
      cornerRadius.bottomRight,
      cornerRadius.bottomLeft
    );
    
    frame.topLeftRadius = cornerRadius.topLeft;
    frame.topRightRadius = cornerRadius.topRight;
    frame.bottomRightRadius = cornerRadius.bottomRight;
    frame.bottomLeftRadius = cornerRadius.bottomLeft;
  }

  // Set effects (shadows and blur)
  if (effects) {
    const figmaEffects: Effect[] = [];
    
    // Add shadows
    if (effects.shadow) {
      effects.shadow.forEach(shadow => {
        if (shadow.visible) {
          if (shadow.type === 'DROP_SHADOW') {
            figmaEffects.push({
              type: 'DROP_SHADOW',
              color: {
                r: shadow.color.r,
                g: shadow.color.g,
                b: shadow.color.b,
                a: shadow.opacity,
              },
              offset: {
                x: shadow.offset.x,
                y: shadow.offset.y,
              },
              radius: shadow.blur,
              spread: shadow.spread,
              visible: shadow.visible,
              blendMode: 'NORMAL', // Required for Figma's Effect type
            });
          } else if (shadow.type === 'INNER_SHADOW') {
            figmaEffects.push({
              type: 'INNER_SHADOW',
              color: {
                r: shadow.color.r,
                g: shadow.color.g,
                b: shadow.color.b,
                a: shadow.opacity,
              },
              offset: {
                x: shadow.offset.x,
                y: shadow.offset.y,
              },
              radius: shadow.blur,
              spread: shadow.spread,
              visible: shadow.visible,
              blendMode: 'NORMAL', // Required for Figma's Effect type
            });
          }
        }
      });
    }
    
    // Add blur effect
    if (effects.blur) {
      if (effects.blur.type === 'LAYER_BLUR') {
        figmaEffects.push({
          type: 'LAYER_BLUR',
          radius: effects.blur.radius,
          visible: true,
        });
      } else if (effects.blur.type === 'BACKGROUND_BLUR') {
        figmaEffects.push({
          type: 'BACKGROUND_BLUR',
          radius: effects.blur.radius,
          visible: true,
        });
      }
    }
    
    frame.effects = figmaEffects;
  }

  // Set clipsContent
  if (clipsContent !== undefined) {
    frame.clipsContent = clipsContent;
  }

  // Set transform
  if (transform) {
    frame.rotation = transform.rotation;
    
    // Note: Handling flip transformations would require matrix manipulations
    // which depend on Figma's specific API implementation
    if (transform.flipHorizontal || transform.flipVertical) {
      // This is a placeholder - actual implementation would need to use
      // Figma's transformation matrix APIs
    }
  }

  // Set opacity
  if (opacity !== undefined) {
    frame.opacity = opacity;
  }

  // Set blend mode
  if (blendMode) {
    frame.blendMode = blendMode;
  }

  // Set constraints
  if (constraints) {
    frame.constraints = {
      horizontal: constraints.horizontal as ConstraintType,
      vertical: constraints.vertical as ConstraintType,
    };
  }
};

export default setFrameLayoutDetails;