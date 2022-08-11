import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachineSettingComponent } from './machine-setting.component';

const routes: Routes = [
  {
    path:"",
  component:MachineSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineSettingRoutingModule { }
