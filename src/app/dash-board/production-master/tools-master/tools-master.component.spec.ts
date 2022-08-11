import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsMasterComponent } from './tools-master.component';

describe('ToolsMasterComponent', () => {
  let component: ToolsMasterComponent;
  let fixture: ComponentFixture<ToolsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
