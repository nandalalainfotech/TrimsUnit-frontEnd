import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureSettingComponent } from './manufacture-setting.component';

describe('ManufactureSettingComponent', () => {
  let component: ManufactureSettingComponent;
  let fixture: ComponentFixture<ManufactureSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
