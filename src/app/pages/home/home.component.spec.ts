import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  costsMock,
  exchangeRatesMock,
  noQuotedCostsMock,
  noScreenedCostsMock,
} from './home.mocks';
import { COST_TYPES, TOTAL_TYPES } from 'src/app/interfaces/home.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { costs: costsMock, exchangeRates: exchangeRatesMock },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise variables', () => {
    expect(component.costs).toEqual(costsMock);
    expect(component.comments).toEqual([
      { tableIndex: 0, rows: [{ rowIndex: 0, toggled: false }] },
    ]);
    expect(component.COST_TYPES).toEqual(COST_TYPES);
    expect(component.selectedCurrencyInfo).toEqual({
      fromCurrency: 'SGD',
      toCurrency: 'SGD',
      exchangeRate: 1,
    });
  });

  describe('getCostItemCost', () => {
    it('should return costTypeItemCost object for quoted cost', () => {
      expect(
        component['getCostItemCost'](
          COST_TYPES.QUOTED,
          costsMock.costs[0].costItems[0].costs
        )
      ).toEqual({
        daStage: 'PDA',
        persona: 'BACKOFFICE',
        type: 'Quoted',
        amount: 1500,
      });
    });

    it('should return costTypeItemCost object for screened cost', () => {
      expect(
        component['getCostItemCost'](
          COST_TYPES.SCREENED,
          costsMock.costs[0].costItems[0].costs
        )
      ).toEqual({
        daStage: 'PDA',
        persona: 'BACKOFFICE',
        type: 'Screened',
        amount: 1500,
      });
    });

    it('should return empty costTypeItemCost object if quoted type not found', () => {
      expect(
        component['getCostItemCost'](
          COST_TYPES.QUOTED,
          noQuotedCostsMock.costs[0].costItems[0].costs
        )
      ).toEqual({
        daStage: '',
        persona: '',
        type: COST_TYPES.QUOTED,
        amount: 0,
      });
    });

    it('should return empty costTypeItemCost object if screened type not found', () => {
      expect(
        component['getCostItemCost'](
          COST_TYPES.SCREENED,
          noScreenedCostsMock.costs[0].costItems[0].costs
        )
      ).toEqual({
        daStage: '',
        persona: '',
        type: COST_TYPES.SCREENED,
        amount: 0,
      });
    });
  });

  describe('getCostItemCostEx', () => {
    it('should call getCostItemCost with passed params', () => {
      let spy = spyOn<HomeComponent, any>(component, 'getCostItemCostEx');
      component.getCostItemCostEx(
        COST_TYPES.QUOTED,
        costsMock.costs[0].costItems[0].costs,
        0.5
      );
      expect(spy).toHaveBeenCalledWith(
        COST_TYPES.QUOTED,
        costsMock.costs[0].costItems[0].costs,
        0.5
      );
    });
  });

  describe('displayCommentsSection', () => {
    it('should return toggled value at passed index', () => {
      fixture.detectChanges();
      expect(component.displayCommentsSection(0, 0)).toEqual(false);
    });
  });

  describe('toggleComments', () => {
    it('should toggle row with passed index', () => {
      fixture.detectChanges();
      component.toggleComments(0, 0);
      expect(component.comments).toEqual([
        { tableIndex: 0, rows: [{ rowIndex: 0, toggled: true }] },
      ]);
    });
  });

  describe('createToggleArray', () => {
    it('should return toggled value at passed index', () => {
      component['createToggleArray']();
      expect(component.comments).toEqual([
        { tableIndex: 0, rows: [{ rowIndex: 0, toggled: false }] },
      ]);
    });
  });

  describe('getTableTotal', () => {
    it('should call calculateTotal with passed params and return correct total value for base exchange', () => {
      expect(
        component.getTableTotal(
          COST_TYPES.QUOTED,
          costsMock.costs[0].costItems,
          TOTAL_TYPES.BASE
        )
      ).toEqual(1139.73);
    });
    it('should call calculateTotal with passed params and return correct total value for exchanged value', () => {
      expect(
        component.getTableTotal(
          COST_TYPES.QUOTED,
          costsMock.costs[0].costItems,
          TOTAL_TYPES.EXCHANGED
        )
      ).toEqual(1500);
    });
  });

  describe('calculateTotal', () => {
    it('should call getCostItemCostEx with passed params and return correct total value for base exchange', () => {
      expect(
        component['calculateTotal'](
          COST_TYPES.QUOTED,
          TOTAL_TYPES.BASE,
          costsMock.costs[0].costItems[0]
        )
      ).toEqual(1139.73);
    });
    it('should call getCostItemCostEx with passed params and return correct total value for exchanged value', () => {
      expect(
        component['calculateTotal'](
          COST_TYPES.QUOTED,
          TOTAL_TYPES.EXCHANGED,
          costsMock.costs[0].costItems[0]
        )
      ).toEqual(1500);
    });
  });
});
