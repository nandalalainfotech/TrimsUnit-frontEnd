import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { SupplierAuditPlanComponent } from './supplier-audit-plan/supplier-audit-plan.component';
import { SupplierAuditReportComponent } from './supplier-audit-report/supplier-audit-report.component';
import { SupplierTrainingPlanComponent } from './supplier-training-plan/supplier-training-plan.component';
import { SupplierAttendanceReportComponent } from './supplier-attendance-report/supplier-attendance-report.component';

const routes: Routes = [
  {
    path: "",
    component: SupplierComponent,

    children: [
      {
        path: "app-supplier-assessment",
        loadChildren: () => import("./supplier-assessment/supplier-assessment.module").then(m => m.SupplierAssessmentModule)
      },
      {
        path: 'app-supplier-audit-plan',
        component: SupplierAuditPlanComponent
      },
      {
        path: 'app-supplier-audit-report',
        component: SupplierAuditReportComponent
      },
      {
        path: 'app-supplier-training-plan',
        component: SupplierTrainingPlanComponent
      },
      {
        path: 'app-supplier-attendance-report',
        component: SupplierAttendanceReportComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
