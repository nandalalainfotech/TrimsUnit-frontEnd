import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPartComponent } from './child-part.component';

describe('ChildPartComponent', () => {
  let component: ChildPartComponent;
  let fixture: ComponentFixture<ChildPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
