import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreventiveActionSettingComponent } from './preventive-action-setting.component';

const routes: Routes = [
  {
    path: "",
    component: PreventiveActionSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreventiveActionSettingRoutingModule { }
