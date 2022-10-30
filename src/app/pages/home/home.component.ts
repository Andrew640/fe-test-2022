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
import {
  Comments,
  CostTypes,
  COST_TYPES,
  emptyQuotedCost,
  emptyScreenedCost,
  TotalTypes,
  TOTAL_TYPES,
} from 'src/app/interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  costs: Costs;
  exchangeRates: ExchangeRates;
  COST_TYPES = COST_TYPES;
  TOTAL_TYPES = TOTAL_TYPES;
  selectedCurrencyInfo: ExchangeRatesPaymentCurrency;
  comments: Comments[] = [];

  constructor(private route: ActivatedRoute) {
    this.costs = this.route.snapshot.data['costs'];
    this.exchangeRates = this.route.snapshot.data['exchangeRates'];
    this.selectedCurrencyInfo = this.exchangeRates.paymentCurrencies.filter(
      (currency) => currency.toCurrency === 'SGD'
    )[0];
    console.log(this.selectedCurrencyInfo);
    this.createToggleArray();
  }

  private getCostItemCost(
    type: COST_TYPES.QUOTED | COST_TYPES.SCREENED,
    costTypeItemCosts: CostTypeItemCost[]
  ): CostTypeItemCost {
    let costTypeItemCost = costTypeItemCosts.filter((costTypeItemCost) =>
      type === COST_TYPES.QUOTED
        ? costTypeItemCost.type === COST_TYPES.QUOTED
        : costTypeItemCost.type === COST_TYPES.SCREENED
    );

    if (costTypeItemCost.length > 0) {
      return costTypeItemCost[0];
    } else {
      return type === COST_TYPES.QUOTED ? emptyQuotedCost : emptyScreenedCost;
    }
  }

  public getCostItemCostEx(
    type: COST_TYPES.QUOTED | COST_TYPES.SCREENED,
    costTypeItemCosts: CostTypeItemCost[],
    exchangeRate: number
  ): number {
    return (
      Math.round(
        this.getCostItemCost(type, costTypeItemCosts).amount *
          exchangeRate *
          100
      ) / 100
    );
  }

  public displayCommentsSection(tableIndex: number, rowIndex: number): boolean {
    return this.comments[tableIndex].rows[rowIndex].toggled;
  }

  public toggleComments(tableIndex: number, rowIndex: number): void {
    this.comments[tableIndex].rows[rowIndex].toggled =
      !this.comments[tableIndex].rows[rowIndex].toggled;
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
    costType: CostTypes,
    costTypeItems: CostTypeItem[],
    totalType: TotalTypes
  ): number {
    let total: number = 0;
    costTypeItems.map((costTypeItemsCosts) => {
      total += this.calculateTotal(costType, totalType, costTypeItemsCosts);
    });
    return total;
  }

  private calculateTotal(
    costType: COST_TYPES.QUOTED | COST_TYPES.SCREENED,
    totalType: TotalTypes,
    costTypeItemsCosts: CostTypeItem
  ): number {
    let rawTotal = this.getCostItemCostEx(
      costType,
      costTypeItemsCosts.costs,
      totalType === TOTAL_TYPES.BASE
        ? this.costs.baseCurrency.exchangeRate
        : this.selectedCurrencyInfo.exchangeRate
    );
    return Math.round(rawTotal * 100) / 100;
  }
}
