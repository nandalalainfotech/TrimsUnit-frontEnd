import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineReportsComponent } from './machine-reports.component';

describe('MachineReportsComponent', () => {
  let component: MachineReportsComponent;
  let fixture: ComponentFixture<MachineReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
