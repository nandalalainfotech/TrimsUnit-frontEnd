import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMasterComponent } from './file-master.component';

describe('FileMasterComponent', () => {
  let component: FileMasterComponent;
  let fixture: ComponentFixture<FileMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
