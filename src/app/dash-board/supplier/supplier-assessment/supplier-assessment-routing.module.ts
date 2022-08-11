import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierAssessmentComponent } from './supplier-assessment.component';

const routes: Routes = [
  {
    path: "",
    component: SupplierAssessmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SupplierAssessmentRoutingModule { }
