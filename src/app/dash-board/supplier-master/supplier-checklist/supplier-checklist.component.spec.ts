import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierChecklistComponent } from './supplier-checklist.component';

describe('SupplierChecklistComponent', () => {
  let component: SupplierChecklistComponent;
  let fixture: ComponentFixture<SupplierChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
