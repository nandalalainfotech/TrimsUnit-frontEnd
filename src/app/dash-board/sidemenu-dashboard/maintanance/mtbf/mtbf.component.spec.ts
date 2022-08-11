import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtbfComponent } from './mtbf.component';

describe('MtbfComponent', () => {
  let component: MtbfComponent;
  let fixture: ComponentFixture<MtbfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtbfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
