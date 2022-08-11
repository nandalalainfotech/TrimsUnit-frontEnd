import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilitysComponent } from './facilitys.component';
import { FirePlanComponent } from './fire-plan/fire-plan.component';
import { FirstaidMaterialsPlanComponent } from './firstaid-materials-plan/firstaid-materials-plan.component';
import { SafetyequipmentsPlanComponent } from './safetyequipments-plan/safetyequipments-plan.component';

const routes: Routes = [
  {
    path: "",
    component: FacilitysComponent,
    children: [
   
      {
        path: "app-firstaid-materials-plan",
        component: FirstaidMaterialsPlanComponent,
      },
     
      {
        path: "app-safetyequipments-plan",
        component: SafetyequipmentsPlanComponent,
      },
      {
        path: "app-fire-plan",
        component: FirePlanComponent ,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitysRoutingModule { }
