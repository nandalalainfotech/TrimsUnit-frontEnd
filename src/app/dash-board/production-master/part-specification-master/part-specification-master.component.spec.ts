import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSpecificationMasterComponent } from './part-specification-master.component';

describe('PartSpecificationMasterComponent', () => {
  let component: PartSpecificationMasterComponent;
  let fixture: ComponentFixture<PartSpecificationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSpecificationMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSpecificationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
