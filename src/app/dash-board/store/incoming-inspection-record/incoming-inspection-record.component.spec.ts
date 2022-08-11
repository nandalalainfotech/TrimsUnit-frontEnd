import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingInspectionRecordComponent } from './incoming-inspection-record.component';

describe('IncomingInspectionRecordComponent', () => {
  let component: IncomingInspectionRecordComponent;
  let fixture: ComponentFixture<IncomingInspectionRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingInspectionRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingInspectionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
