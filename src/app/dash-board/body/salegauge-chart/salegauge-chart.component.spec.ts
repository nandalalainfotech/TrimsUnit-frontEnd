import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalegaugeChartComponent } from './salegauge-chart.component';

describe('SalegaugeChartComponent', () => {
  let component: SalegaugeChartComponent;
  let fixture: ComponentFixture<SalegaugeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalegaugeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalegaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
