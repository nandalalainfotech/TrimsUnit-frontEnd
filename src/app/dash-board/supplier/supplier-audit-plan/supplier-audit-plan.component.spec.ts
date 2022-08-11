import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAuditPlanComponent } from './supplier-audit-plan.component';

describe('SupplierAuditPlanComponent', () => {
  let component: SupplierAuditPlanComponent;
  let fixture: ComponentFixture<SupplierAuditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAuditPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAuditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
