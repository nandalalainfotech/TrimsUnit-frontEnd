import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusSettingComponent } from './status-setting.component';

const routes: Routes = [
  {
    path: "",
    component: StatusSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusSettingRoutingModule { }
