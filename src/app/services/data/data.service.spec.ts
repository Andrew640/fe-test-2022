import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Costs } from 'src/app/interfaces/costs.interface';
import { ExchangeRates } from 'src/app/interfaces/exchange-rates.interface';
import { costsMock, exchangeRatesMock } from 'src/app/pages/home/home.mocks';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCosts', () => {
    it('should return costs observable', waitForAsync(() => {
      const response: Costs = costsMock;
      const httpSpy = spyOn(service['http'], 'get').and.returnValue(
        of(response)
      );
      const expectedEndpoint = '/assets/costs.json';
      service.getCosts();
      expect(httpSpy).toHaveBeenCalledWith(expectedEndpoint);
      expect(httpSpy).toHaveBeenCalledWith('/assets/costs.json');
    }));
  });

  describe('getExchangeRates', () => {
    it('should return exchangeRates observable', waitForAsync(() => {
      const response: ExchangeRates = exchangeRatesMock;
      const httpSpy = spyOn(service['http'], 'get').and.returnValue(
        of(response)
      );
      const expectedEndpoint = '/assets/exchange-rates.json';
      service.getExchangeRates();
      expect(httpSpy).toHaveBeenCalledWith(expectedEndpoint);
      expect(httpSpy).toHaveBeenCalledWith('/assets/exchange-rates.json');
    }));
  });
});
