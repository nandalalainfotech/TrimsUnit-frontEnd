import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAuditReportComponent } from './supplier-audit-report.component';

describe('SupplierAuditReportComponent', () => {
  let component: SupplierAuditReportComponent;
  let fixture: ComponentFixture<SupplierAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAuditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
