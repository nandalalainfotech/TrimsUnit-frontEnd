import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalelineChartComponent } from './saleline-chart.component';

describe('SalelineChartComponent', () => {
  let component: SalelineChartComponent;
  let fixture: ComponentFixture<SalelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalelineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
