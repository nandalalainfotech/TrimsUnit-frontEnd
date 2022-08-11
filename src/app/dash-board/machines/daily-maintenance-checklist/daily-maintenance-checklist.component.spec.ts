import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMaintenanceChecklistComponent } from './daily-maintenance-checklist.component';

describe('DailyMaintenanceChecklistComponent', () => {
  let component: DailyMaintenanceChecklistComponent;
  let fixture: ComponentFixture<DailyMaintenanceChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyMaintenanceChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMaintenanceChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
