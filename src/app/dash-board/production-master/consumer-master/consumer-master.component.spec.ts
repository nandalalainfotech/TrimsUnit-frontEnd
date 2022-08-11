import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerMasterComponent } from './consumer-master.component';

describe('ConsumerMasterComponent', () => {
  let component: ConsumerMasterComponent;
  let fixture: ComponentFixture<ConsumerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
