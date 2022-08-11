import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { EmpDetailsRoutingModule } from './emp-details-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { StatutoryPlanComponent } from './statutory-plan/statutory-plan.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { StatutoryPlanManager } from 'src/app/shared/services/restcontroller/bizservice/statutory.service';



@NgModule({
  declarations: [
    EmployeeComponent,
    StatutoryPlanComponent,
    TrainingPlanComponent
],
  imports: [
    CommonModule,
    EmpDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatTabsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
  ],
  providers: [
    DatePipe,
    StatutoryPlanManager
    
  ]
})
export class EmpDetailsModule { }
