import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistSettingComponent } from './checklist-setting.component';

describe('ChecklistSettingComponent', () => {
  let component: ChecklistSettingComponent;
  let fixture: ComponentFixture<ChecklistSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
