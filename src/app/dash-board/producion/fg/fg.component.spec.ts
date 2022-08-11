import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FGComponent } from './fg.component';

describe('FGComponent', () => {
  let component: FGComponent;
  let fixture: ComponentFixture<FGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
