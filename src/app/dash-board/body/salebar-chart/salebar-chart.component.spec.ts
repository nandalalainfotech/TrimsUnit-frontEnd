import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalebarChartComponent } from './salebar-chart.component';

describe('SalebarChartComponent', () => {
  let component: SalebarChartComponent;
  let fixture: ComponentFixture<SalebarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalebarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalebarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
