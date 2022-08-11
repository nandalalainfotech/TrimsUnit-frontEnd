import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployefecilityComponent } from './employefecility.component';

describe('EmployefecilityComponent', () => {
  let component: EmployefecilityComponent;
  let fixture: ComponentFixture<EmployefecilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployefecilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployefecilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
