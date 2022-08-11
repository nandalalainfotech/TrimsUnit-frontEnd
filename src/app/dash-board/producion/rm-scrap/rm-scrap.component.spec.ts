import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmScrapComponent } from './rm-scrap.component';

describe('RmScrapComponent', () => {
  let component: RmScrapComponent;
  let fixture: ComponentFixture<RmScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmScrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
