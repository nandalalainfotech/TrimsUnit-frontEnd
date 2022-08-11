import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTrainingPlanComponent } from './supplier-training-plan.component';

describe('SupplierTrainingPlanComponent', () => {
  let component: SupplierTrainingPlanComponent;
  let fixture: ComponentFixture<SupplierTrainingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTrainingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTrainingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
