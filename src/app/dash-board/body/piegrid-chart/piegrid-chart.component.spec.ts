import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiegridChartComponent } from './piegrid-chart.component';

describe('PiegridChartComponent', () => {
  let component: PiegridChartComponent;
  let fixture: ComponentFixture<PiegridChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiegridChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiegridChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
