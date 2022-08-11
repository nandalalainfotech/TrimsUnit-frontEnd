import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineSettingComponent } from './machine-setting.component';

describe('MachineSettingComponent', () => {
  let component: MachineSettingComponent;
  let fixture: ComponentFixture<MachineSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
