import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityWidjetComponent } from './quality-widjet.component';

describe('QualityWidjetComponent', () => {
  let component: QualityWidjetComponent;
  let fixture: ComponentFixture<QualityWidjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityWidjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityWidjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
