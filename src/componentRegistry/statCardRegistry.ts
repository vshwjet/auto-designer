import {
  StatCardTypeValue,
  StatCardStateValue,
  StatCardProperties
} from '../types';

type StatCardType = {
  [key in StatCardTypeValue]: {
    [key in StatCardStateValue]: string;
  };
};

export const statCardRegistry: StatCardType = {
  [StatCardTypeValue.Horizontal]: {
    [StatCardStateValue.Uptrend]: "e65e73efaa3409f22911401412152d8e46593643",
    [StatCardStateValue.Downtrend]: "c4d1de7bb831af987e5017a7cb7f09f7f6ac7d79"
  },
  [StatCardTypeValue.Stacked]: {
    [StatCardStateValue.Uptrend]: "17512e1bccae48e58fe3bad89d282323de5e49d4",
    [StatCardStateValue.Downtrend]: "3f81c4c7adc91b950c532e60567f349f83c97aaa"
  }
};

export function getStatCardKey(
  type: StatCardTypeValue,
  state: StatCardStateValue
): string {
  const typeObj = statCardRegistry[type];
  if (!typeObj) throw new Error(`Invalid type: ${String(type)}`);

  const key = typeObj[state];
  if (!key) throw new Error(`Invalid state: ${String(state)}`);

  return key;
} 