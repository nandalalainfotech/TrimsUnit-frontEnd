import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReqSlipComponent } from './purchase-req-slip.component';

describe('PurchaseReqSlipComponent', () => {
  let component: PurchaseReqSlipComponent;
  let fixture: ComponentFixture<PurchaseReqSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReqSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReqSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
