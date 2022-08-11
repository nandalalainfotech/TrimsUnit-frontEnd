import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWidjetComponent } from './hr-widjet.component';

describe('HrWidjetComponent', () => {
  let component: HrWidjetComponent;
  let fixture: ComponentFixture<HrWidjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrWidjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWidjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
