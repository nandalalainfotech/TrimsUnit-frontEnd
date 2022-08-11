import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FixtureMachineMasterComponent } from './fixture-machine-master.component';

const routes: Routes =  [
  {
    path:"",
  component:FixtureMachineMasterComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixtureMachineMasterRoutingModule { }
