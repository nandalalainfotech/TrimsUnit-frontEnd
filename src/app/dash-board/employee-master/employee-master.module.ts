import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { EmployeeDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/employeedetail.service';
import { LegalDocumentsManager } from 'src/app/shared/services/restcontroller/bizservice/legaldocuments.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeMasterRoutingModule } from './employee-master-routing.module';
import { EmployeeMasterComponent } from './employee-master.component';
import { EmployefecilityComponent } from './employefecility/employefecility.component';
import { LegalDocumentsComponent } from './legal-documents/legal-documents.component';
import { BankMasterComponent } from './bank-master/bank-master.component';



@NgModule({
  declarations: [
    EmployeeMasterComponent,
    EmployeeDetailsComponent,
    LegalDocumentsComponent,
    EmployefecilityComponent,
    BankMasterComponent

  ],
  imports: [
    CommonModule,
    EmployeeMasterRoutingModule,
    BreadcrumbModule,
    MatTabsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    EmployeeDetailsManager,
    LegalDocumentsManager
 
  ]
})
export class EmployeeMasterModule { }
