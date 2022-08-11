import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSparesComponent } from './list-of-spares.component';

describe('ListOfSparesComponent', () => {
  let component: ListOfSparesComponent;
  let fixture: ComponentFixture<ListOfSparesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfSparesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSparesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
