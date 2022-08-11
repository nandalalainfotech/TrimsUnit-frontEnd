import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseWidjetComponent } from './purchase-widjet.component';

describe('PurchaseWidjetComponent', () => {
  let component: PurchaseWidjetComponent;
  let fixture: ComponentFixture<PurchaseWidjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseWidjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseWidjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
