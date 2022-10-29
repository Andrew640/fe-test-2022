import { Currency } from './shared.interface';

export interface ExchangeRates {
  sourceCurrency: Currency;
  paymentCurrencies: ExchangeRatesPaymentCurrency[];
}

export interface ExchangeRatesPaymentCurrency {
  fromCurrency: Currency;
  toCurrency: Currency;
  exchangeRate: number;
}
