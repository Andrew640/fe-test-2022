import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Costs } from 'src/app/interfaces/costs.interface';
import { DataService } from 'src/app/services/data/data.service';

@Injectable({
  providedIn: 'root',
})
export class CostsResolver implements Resolve<Costs> {
  constructor(private dataService: DataService) {}

  resolve(): Observable<Costs> {
    return this.dataService.getCosts();
  }
}
