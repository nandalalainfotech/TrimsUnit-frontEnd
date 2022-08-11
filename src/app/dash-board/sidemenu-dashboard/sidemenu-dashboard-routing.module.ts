import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidemenuDashboardComponent } from './sidemenu-dashboard.component';


const routes: Routes = [
  {
    path: "",
    component: SidemenuDashboardComponent,
    children: [
   
      {
        path: "app-maintanance",
        loadChildren:() => import("./maintanance/maintanance.module").then(m=>m.MaintananceModule)

      },
      {
        path: "app-production",
        loadChildren:() => import("./production/production.module").then(m=>m.ProductionModule)

      },

      {
        path: "app-purchase",
        loadChildren:() => import("./purchase/purchase.module").then(m=>m.PurchaseModule)

      },
      {
        path: "app-quality",
        loadChildren:() => import("./quality/quality.module").then(m=>m.QualityModule)

      },
      {
        path: "app-store",
        loadChildren:() => import("./store/store.module").then(m=>m.StoreModule)

      },
      {
        path: "app-hr",
        loadChildren:() => import("./hr/hr.module").then(m=>m.HrModule)

      },

     
  
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidemenuDashboardRoutingModule { }
