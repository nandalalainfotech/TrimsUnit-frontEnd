import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSettingComponent } from './m-setting.component';

describe('MSettingComponent', () => {
  let component: MSettingComponent;
  let fixture: ComponentFixture<MSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
