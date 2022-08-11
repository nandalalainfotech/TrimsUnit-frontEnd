import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeDetailsComponent } from './consignee-details.component';

describe('ConsigneeDetailsComponent', () => {
  let component: ConsigneeDetailsComponent;
  let fixture: ComponentFixture<ConsigneeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsigneeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
