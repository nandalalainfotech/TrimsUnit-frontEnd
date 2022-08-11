import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreventiveMaintenancePlanComponent } from './preventive-maintenance-plan.component';

const routes: Routes = [
  {
    path: '',
    component: PreventiveMaintenancePlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreventiveMaintenancePlanRoutingModule { }
