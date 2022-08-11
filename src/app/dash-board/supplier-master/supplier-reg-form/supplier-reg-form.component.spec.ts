import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegFormComponent } from './supplier-reg-form.component';

describe('SupplierRegFormComponent', () => {
  let component: SupplierRegFormComponent;
  let fixture: ComponentFixture<SupplierRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierRegFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
