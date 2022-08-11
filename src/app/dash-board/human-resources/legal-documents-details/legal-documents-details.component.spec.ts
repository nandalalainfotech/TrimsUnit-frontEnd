import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalDocumentsDetailsComponent } from './legal-documents-details.component';

describe('LegalDocumentsDetailsComponent', () => {
  let component: LegalDocumentsDetailsComponent;
  let fixture: ComponentFixture<LegalDocumentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalDocumentsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalDocumentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
