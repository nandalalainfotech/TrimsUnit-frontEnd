import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankMasterComponent } from './bank-master/bank-master.component';
//import { LegalDocumentsDetailsComponent } from '../human-resouces/legal-documents-details/legal-documents-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeMasterComponent } from './employee-master.component';
import { EmployefecilityComponent } from './employefecility/employefecility.component';
import { LegalDocumentsComponent } from './legal-documents/legal-documents.component';

const routes: Routes = [
  {
    path: "",
    component: EmployeeMasterComponent,
    children: [
      {
        path: "app-employee-details",
        component: EmployeeDetailsComponent
      },
      {
        path: "app-legal-documents",
        component: LegalDocumentsComponent
      },
      {
        path: "app-employefecility",
        component: EmployefecilityComponent
      },
      {
        path: "app-bank-master",
        component: BankMasterComponent
      },
    ]
  }];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeMasterRoutingModule { }
