import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionWidjetComponent } from './production-widjet.component';

describe('ProductionWidjetComponent', () => {
  let component: ProductionWidjetComponent;
  let fixture: ComponentFixture<ProductionWidjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionWidjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionWidjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
