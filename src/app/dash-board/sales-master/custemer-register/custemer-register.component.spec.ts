import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustemerRegisterComponent } from './custemer-register.component';

describe('CustemerRegisterComponent', () => {
  let component: CustemerRegisterComponent;
  let fixture: ComponentFixture<CustemerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustemerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustemerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
