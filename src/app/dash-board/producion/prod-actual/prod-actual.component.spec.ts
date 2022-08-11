import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdActualComponent } from './prod-actual.component';

describe('ProdActualComponent', () => {
  let component: ProdActualComponent;
  let fixture: ComponentFixture<ProdActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdActualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
