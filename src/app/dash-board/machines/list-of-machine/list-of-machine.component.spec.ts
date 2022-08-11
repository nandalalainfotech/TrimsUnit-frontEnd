import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMachineComponent } from './list-of-machine.component';

describe('ListOfMachineComponent', () => {
  let component: ListOfMachineComponent;
  let fixture: ComponentFixture<ListOfMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
