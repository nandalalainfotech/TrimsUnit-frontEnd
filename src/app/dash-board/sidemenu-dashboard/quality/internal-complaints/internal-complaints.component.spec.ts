import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalComplaintsComponent } from './internal-complaints.component';

describe('InternalComplaintsComponent', () => {
  let component: InternalComplaintsComponent;
  let fixture: ComponentFixture<InternalComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
