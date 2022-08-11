import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryPlanComponent } from './statutory-plan.component';

describe('StatutoryPlanComponent', () => {
  let component: StatutoryPlanComponent;
  let fixture: ComponentFixture<StatutoryPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutoryPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
