import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Costs,
  CostTypeItem,
  CostTypeItemCost,
} from 'src/app/interfaces/costs.interface';
import {
  ExchangeRates,
  ExchangeRatesPaymentCurrency,
} from 'src/app/interfaces/exchange-rates.interface';

export enum COST_TYPES {
  QUOTED = 'Quoted',
  SCREENED = 'Screened',
}

export interface Comments {
  tableIndex: number;
  rows: CommentsRows[];
}

export interface CommentsRows {
  rowIndex: number;
  toggled: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  costs: Costs;
  exchangeRates: ExchangeRates;
  COST_TYPES = COST_TYPES;
  selectedCurrencyInfo: ExchangeRatesPaymentCurrency;
  comments: Comments[] = [];

  constructor(private route: ActivatedRoute) {
    this.costs = this.route.snapshot.data['costs'];
    this.exchangeRates = this.route.snapshot.data['exchangeRates'];
    this.selectedCurrencyInfo = this.exchangeRates.paymentCurrencies.filter(
      (currency) => currency.toCurrency === 'SGD'
    )[0];

    this.createToggleArray();
  }

  // TODO: If cost type not found will error
  private getCostItemCost(
    type: COST_TYPES.QUOTED | COST_TYPES.SCREENED,
    costTypeItemCosts: CostTypeItemCost[]
  ): CostTypeItemCost {
    if (type === COST_TYPES.QUOTED) {
      return costTypeItemCosts.filter(
        (costTypeItemCost) => costTypeItemCost.type === COST_TYPES.QUOTED
      )[0];
    } else {
      return costTypeItemCosts.filter(
        (costTypeItemCost) => costTypeItemCost.type === COST_TYPES.SCREENED
      )[0];
    }
  }

  public getCostItemCostEx(
    type: COST_TYPES.QUOTED | COST_TYPES.SCREENED,
    costTypeItemCosts: CostTypeItemCost[],
    exchangeRate: number
  ): number {
    return this.getCostItemCost(type, costTypeItemCosts).amount * exchangeRate;
  }

  public toggleComments(tableIndex: number, rowIndex: number): void {
    this.comments[tableIndex].rows[rowIndex].toggled =
      !this.comments[tableIndex].rows[rowIndex].toggled;
  }

  public displayCommentsSection(tableIndex: number, rowIndex: number): boolean {
    return this.comments[tableIndex].rows[rowIndex].toggled;
  }

  private createToggleArray(): void {
    this.comments = this.costs.costs.map((cost, costIndex) => ({
      tableIndex: costIndex,
      rows: cost.costItems.map((costItem, costItemIndex) => ({
        rowIndex: costItemIndex,
        toggled: false,
      })),
    }));
  }

  public getTableTotal(
    type: COST_TYPES.QUOTED | COST_TYPES.SCREENED,
    costTypeItems: CostTypeItem[],
    exchangeRate: number
  ): { usdTotal: number; exchangedTotal: number } {
    let usdTotal: number = 0;
    let exchangedTotal: number = 0;
    costTypeItems.map((costTypeItemsCosts) => {
      usdTotal +=
        Math.round(
          this.getCostItemCostEx(
            type,
            costTypeItemsCosts.costs,
            this.costs.baseCurrency.exchangeRate
          ) * 100
        ) / 100;

      exchangedTotal += this.getCostItemCostEx(
        type,
        costTypeItemsCosts.costs,
        exchangeRate
      );
    });
    return {
      usdTotal,
      exchangedTotal,
    };
  }
}
