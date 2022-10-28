import { Data } from '@angular/router';

export interface ResolverData extends Data {
  costs: Costs;
  exchangeRates: ExchangeRates;
}

export type Currency =
  | 'USD'
  | 'AED'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'INR'
  | 'JPY'
  | 'MAD'
  | 'NOK'
  | 'NZD'
  | 'SAR'
  | 'SEK'
  | 'SGD'
  | 'THB'
  | 'TRY'
  | 'USD'
  | 'ZAR';

export interface Costs {
  daCurrency: {
    currency: Currency;
  };
  baseCurrency: {
    currency: Currency;
    exchangeRate: number;
  };
  costs: CostType[];
}

export interface CostType {
  id: number;
  name: string;
  displayOrder: number;
  costItems: CostTypeItem[];
}

export interface CostTypeItem {
  id: number;
  name: string;
  costItemAlias: {
    accountingCode: string;
  };
  annotation: {
    id: number;
    name: string;
  };
  costs: CostTypeItemCost[];
  comments?: CostTypeItemComment[];
}

export interface CostTypeItemCost {
  daStage: string;
  persona: string;
  type: string;
  amount: number;
}

export interface CostTypeItemComment {
  id: number;
  daStage: string;
  persona: string;
  author: string;
  comment: string;
  type: string;
  date: string;
}

export interface ExchangeRates {}
