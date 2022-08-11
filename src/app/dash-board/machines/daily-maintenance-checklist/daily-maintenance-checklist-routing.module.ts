import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyMaintenanceChecklistComponent } from './daily-maintenance-checklist.component';

const routes: Routes = [
  {
    path: '',
    component: DailyMaintenanceChecklistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyMaintenanceChecklistRoutingModule { }
