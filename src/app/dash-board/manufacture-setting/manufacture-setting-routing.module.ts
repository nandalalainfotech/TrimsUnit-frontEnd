import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufactureSettingComponent } from './manufacture-setting.component';

const routes: Routes = [
    {
        path: "",
        component: ManufactureSettingComponent,
        children: [
            {
                path: 'app-machine-setting',
                loadChildren: () => import("./machine-setting/machine-setting.module").then(m => m.MachineSettingModule)
            },
            {
                path: 'app-spare-setting',
                loadChildren: () => import("./spare-setting/spare-setting.module").then(m => m.SpareSettingModule)
            },
            {
                path: 'app-department-setting',
                loadChildren: () => import("./department-setting/department-setting.module").then(m => m.DepartmentSettingModule)
            },
            {
                path: 'app-breakdown-setting',
                loadChildren: () => import("./breakdown-setting/breakdown-setting.module")
                .then(m => m.BreakdownSettingModule)
            },
            {
                path: 'app-checklist-setting',
                loadChildren: () => import("./checklist-setting/checklist-setting.module").then(m => m.ChecklistSettingModule)
            },
            {
                path: 'app-root-cause-setting',
                loadChildren: () => import("./root-cause-setting/root-cause-setting.module").then(m => m.RootCauseSettingModule)
            },
            {
                path: 'app-preventive-action-setting',
                loadChildren: () => import("./preventive-action-setting/preventive-action-setting.module").then(m => m.PreventiveActionSettingModule)
            },
            {
                path: 'app-status-setting',
                loadChildren: () => import("./status-setting/status-setting.module").then(m => m.StatusSettingModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManufactureSettingRoutingModule { }
