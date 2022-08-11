import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachinesComponent } from './machines.component';

const routes: Routes = [
  {
    path: "",
    component: MachinesComponent,
    children: [
      {
        path: "app-preventive-maintenance-plan",
        loadChildren: () => import("./preventive-maintenance-plan/preventive-maintenance-plan.module").then(m => m.PreventiveMaintenancePlanModule)

      },
      {
        path: "app-preventive-maintenance-checklist",
        loadChildren: () => import("./preventive-maintenance-checklist/preventive-maintenance-checklist.module").then(m => m.PreventiveMaintenanceChecklistModule)
      },
      {
        path: "app-daily-maintenance-checklist",
        loadChildren: () => import("./daily-maintenance-checklist/daily-maintenance-checklist.module").then(m => m.DailyMaintenanceChecklistModule)
      },
      {
        path: "app-break-down-register",
        loadChildren: () => import("./break-down-register/break-down-register.module").then(m => m.BreakDownRegisterModule)
      },
      {
        path: "app-machine-reports",
        loadChildren: () => import("./machine-reports/machine-reports-routing.module").then(m => m.MachineReportsRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule { }
