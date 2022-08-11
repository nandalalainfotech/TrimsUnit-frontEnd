import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstaidMaterialsPlanComponent } from './firstaid-materials-plan.component';

describe('FirstaidMaterialsPlanComponent', () => {
  let component: FirstaidMaterialsPlanComponent;
  let fixture: ComponentFixture<FirstaidMaterialsPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstaidMaterialsPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstaidMaterialsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
