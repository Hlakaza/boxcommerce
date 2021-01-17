export interface Rates {
  base: string;
  rates: StringNumberPair;
  date: string;
}

export interface StringNumberPair {
   [key: string]: number;
}

export interface Currency {
  currencyCode: string;
  rate: number;
}
