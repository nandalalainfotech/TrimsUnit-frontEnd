import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAttendanceReportComponent } from './supplier-attendance-report.component';

describe('SupplierAttendanceReportComponent', () => {
  let component: SupplierAttendanceReportComponent;
  let fixture: ComponentFixture<SupplierAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAttendanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
