import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuDashboardComponent } from './sidemenu-dashboard.component';

describe('SidemenuDashboardComponent', () => {
  let component: SidemenuDashboardComponent;
  let fixture: ComponentFixture<SidemenuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
