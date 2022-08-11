import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasebleMasterComponent } from './purchaseble-master.component';

describe('PurchasebleMasterComponent', () => {
  let component: PurchasebleMasterComponent;
  let fixture: ComponentFixture<PurchasebleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasebleMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasebleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
