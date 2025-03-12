import {
  ComponentRegistry,
  StatCardProperties,
  StatCardTypeValue,
  StatCardStateValue,
} from '../types';

export const statCardRegistry: ComponentRegistry<StatCardProperties> = {
  components: {
    // Horizontal
    e65e73efaa3409f22911401412152d8e46593643: {
      Type: StatCardTypeValue.Horizontal,
      State: StatCardStateValue.Uptrend,
      'Stat Label': '',
      'Stat Value': '',
      'Stat Delta': '',
    },
    c4d1de7bb831af987e5017a7cb7f09f7f6ac7d79: {
      Type: StatCardTypeValue.Horizontal,
      State: StatCardStateValue.Downtrend,
      'Stat Label': '',
      'Stat Value': '',
      'Stat Delta': '',
    },
    // Stacked
    '17512e1bccae48e58fe3bad89d282323de5e49d4': {
      Type: StatCardTypeValue.Stacked,
      State: StatCardStateValue.Uptrend,
      'Stat Label': '',
      'Stat Value': '',
      'Stat Delta': '',
    },
    '3f81c4c7adc91b950c532e60567f349f83c97aaa': {
      Type: StatCardTypeValue.Stacked,
      State: StatCardStateValue.Downtrend,
      'Stat Label': '',
      'Stat Value': '',
      'Stat Delta': '',
    },
  },
};
