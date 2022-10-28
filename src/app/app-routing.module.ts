import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsResolver } from './resolvers/costs/costs.resolver';

import { HomeComponent } from './pages/home/home.component';
import { ExchangeRatesResolver } from './resolvers/exchange-rates/exchange-rates.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      costs: CostsResolver,
      exchangeRates: ExchangeRatesResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
