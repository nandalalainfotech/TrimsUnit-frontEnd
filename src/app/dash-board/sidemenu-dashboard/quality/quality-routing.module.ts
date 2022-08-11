import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalComplaintsComponent } from './internal-complaints/internal-complaints.component';
import { QualityComponent } from './quality.component';

const routes: Routes = [
  {
    path: "",
    component:QualityComponent,
    children: [
      {
        path: "app-internal-complaints",
        component:InternalComplaintsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule { }
