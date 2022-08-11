import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveActionSettingComponent } from './preventive-action-setting.component';

describe('PreventiveActionSettingComponent', () => {
  let component: PreventiveActionSettingComponent;
  let fixture: ComponentFixture<PreventiveActionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreventiveActionSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveActionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
