import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: "",
        component: BodyComponent,
      },
      {
        path: 'app-manufacture-setting',
        loadChildren: () => import("./manufacture-setting/manufacture-setting.module").then(m => m.ManufactureSettingModule)
      },
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: "app-machines",
        loadChildren: () => import("./machines/machines.module").then(m => m.MachinesModule)
      },
      {
        path: "app-supplier",
        loadChildren: () => import("./supplier/supplier.module").then(m => m.SupplierModule)
      },
      {
        path: "app-supplier-master",
        loadChildren: () => import("./supplier-master/supplier-master.module").then(m => m.SupplierMasterModule)
      },
      {
        path: "app-purchase",
        loadChildren: () => import("./purchase/purchase.module").then(m => m.PurchaseModule)
      },
      {
        path: "app-sales",
        loadChildren: () => import("./sales/sales.module").then(m => m.SalesModule)
      },
      {
        path: "app-store",
        loadChildren: () => import("./store/store.module").then(m => m.StoreModule)
      },
      {
        path: "app-purchase-master",
        loadChildren: () => import("./purchase-master/purchase-master.module").then(m => m.PurchaseMasterModule)
      },
      {
        path: "app-human-resources",
        loadChildren: () => import("./human-resources/human-resources.module").then(m => m.HumanResourcesModule)
      },
      {
        path: "app-employee-master",
        loadChildren: () => import("./employee-master/employee-master.module").then(m => m.EmployeeMasterModule)
      },
      {
        path: "app-production-master",
        loadChildren: () => import("./production-master/production-master.module").then(m => m.ProductionMasterModule)
      },
      {
        path: "app-sidemenu-dashboard",
        loadChildren: () => import("./sidemenu-dashboard/sidemenu-dashboard.module").then(m => m.SidemenuDashboardModule)
      },
      {
        path: "app-file-master",
        loadChildren: () => import("./file-master/file-master.module").then(m => m.FileMasterModule)
      },
      {
        path: "app-customer-master",
        loadChildren: () => import("./customer-master/customer-master.module").then(m => m.CustomerMasterModule)
      },
      {
        path: "app-sales-master",
        loadChildren: () => import("./sales-master/sales-master.module").then(m => m.SalesMasterModule)
      },
      {
        path:"app-approval",
        loadChildren:()=>import("./approval/approval.module").then(m=>m.ApprovalModule)
      },
      {
        path:"app-producion",
        loadChildren:()=>import("./producion/producion.module").then(m=>m.ProducionModule)
      },
      {
        path:"app-production-setting",
        loadChildren:()=>import("./production-setting/production-setting.module").then(m=>m.ProductionSettingModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
