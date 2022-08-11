import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProportyRegisterComponent } from './customer-proporty-register.component';

describe('CustomerProportyRegisterComponent', () => {
  let component: CustomerProportyRegisterComponent;
  let fixture: ComponentFixture<CustomerProportyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProportyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProportyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
