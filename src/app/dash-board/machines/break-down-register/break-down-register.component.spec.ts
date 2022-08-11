import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakDownRegisterComponent } from './break-down-register.component';

describe('BreakDownRegisterComponent', () => {
  let component: BreakDownRegisterComponent;
  let fixture: ComponentFixture<BreakDownRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakDownRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakDownRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
