import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ExchangeRates } from 'src/app/interfaces/exchange-rates.interface';
import { DataService } from 'src/app/services/data/data.service';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesResolver implements Resolve<ExchangeRates> {
  constructor(private dataService: DataService) {}

  resolve(): Observable<ExchangeRates> {
    return this.dataService.getExchangeRates();
  }
}
