import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistSettingComponent } from './checklist-setting.component';

const routes: Routes = [
  {
    path: "",
    component: ChecklistSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistSettingRoutingModule { }
