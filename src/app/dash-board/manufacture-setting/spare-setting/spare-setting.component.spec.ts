import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareSettingComponent } from './spare-setting.component';

describe('SpareSettingComponent', () => {
  let component: SpareSettingComponent;
  let fixture: ComponentFixture<SpareSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
