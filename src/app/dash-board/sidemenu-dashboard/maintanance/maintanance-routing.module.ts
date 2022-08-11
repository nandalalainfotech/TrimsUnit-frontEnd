import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintananceBDComponent } from './maintanance-bd/maintanance-bd.component';

import { MaintananceComponent } from './maintanance.component';
import { MtbfComponent } from './mtbf/mtbf.component';
import { PreventiveMaintananceComponent } from './preventive-maintanance/preventive-maintanance.component';

const routes: Routes = [
  {
    path: "",
    component:MaintananceComponent,
    children: [      
      {
        path: "app-preventive-maintanance",
        component:PreventiveMaintananceComponent
      },
      {
        path: "app-mtbf",
        component:MtbfComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintananceRoutingModule { }
