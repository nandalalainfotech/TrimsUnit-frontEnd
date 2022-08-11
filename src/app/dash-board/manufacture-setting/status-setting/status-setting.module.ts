import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusSettingRoutingModule } from './status-setting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatusSettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class StatusSettingModule { }
