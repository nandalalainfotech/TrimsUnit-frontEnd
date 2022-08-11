import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitysComponent } from './facilitys.component';

describe('FacilitysComponent', () => {
  let component: FacilitysComponent;
  let fixture: ComponentFixture<FacilitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
