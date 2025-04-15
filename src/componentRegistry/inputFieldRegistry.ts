import {
  InputFieldSize,
  InputFieldSizeValue,
  InputFieldTypeValue,
  InputFieldStateValue,
  InputFieldVariantValue,
  InputFieldsProperties,
} from '../types';

export const inputFieldRegistry: InputFieldSize = {
  Medium: {
    Placeholder: {
      Text: {
        Default: '8b7de6b46a9f5382402012f5c8613936d5206669',
        Hovered: '4233804e2f1f359a590ad42755881ba0afb82c84',
        Focused: '91c0e71ff4ffcc2b135c135c332b1ed8190acd9b',
        Disabled: '4fa0eefe8b9fb6a61288d5621bf408d3c58bf9c3',
        Error: '0dbcd89b1a04f6fa6a319bf8a92a8627f944c940',
      },
      'Phone Number': {
        Default: 'eba556d2ee74f9a10b88383e4274ea816251c9e6',
        Hovered: '161518940b134020cc4596bdc764dd3173a5e5f4',
        Focused: '9713c7c161b9f4753f515371a7f6c9d98b15f8d8',
        Disabled: '5d6b9e549e8f3ecde5eb4fd1aeda2f250dd9d7d7',
        Error: '24414eb56c810d458cb92370ee3a7c503805e056',
      },
      'Floating Label - Text': {
        Default: '575c88bd41555f65b37eb2d5351b7e7ebbd29d35',
        Hovered: '94284ced834d7d7d06c2e8fd99f78ec8b338cc89',
        Focused: 'a7fb05166cda37b37130e2511b29dafa79b06382',
        Disabled: 'cbce0a5c6b3d4cfa2d15eb880f63eaeb3a781c15',
        Error: 'af784ee6cc660a557ddfb25fa3f3c31d9baf6019',
      },
      'Floating Label - Number': {
        Default: 'b5a907c524648a23e8596f7393c255f85d70c5e5',
        Hovered: 'd2463f84daf6f4039bc85c16466561f9acf1f1f0',
        Focused: '6921b564160429ceebcb7b6712f3765e6185bc3c',
        Disabled: '71b2c3fff1a00ab1b97ba17309ef65ab512e92f4',
        Error: '4fc28fcdf813c54168a58bcf6363dcb67052530b',
      },
    },
    Filled: {
      Text: {
        Default: '3df6dd640e72472827a451ea7a365a1d6df56410',
        Hovered: '40defdd6d5a8658da2f5e4609d4b1013c5c869bd',
        Focused: 'f366a021d23938b216c849ecf5e793175abb1579',
        Disabled: '81c19cfffd7c3514496b76add8254a9b9130b08c',
        Error: 'bb1be2fe689c4eb9b94b48494c254c8244ee572e',
      },
      'Phone Number': {
        Default: 'd456fe94b8747a677c13b14a24250a24eb16b8a1',
        Hovered: 'd58af1d52011895ddf10d1dbcdecb40caf564040',
        Focused: '8ee7c6e2a234fb2dc13186d4ecc7571afbd2649d',
        Disabled: '11b6297098af9fdff7eb72391b501d07842d3253',
        Error: '31018637dd1aef3911317aaba0bb6421b16e45c7',
      },
      'Floating Label - Text': {
        Default: '0020b5b70b2da908d675cc85df3539e49d7998a6',
        Hovered: '480ba1620e6b7ded2bebdea4cf835690e8d36888',
        Focused: '0e741219a63df2741cd872eb997a6a8393a273dd',
        Disabled: 'c4c4bd935392f9e26436b341fed64bdcf685454d',
        Error: 'dd09a28cb94bc4c854e65c4cf25f7839c8f5522a',
      },
      'Floating Label - Number': {
        Default: 'f41f502196478b46ec8b6303d025b0c1a9a2f656',
        Hovered: '8a0be06ea0943a24b01195c903a29b7c1f4511de',
        Focused: '2e867d1f28455c6bdc931764a4ff2e7fd1eb2e7d',
        Disabled: '1406db0ceef3767eb9b064ba1443402fc7d7e510',
        Error: 'd327ddb22dae0a99e34bd927fa616d8d4981af65',
      },
    },
  },
  Small: {
    Placeholder: {
      Text: {
        Default: 'db06d80990ab9628fd7f5de72d353afb12376def',
        Hovered: 'b185ea49fa1ebb37fe889a6cde4c94ca478f5dc3',
        Focused: '35c74a1fc28c5b97ea6d9a774ef4bda3baf347af',
        Disabled: '378e1d787366569050121b4798e1e492927b2388',
        Error: '516ff31961da86639bff82d1a72732e107bc19df',
      },
      'Phone Number': {
        Default: 'bede477622be59ff910f1582cb0fce874a52416c',
        Hovered: 'faf5b5743c7a4d7d24dba24989fbccdc441cf0f1',
        Focused: '50188dfb0494affe5cc3358f7f845b2f3afa1e12',
        Disabled: '08931cfacf0e6c635a1fd0f95c3bada242d0dac9',
        Error: '36690d1e19467c67114c88968b56a8197f22ba6f',
      },
      'Floating Label - Text': {
        Default: '1f46e6f12c37880cba770181a1d72bfc5cb72a47',
        Hovered: '3bb2d87a65dd1fd6e813bb82fff447eb21344171',
        Focused: '9ff40c40bc6720ccee97007499e1e7b85eb0e6b5',
        Disabled: '22c71fe5099bfe14c4ea0e368365e4303a94fad5',
        Error: 'bf1f6c8e9934837198a871ee82c25587e01b41c8',
      },
      'Floating Label - Number': {
        Default: '7f8316c046c658e370f4ba740506fd6c301dc1a3',
        Hovered: 'a02e0099d9640eb51e8bf54379aa380a9309178f',
        Focused: '687a05ededfb136a4fc7645660a58f47f2ad562a',
        Disabled: '8ba0f62a794d309fcc6e1a62e41675042fb7514f',
        Error: '88909a8525041d2ab7f024abeb28174779ad5559',
      },
    },
    Filled: {
      Text: {
        Default: '91518cf7094967736fb9978b091a4b5b3d17ad22',
        Hovered: '5e3f414027b372dd994a5ce3cc66f1be7aa51dbb',
        Focused: '400619bc1e68a52dbb38a37831d72cc19c9576f9',
        Disabled: '5892640b5209023bd0f4b15b16ec7f16289d7561',
        Error: '65b605c53b26cd942a7c1331f8c7b626105af396',
      },
      'Phone Number': {
        Default: '0fc5cfa310ef24c804fe35cdbe30c4ba4b3c4907',
        Hovered: '1ce09efdd2e15a98370bcad98d192db3806fe52f',
        Focused: 'f0a592d865203650309280c751934df68ec06d69',
        Disabled: '35d44fa74ca2cd364444422e5db8f1d7807ca1b6',
        Error: '2cc8285c6db0642068f110baded40bfd17270cc9',
      },
      'Floating Label - Text': {
        Default: '651df1f207c6b41008c598deb097e7e00d27608e',
        Hovered: 'ab11fee083b3456f4c53a565e74386d0dfc4099b',
        Focused: '262f14ff8b8f6c96dfc6cac17418e769e38ba8fb',
        Disabled: '55a35177838404f55b8d8454900953e89dd4ab58',
        Error: 'a6ca58e5a8f74792077970e8892a0d7050c68815',
      },
      'Floating Label - Number': {
        Default: '1c00a9bca67fe0743607eda37b7b01fba8b4dbdc',
        Hovered: 'b2c78f4c6277c6695f5f8b3f493832b4ad6fe266',
        Focused: '1749a0d519af63e9cf5b3fca42566992644be788',
        Disabled: 'c10b26a580469a93b6a30505d20ba6ad7bf57f2a',
        Error: 'aabc0ffccfe52485521f251dfc05c4eee1d89f8b',
      },
    },
  },
};

export function getInputFieldKey(
  size: InputFieldSizeValue,
  variant: InputFieldVariantValue,
  type: InputFieldTypeValue,
  state: InputFieldStateValue
): string {
  const sizeObj = inputFieldRegistry[size];
  if (!sizeObj) throw new Error(`Invalid size: ${String(size)}`);

  const variantObj = sizeObj[variant];
  if (!variantObj) throw new Error(`Invalid variant: ${String(variant)}`);

  const typeObj = variantObj[type];
  if (!typeObj) throw new Error(`Invalid type: ${String(type)}`);

  const key = typeObj[state];
  if (!key) throw new Error(`Invalid state: ${String(state)}`);

  return key;
}

export function createInputFieldProperties(
  size: InputFieldSizeValue,
  variant: InputFieldVariantValue,
  type: InputFieldTypeValue,
  state: InputFieldStateValue,
  hasLabel: boolean = true,
  rightIcon: boolean = false,
  leftIcon: boolean = false,
  hasHint: boolean = false,
  labelInfo: string = '',
  isMandatory: boolean = false,
  placeholder: string = '',
  value: string = ''
): InputFieldsProperties {
  return {
    size,
    variant,
    type,
    state,
    hasLabel,
    rightIcon,
    leftIcon,
    hasHint,
    labelInfo,
    isMandatory,
    placeholder,
    value,
  };
}
