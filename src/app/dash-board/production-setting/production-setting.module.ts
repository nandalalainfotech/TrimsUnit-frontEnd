import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionSettingRoutingModule } from './production-setting-routing.module';
import { FixtureMachineMasterComponent } from './fixture-machine-master/fixture-machine-master.component';
import { ProductionSettingComponent } from './production-setting.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { ChecklistSettingManager } from 'src/app/shared/services/restcontroller/bizservice/checklist-setting.service';
import { PreventiveactionSettingManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveaction-setting.service';
import { RootCauseSettingManager } from 'src/app/shared/services/restcontroller/bizservice/root-cause-setting.service';
import { BreakdownSettingManager } from 'src/app/shared/services/restcontroller/bizservice/breakdown.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { FixtureSettingManager } from 'src/app/shared/services/restcontroller/bizservice/fixturesetting.service';


@NgModule({
  declarations: [FixtureMachineMasterComponent,
    ProductionSettingComponent
 ],
  imports: [
    CommonModule,
    ProductionSettingRoutingModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule
  ],
  providers: [
    FixtureSettingManager,
    DepartmentsManager,
    ChecklistSettingManager,
    SparesettingManager,
    StatusSettingManager,
    BreakdownSettingManager,
    RootCauseSettingManager,
    PreventiveactionSettingManager
  ]
})
export class ProductionSettingModule { }
