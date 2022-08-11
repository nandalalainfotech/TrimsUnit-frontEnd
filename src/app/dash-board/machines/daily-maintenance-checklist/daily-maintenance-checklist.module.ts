import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DailyMaintenanceChecklistRoutingModule } from './daily-maintenance-checklist-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DailyMaintenanceChecklistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class DailyMaintenanceChecklistModule { }
