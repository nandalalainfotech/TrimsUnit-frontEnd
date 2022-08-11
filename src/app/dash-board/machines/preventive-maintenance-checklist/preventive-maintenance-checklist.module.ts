import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { PreventiveMaintenanceChecklistRoutingModule } from './preventive-maintenance-checklist-routing.module';

@NgModule({
    declarations: [],

    imports: [
        CommonModule,
        PreventiveMaintenanceChecklistRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
    ],
})

export class PreventiveMaintenanceChecklistModule { }
