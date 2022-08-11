import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureMachineMasterComponent } from './fixture-machine-master.component';

describe('FixtureMachineMasterComponent', () => {
  let component: FixtureMachineMasterComponent;
  let fixture: ComponentFixture<FixtureMachineMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureMachineMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureMachineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
