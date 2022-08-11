import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownSettingComponent } from './breakdown-setting.component';

describe('BreakdownSettingComponent', () => {
  let component: BreakdownSettingComponent;
  let fixture: ComponentFixture<BreakdownSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakdownSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
