import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExchangeRatesResolver } from './exchange-rates.resolver';

describe('ExchangeRatesResolver', () => {
  let resolver: ExchangeRatesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    resolver = TestBed.inject(ExchangeRatesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
