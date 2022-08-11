import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialInwardRecordComponent } from './material-inward-record.component';

describe('MaterialInwardRecordComponent', () => {
  let component: MaterialInwardRecordComponent;
  let fixture: ComponentFixture<MaterialInwardRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialInwardRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialInwardRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
