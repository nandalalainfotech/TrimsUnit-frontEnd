import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentCriteriaComponent } from './assessment-criteria.component';

const routes: Routes = [
  {
    path: "",
    component: AssessmentCriteriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentCriteriaRoutingModule { }
