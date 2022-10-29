import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Costs, CostTypeItemCost } from 'src/app/interfaces/costs.interface';
import {
  ExchangeRates,
  ExchangeRatesPaymentCurrency,
} from 'src/app/interfaces/exchange-rates.interface';

export enum COST_TYPES {
  QUOTED = 'Quoted',
  SCREENED = 'Screened',
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

  constructor(private route: ActivatedRoute) {
    this.costs = this.route.snapshot.data['costs'];
    this.exchangeRates = this.route.snapshot.data['exchangeRates'];
    this.selectedCurrencyInfo = this.exchangeRates.paymentCurrencies.filter(
      (currency) => currency.toCurrency === 'SGD'
    )[0];
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
}
