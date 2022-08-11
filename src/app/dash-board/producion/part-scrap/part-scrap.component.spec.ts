import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartScrapComponent } from './part-scrap.component';

describe('PartScrapComponent', () => {
  let component: PartScrapComponent;
  let fixture: ComponentFixture<PartScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartScrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
