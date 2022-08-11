import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyequipmentsPlanComponent } from './safetyequipments-plan.component';

describe('SafetyequipmentsPlanComponent', () => {
  let component: SafetyequipmentsPlanComponent;
  let fixture: ComponentFixture<SafetyequipmentsPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyequipmentsPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyequipmentsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
