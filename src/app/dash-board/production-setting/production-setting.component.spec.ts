import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionSettingComponent } from './production-setting.component';

describe('ProductionSettingComponent', () => {
  let component: ProductionSettingComponent;
  let fixture: ComponentFixture<ProductionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
