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
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { FacilitysComponent } from './facilitys/facilitys.component';
import { FirstaidMaterialsPlanComponent } from './facilitys/firstaid-materials-plan/firstaid-materials-plan.component';
import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './human-resources.component';
import { LegalDocumentsDetailsComponent } from './legal-documents-details/legal-documents-details.component';
//import { EmployeeComponent } from './employee/employee.component';
//import { LegalDocumentsPlanComponent } from './legal-documents-plan/legal-documents-plan.component';
//import { SkillDetailsPlanComponent } from './skill-details-plan/skill-details-plan.component';
// import { FirstaidMaterialsPlanComponent } from './firstaid-materials-plan/firstaid-materials-plan.component';



@NgModule({
  declarations: [
    HumanResourcesComponent,
    LegalDocumentsDetailsComponent,
    EmpDetailsComponent,
    FacilitysComponent,

    

    
    
  ],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
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
export class HumanResourcesModule { }
