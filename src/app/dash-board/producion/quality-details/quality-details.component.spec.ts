import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDetailsComponent } from './quality-details.component';

describe('QualityDetailsComponent', () => {
  let component: QualityDetailsComponent;
  let fixture: ComponentFixture<QualityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
