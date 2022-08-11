import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirePlanComponent } from './fire-plan.component';

describe('FirePlanComponent', () => {
  let component: FirePlanComponent;
  let fixture: ComponentFixture<FirePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
