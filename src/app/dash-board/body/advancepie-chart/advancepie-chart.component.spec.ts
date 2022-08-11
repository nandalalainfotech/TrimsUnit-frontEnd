import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancepieChartComponent } from './advancepie-chart.component';

describe('AdvancepieChartComponent', () => {
  let component: AdvancepieChartComponent;
  let fixture: ComponentFixture<AdvancepieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancepieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancepieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
