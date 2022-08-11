import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachineReportsComponent } from './machine-reports.component';

const routes: Routes = [
  {
    path:'',
    component: MachineReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineReportsRoutingModule { }
