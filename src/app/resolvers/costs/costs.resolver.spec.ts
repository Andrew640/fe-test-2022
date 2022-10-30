import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/services/data/data.service';

import { CostsResolver } from './costs.resolver';

describe('CostsResolver', () => {
  let resolver: CostsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    resolver = TestBed.inject(CostsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
