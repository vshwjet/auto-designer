export enum StatCardTypeValue {
  Horizontal = "Horizontal",
  Stacked = "Stacked"
}

export enum StatCardStateValue {
  Uptrend = "Uptrend",
  Downtrend = "Downtrend"
}

export interface StatCardProperties {
  Type: StatCardTypeValue;
  State: StatCardStateValue;
  "Stat Label": string;
  "Stat Value": string;
  "Stat Delta": string;
} 