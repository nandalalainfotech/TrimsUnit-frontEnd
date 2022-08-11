import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdLogComponent } from './prod-log.component';

describe('ProdLogComponent', () => {
  let component: ProdLogComponent;
  let fixture: ComponentFixture<ProdLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
