import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentSettingComponent } from './department-setting.component';

const routes: Routes = [
  {
    path:"",
  component:DepartmentSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentSettingRoutingModule { }
