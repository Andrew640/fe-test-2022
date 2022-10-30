import { Costs } from 'src/app/interfaces/costs.interface';
import { ExchangeRates } from 'src/app/interfaces/exchange-rates.interface';

export const exchangeRatesMock: ExchangeRates = {
  sourceCurrency: 'SGD',
  paymentCurrencies: [
    {
      fromCurrency: 'SGD',
      toCurrency: 'AED',
      exchangeRate: 2.816829240594386,
    },
    {
      fromCurrency: 'SGD',
      toCurrency: 'AUD',
      exchangeRate: 0.9849352170868335,
    },
    { fromCurrency: 'SGD', toCurrency: 'SGD', exchangeRate: 1 },
  ],
};

export const costsMock: Costs = {
  daCurrency: {
    currency: 'SGD',
  },
  baseCurrency: {
    currency: 'USD',
    exchangeRate: 0.7598199759292418,
  },
  costs: [
    {
      id: 716,
      name: 'Port Expenses',
      displayOrder: 1,
      costItems: [
        {
          id: 1796,
          name: 'Barge Expenses',
          costItemAlias: {
            accountingCode: 'Acc-01',
          },
          annotation: {
            id: 30002,
            name: 'Asia',
          },
          costs: [
            {
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              type: 'Quoted',
              amount: 1500,
            },
            {
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              type: 'Screened',
              amount: 1500,
            },
          ],
          comments: [
            {
              id: 503,
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              author: 'Mr. Agency BO',
              comment: 'Comment 1',
              type: 'Internal',
              date: '2021-03-01T10:15:35.927924Z',
            },
          ],
        },
      ],
    },
  ],
};

export const noQuotedCostsMock: Costs = {
  daCurrency: {
    currency: 'SGD',
  },
  baseCurrency: {
    currency: 'USD',
    exchangeRate: 0.7598199759292418,
  },
  costs: [
    {
      id: 716,
      name: 'Port Expenses',
      displayOrder: 1,
      costItems: [
        {
          id: 1796,
          name: 'Barge Expenses',
          costItemAlias: {
            accountingCode: 'Acc-01',
          },
          annotation: {
            id: 30002,
            name: 'Asia',
          },
          costs: [
            {
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              type: 'Screened',
              amount: 1500,
            },
          ],
          comments: [
            {
              id: 503,
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              author: 'Mr. Agency BO',
              comment: 'Comment 1',
              type: 'Internal',
              date: '2021-03-01T10:15:35.927924Z',
            },
          ],
        },
      ],
    },
  ],
};

export const noScreenedCostsMock: Costs = {
  daCurrency: {
    currency: 'SGD',
  },
  baseCurrency: {
    currency: 'USD',
    exchangeRate: 0.7598199759292418,
  },
  costs: [
    {
      id: 716,
      name: 'Port Expenses',
      displayOrder: 1,
      costItems: [
        {
          id: 1796,
          name: 'Barge Expenses',
          costItemAlias: {
            accountingCode: 'Acc-01',
          },
          annotation: {
            id: 30002,
            name: 'Asia',
          },
          costs: [
            {
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              type: 'Quoted',
              amount: 1500,
            },
          ],
          comments: [
            {
              id: 503,
              daStage: 'PDA',
              persona: 'BACKOFFICE',
              author: 'Mr. Agency BO',
              comment: 'Comment 1',
              type: 'Internal',
              date: '2021-03-01T10:15:35.927924Z',
            },
          ],
        },
      ],
    },
  ],
};
