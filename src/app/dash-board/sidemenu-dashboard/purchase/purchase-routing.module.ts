import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { SupplierPerformanceComponent } from './supplier-performance/supplier-performance.component';

const routes: Routes = [
  {
    path: "",
    component:PurchaseComponent,
    children: [
      {
        path: "app-supplier-performance",
        component:SupplierPerformanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
