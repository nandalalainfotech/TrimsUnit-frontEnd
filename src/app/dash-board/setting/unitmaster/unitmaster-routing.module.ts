import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitmasterComponent } from './unitmaster.component';

const routes: Routes = [
  {
    path: "",
    component: UnitmasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitmasterRoutingModule { }
