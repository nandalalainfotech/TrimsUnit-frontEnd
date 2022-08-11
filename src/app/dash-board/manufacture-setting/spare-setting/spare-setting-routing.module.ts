import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpareSettingComponent } from './spare-setting.component';

const routes: Routes = [
  {
    path:"",
  component:SpareSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpareSettingRoutingModule { }
