import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttrComponent } from './mttr.component';

describe('MttrComponent', () => {
  let component: MttrComponent;
  let fixture: ComponentFixture<MttrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
