import {
  DropdownHierarchy,
  DropdownSizeValue,
  DropdownTypeValue,
  DropdownStateValue,
  DropdownHierarchyValue,
  DropdownsProperties
} from '../types';

export const dropdownRegistry: DropdownHierarchy = {
  "Secondary": {
    "Large": {
      "Single Select": {
        "Default": "ee408cbba38b40654e75e01683a7f1d488002453",
        "Hovered": "67a40eefc3d50cb061ce2074595631270031cb37",
        "Focused": "bcdf5de35b726c79f516c68924212dfca7ea4077",
        "Filled": "8c14d90a8d58ac7cf30739d9610faefa2ef108af",
        "Opened": "c81b2fbf0e668a91e9163887fd9c98ecc938fdb4",
        "Disabled": "45217b1b69eeecf6c18f952d30accb67ca6e378f"
      },
      "Multiselect": {
        "Default": "f8aa2f35a3d4f6a42fa8c80162f74a836fa089c0",
        "Hovered": "f3fa37888eae7b6cff70617e7a21347f1d21e716",
        "Focused": "27aea88b78e208700df9f5ddf5925b867801aa64",
        "Opened": "1cf8d461ab50eb54d0895fa20698504b7289c541",
        "Filled": "36cf8c24c675935cde5882f39b9a9f359b74ebc4",
        "Disabled": "59102762fffad87720b210a5a54c228a25a1d452"
      }
    },
    "Medium": {
      "Single Select": {
        "Default": "3709aaf9f998712d7bd08e39658a2c086345b6e7",
        "Hovered": "be957a590195ed1b3ca597026f1f157e498bb7ef",
        "Focused": "18008b504462c17b54bb5ddcf306265858a096e2",
        "Opened": "d83a05f904c655031428e6ab22781bb497990c3e",
        "Filled": "b7c3daef789343b90f9857ec488d178199efe699",
        "Disabled": "6039fb98202c168152abc9e1f154a55b12913b06"
      },
      "Multiselect": {
        "Default": "160a868071a123b4a148d8bb5f32ae745d760913",
        "Hovered": "9342105cde16ad3b40afd3be59d42abd21bdc166",
        "Focused": "a928964f6c1c05f137839cd97e14463cdf1f3410",
        "Opened": "5d180272def4bde34d5ac1d8738e778b52c69e91",
        "Filled": "47fb8896e4793721ac412e50612ba68a412d2921",
        "Disabled": "03c9c04ff0043d44ed523451ea07e178b97dc37b"
      }
    }
  },
  "Tertiary": {
    "Large": {
      "Single Select": {
        "Default": "de61819a43df71b12330bb24889cf424b8b3965e",
        "Hovered": "c2074c80eec83d14e57a2e6007cd0b656046f75f",
        "Focused": "8631bc7769c868d1b019c995ce3cd4d9fad137d6",
        "Opened": "4e44546527b4f25a006c550b91d6e4a4d6eff4d1",
        "Filled": "509f5f7c6d08ef51b19ca500038284d0e1a2d227",
        "Disabled": "d006d62adea605504b37a99ab51e705298380e0f"
      },
      "Multiselect": {
        "Default": "aa5690896cfd52d4a9075b94aeafe293407d731e",
        "Hovered": "17a7c51b8d27c81ae11a6388441cfaaa79f661de",
        "Focused": "e67b2fadd773fbc251ba5758eabe833d14a94938",
        "Opened": "791e0a52427683b228862c9b372218770b88a83b",
        "Filled": "4653631d2a800a518744142dd152ec91792bc23c",
        "Disabled": "b906144b1ba29aebb54864c1ee23a81532a64db0"
      }
    },
    "Medium": {
      "Single Select": {
        "Default": "d1db2199a4238db670c0e25044aab98efd0f759e",
        "Hovered": "9ab1964e58becf13ec1d0aa73478fe10558ab2a5",
        "Focused": "cc2de9d885c42f59d6d1bd1bf21aed7fbd6c5fa7",
        "Opened": "9510993d71396531f0351d7cea2e6cd5f778d1a8",
        "Filled": "1bc3e38ed8de790751a285fe2822c1de1f59fe67",
        "Disabled": "6a92ced7d6e33751ee37db4d347848ba4461e8b4"
      },
      "Multiselect": {
        "Default": "5580036f6b5b90f2f979aa897980ee5d40c02553",
        "Hovered": "89266b122945aa01e06b9d79bfa2c53495f10323",
        "Focused": "626e4d7433b0207c5028aad2d570068123bf7a74",
        "Opened": "e24b406040f0b2bc12f9bb48cdd5f771438b6a41",
        "Filled": "dc3060b378ee4f82b9317a7b7c969e91aa4cef9d",
        "Disabled": "5e5337c8f323ed562bbf59cd6861c594b69049f8"
      }
    }
  }
};

export function getDropdownKey(
  hierarchy: DropdownHierarchyValue,
  size: DropdownSizeValue,
  type: DropdownTypeValue,
  state: DropdownStateValue
): string {
  const hierarchyObj = dropdownRegistry[hierarchy];
  if (!hierarchyObj) throw new Error(`Invalid hierarchy: ${String(hierarchy)}`);

  const sizeObj = hierarchyObj[size];
  if (!sizeObj) throw new Error(`Invalid size: ${String(size)}`);

  const typeObj = sizeObj[type];
  if (!typeObj) throw new Error(`Invalid type: ${String(type)}`);

  const key = typeObj[state];
  if (!key) throw new Error(`Invalid state: ${String(state)}`);

  return key;
}

export function createDropdownProperties(
  hierarchy: DropdownHierarchyValue,
  size: DropdownSizeValue,
  type: DropdownTypeValue,
  state: DropdownStateValue
): DropdownsProperties {
  return {
    "State Visibility": state,
    "Label Visibility": "Visible",
    "Stacking Direction": "Vertical"
  };
} 