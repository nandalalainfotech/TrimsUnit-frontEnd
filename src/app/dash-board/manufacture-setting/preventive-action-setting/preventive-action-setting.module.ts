import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventiveActionSettingRoutingModule } from './preventive-action-setting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PreventiveActionSettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class PreventiveActionSettingModule { }
