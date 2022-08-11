import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMaintananceComponent } from './preventive-maintanance.component';

describe('PreventiveMaintananceComponent', () => {
  let component: PreventiveMaintananceComponent;
  let fixture: ComponentFixture<PreventiveMaintananceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreventiveMaintananceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveMaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
