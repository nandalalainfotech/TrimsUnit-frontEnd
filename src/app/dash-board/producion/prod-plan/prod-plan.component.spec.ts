import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPlanComponent } from './prod-plan.component';

describe('ProdPlanComponent', () => {
  let component: ProdPlanComponent;
  let fixture: ComponentFixture<ProdPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
