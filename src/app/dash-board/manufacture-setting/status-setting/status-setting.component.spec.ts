import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSettingComponent } from './status-setting.component';

describe('StatusSettingComponent', () => {
  let component: StatusSettingComponent;
  let fixture: ComponentFixture<StatusSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
