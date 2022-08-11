import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreakdownSettingComponent } from './breakdown-setting.component';

const routes: Routes = [
  {
  path:"",
  component: BreakdownSettingComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreakdownSettingRoutingModule { }
