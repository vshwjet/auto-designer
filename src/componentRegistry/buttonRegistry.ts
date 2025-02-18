import { 
  ButtonKey, 
  ButtonState, 
  ButtonSize,
  ButtonType,
  ButtonHierarchy,
  ButtonProperties,
  ButtonSizeValue,
  ButtonHierarchyValue,
  ButtonTypeValue,
  ButtonStateValue,
  ButtonWidthValue
} from '../types';

export function createButtonProperties(
  size: ButtonSizeValue,
  hierarchy: ButtonHierarchyValue,
  type: ButtonTypeValue,
  state: ButtonStateValue,
  width: ButtonWidthValue
): ButtonProperties {
  return {
    Size: size,
    Hirerchey: hierarchy,
    Type: type,
    State: state,
    Width: width
  };
}

export const buttonRegistry: ButtonSize = {
  
    "Primary": {
      "Solid Fill": {
        "large": {
          "Half": {
            "Default": "c51d18f7addda3a79d26c31ce33d0d7d394a50cf",
            "Hover": "8c4c3d1de01c15910ad5dc09e0055c76078e66c8",
            "Focused": "359ac2240c6d863b427c3c509f5648f452b0d773",
            "Disabled": "2e71d59aedbc4f1079575bdc80f6885794eb3422"
          },
          "Full": {
            "Default": "3a84a72551dd370e56b0ec8f50f7a00dd20cd190",
            "Disabled": "498c3def5632f7d220ae5d08a471113e73fd4299",
            "Hover": "a2192e593752f78368bc07d2a305ac87a67ef8ea",
            "Focused": "812a4d28c787c96c8c55b14d89ffd8835154ce23"
          }
        },
        "medium": {
          "Half": {
            "Default": "ed27fc1808366ae03131e492a952d31a7715c871",
            "Hover": "c8f366e7eb8394ceedfed0ea94d06cb3bbe0e538",
            "Focused": "0f03b8fa1da3d01a862d75de3e0ac93f45dfd0e4",
            "Disabled": "37e2db37bf456484e3a05a4bb88b69b7d3e51550"
          },
          "Full": {
            "Default": "62f93e6557dfe65ea41ad56312672b4e12fe881b",
            "Hover": "70e070f98ecd40cd0f756df5e3aaa393e1af2583",
            "Focused": "87aa1d1e5f7da4504292cb1169bed2aa9134fae2",
            "Disabled": "45af36bdb5c05d8158db98ea360518982a21a5c4"
          }
        },
        "small": {
          "Half": {
            "Default": "dc235390041a6a993899153e07cfa05b35fa0761",
            "Hover": "f91fa43486711a993373a876981516e3f84ed677",
            "Focused": "428ff0732534012a272e61322c0dead26b8a8d26",
            "Disabled": "b43d596792429fdfed0a4a72b94dc3d1b00a853c"
          },
          "Full": {
            "Default": "ae7fde3a8b9f13a4daae7fa8977e7834aa3c766d",
            "Hover": "c04e91f8c7672c58cc365a170b655c893b550b91",
            "Focused": "03081f40392c0c5627dc6cec5c000236d2867711",
            "Disabled": "9ecba56d62d1cfb864c6060d1f5dc791ca6ab992"
          }
        }
      }
    }
  
};

export function getButtonKey(
  hierarchy: keyof ButtonSize,
  type: keyof ButtonHierarchy,
  size: ButtonSizeValue,
  state: ButtonStateValue,
  width: ButtonWidthValue
): string {
  const hierarchyObj = buttonRegistry[hierarchy];
  if (!hierarchyObj) throw new Error(`Invalid hierarchy: ${String(hierarchy)}`);

  const typeObj = hierarchyObj[type];
  if (!typeObj) throw new Error(`Invalid type: ${String(type)}`);

  const sizeObj = typeObj[size];
  if (!sizeObj) throw new Error(`Invalid size: ${String(size)}`);

  const widthObj = sizeObj[width];
  if (!widthObj) throw new Error(`Invalid width: ${String(width)}`);

  const key = widthObj[state];
  if (!key) throw new Error(`Invalid state: ${String(state)}`);

  return key;
} 