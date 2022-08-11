import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SFGComponent } from './sfg.component';

describe('SFGComponent', () => {
  let component: SFGComponent;
  let fixture: ComponentFixture<SFGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SFGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SFGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
