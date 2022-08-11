import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalepieChartComponent } from './salepie-chart.component';

describe('SalepieChartComponent', () => {
  let component: SalepieChartComponent;
  let fixture: ComponentFixture<SalepieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalepieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalepieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
