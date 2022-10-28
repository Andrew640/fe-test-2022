import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Costs,
  CostTypeItem,
  CostTypeItemCost,
  ExchangeRates,
  ResolverData,
} from 'src/app/interfaces/costs.interface';

export enum COST_TYPES {
  QUOTED = 'Quoted',
  SCREENED = 'Screened',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  costs: Costs | undefined;
  exchangeRates: ExchangeRates = {};
  COST_TYPES = COST_TYPES;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.costs = this.route.snapshot.data['costs'];
    this.exchangeRates = this.route.snapshot.data['exchangeRates'];

    console.log(this.costs);
    console.log(this.exchangeRates);
  }

  getCostItemCost(
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
}
