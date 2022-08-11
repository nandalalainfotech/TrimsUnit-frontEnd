import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWidjetComponent } from './store-widjet.component';

describe('StoreWidjetComponent', () => {
  let component: StoreWidjetComponent;
  let fixture: ComponentFixture<StoreWidjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreWidjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreWidjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
