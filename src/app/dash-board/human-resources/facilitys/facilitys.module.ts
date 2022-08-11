import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { FirePlanManager } from 'src/app/shared/services/restcontroller/bizservice/fireplan.service';
import { FirstaidMaterialsManager } from 'src/app/shared/services/restcontroller/bizservice/firstaid-materials.service';
import { SafetyEquipmentsManager } from 'src/app/shared/services/restcontroller/bizservice/safetyequipments.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FacilitysRoutingModule } from './facilitys-routing.module';
import { FacilitysComponent } from './facilitys.component';
import { FirePlanComponent } from './fire-plan/fire-plan.component';
import { FirstaidMaterialsPlanComponent } from './firstaid-materials-plan/firstaid-materials-plan.component';
// import { FirstaidMaterialsPlanComponent } from './firstaid-materials-plan/firstaid-materials-plan.component';

import { SafetyequipmentsPlanComponent } from './safetyequipments-plan/safetyequipments-plan.component';



@NgModule({
  declarations: [
    FirstaidMaterialsPlanComponent,
    SafetyequipmentsPlanComponent,
    FirePlanComponent,
  ],
  imports: [
    CommonModule,
    FacilitysRoutingModule,
    BreadcrumbModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
  ],
  providers: [
    DatePipe,
    FirstaidMaterialsManager,
    SafetyEquipmentsManager,
    FirePlanManager,
  ]
})
export class FacilitysModule { }
