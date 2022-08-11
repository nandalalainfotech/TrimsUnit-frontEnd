import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { SupplierChecklistComponent } from './supplier-checklist/supplier-checklist.component';
import { SupplierMasterComponent } from './supplier-master.component';
import { TraningPlanComponent } from './traning-plan/traning-plan.component';

const routes: Routes = [
    {
        path: "",
        component: SupplierMasterComponent,

        children: [
            {
                path: "app-supplier-reg-form",
                loadChildren: () => import("./supplier-reg-form/supplier-reg-form.module").then(m => m.SupplierRegFormModule)
            },
            {
                path: "app-assessment-criteria",
                loadChildren: () => import("./assessment-criteria/assessment-criteria.module").then(m => m.AssessmentCriteriaModule)
            },
            {
                path: "app-activity",
               component: ActivityComponent
            },
            {
                path: "app-supplier-checklist",
                component: SupplierChecklistComponent
            },
            {
                path: "app-traning-plan",
                component: TraningPlanComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplierMasterRoutingModule { }
