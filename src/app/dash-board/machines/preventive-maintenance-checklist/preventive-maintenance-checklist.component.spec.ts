import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMaintenanceChecklistComponent } from './preventive-maintenance-checklist.component';

describe('PreventiveMaintenanceChecklistComponent', () => {
    let component: PreventiveMaintenanceChecklistComponent;
    let fixture: ComponentFixture<PreventiveMaintenanceChecklistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreventiveMaintenanceChecklistComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PreventiveMaintenanceChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
