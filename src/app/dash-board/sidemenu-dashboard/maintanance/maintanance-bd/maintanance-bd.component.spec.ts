import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintananceBDComponent } from './maintanance-bd.component';

describe('MaintananceBDComponent', () => {
  let component: MaintananceBDComponent;
  let fixture: ComponentFixture<MaintananceBDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintananceBDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintananceBDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
