import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReqSlipComponent } from './material-req-slip.component';

describe('MaterialReqSlipComponent', () => {
  let component: MaterialReqSlipComponent;
  let fixture: ComponentFixture<MaterialReqSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialReqSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialReqSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
