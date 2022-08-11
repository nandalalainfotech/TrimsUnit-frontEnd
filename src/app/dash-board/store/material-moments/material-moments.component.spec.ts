import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMomentsComponent } from './material-moments.component';

describe('MaterialMomentsComponent', () => {
  let component: MaterialMomentsComponent;
  let fixture: ComponentFixture<MaterialMomentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMomentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMomentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
