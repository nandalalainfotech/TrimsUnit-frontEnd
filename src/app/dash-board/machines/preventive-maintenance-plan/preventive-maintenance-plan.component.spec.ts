import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMaintenancePlanComponent } from './preventive-maintenance-plan.component';

describe('PreventiveMaintenancePlanComponent', () => {
  let component: PreventiveMaintenancePlanComponent;
  let fixture: ComponentFixture<PreventiveMaintenancePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreventiveMaintenancePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveMaintenancePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
