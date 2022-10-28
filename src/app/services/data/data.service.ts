import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Costs, ExchangeRates } from '../../interfaces/costs.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCosts(): Observable<Costs> {
    const costsEndpoint = '/assets/costs.json';
    return this.http.get<Costs>(costsEndpoint);
  }

  getExchangeRates(): Observable<ExchangeRates> {
    const exRatesEndpoint = '/assets/exchange-rates.json';
    return this.http.get<ExchangeRates>(exRatesEndpoint);
  }
}
