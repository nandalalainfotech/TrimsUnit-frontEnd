import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseReqSlipComponent } from './purchase-req-slip/purchase-req-slip.component';
import { PurchaseComponent } from './purchase.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SupplierQuotationComponent } from './supplier-quotation/supplier-quotation.component';

const routes: Routes = [
  {
    path: "",
    component: PurchaseComponent,
    children: [
    
      {
        path: "app-purchase-req-slip",
        component: PurchaseReqSlipComponent,
      },
      {
        path: "app-supplier-quotation",
        component: SupplierQuotationComponent,
      },
      {
        path: "app-purchase-order",
        component: PurchaseOrderComponent,
      },
      {
        path: "app-sales-order",
        component: SalesOrderComponent,
      },
      {
        path: "app-payment",
        component: PaymentComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
