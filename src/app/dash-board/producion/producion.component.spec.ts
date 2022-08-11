import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducionComponent } from './producion.component';

describe('ProducionComponent', () => {
  let component: ProducionComponent;
  let fixture: ComponentFixture<ProducionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
