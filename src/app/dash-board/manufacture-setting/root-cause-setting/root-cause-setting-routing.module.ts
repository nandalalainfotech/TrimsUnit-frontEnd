import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootCauseSettingComponent } from './root-cause-setting.component';

const routes: Routes = [
  {
    path: "",
    component: RootCauseSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootCauseSettingRoutingModule { }
