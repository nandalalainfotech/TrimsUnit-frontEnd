import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpareSettingRoutingModule } from './spare-setting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpareSettingRoutingModule,FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class SpareSettingModule { }
