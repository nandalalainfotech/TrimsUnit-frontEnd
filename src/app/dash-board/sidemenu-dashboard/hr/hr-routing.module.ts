import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr.component';
import { TrainingComponent } from './training/training.component';


const routes: Routes = [
  {
    path: "",
    component:HrComponent,
    children: [
      {
        path: "app-training",
        component:TrainingComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
