import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { ChecklistSettingManager } from 'src/app/shared/services/restcontroller/bizservice/checklist-setting.service';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { ChecklistSettingComponent } from './checklist-setting/checklist-setting.component';
import { DepartmentSettingComponent } from './department-setting/department-setting.component';
import { MachineSettingComponent } from './machine-setting/machine-setting.component';
import { ManufactureSettingRoutingModule } from './manufacture-setting-routing.module';
import { SpareSettingComponent } from './spare-setting/spare-setting.component';
import { StatusSettingComponent } from './status-setting/status-setting.component';
import { RootCauseSettingComponent } from './root-cause-setting/root-cause-setting.component';
import { PreventiveActionSettingComponent } from './preventive-action-setting/preventive-action-setting.component';
import { BreakdownSettingManager } from 'src/app/shared/services/restcontroller/bizservice/breakdown.service';
import { BreakdownSettingComponent } from './breakdown-setting/breakdown-setting.component';
import { RootCauseSettingManager } from 'src/app/shared/services/restcontroller/bizservice/root-cause-setting.service';
import { PreventiveactionSettingManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveaction-setting.service';
import { ManufactureSettingComponent } from './manufacture-setting.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';




@NgModule({
  declarations: [
    ManufactureSettingComponent,
    MachineSettingComponent,
    DepartmentSettingComponent,
    ChecklistSettingComponent,
    SpareSettingComponent,
    StatusSettingComponent,
    RootCauseSettingComponent,
    PreventiveActionSettingComponent,
    BreakdownSettingComponent,
  ],

  imports: [
    CommonModule,
    ManufactureSettingRoutingModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule
  ], 
  providers: [
    MachineSettingManager,
    DepartmentsManager,
    ChecklistSettingManager,
    SparesettingManager,
    StatusSettingManager,
    BreakdownSettingManager,
    RootCauseSettingManager,
    PreventiveactionSettingManager
  ]
})
export class ManufactureSettingModule { }
