import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreakDownRegisterComponent } from './break-down-register.component';

const routes: Routes = [
  {
    path: '',
    component: BreakDownRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreakDownRegisterRoutingModule { }
