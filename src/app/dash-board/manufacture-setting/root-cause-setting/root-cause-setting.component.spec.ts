import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCauseSettingComponent } from './root-cause-setting.component';

describe('RootCauseSettingComponent', () => {
  let component: RootCauseSettingComponent;
  let fixture: ComponentFixture<RootCauseSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootCauseSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootCauseSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
