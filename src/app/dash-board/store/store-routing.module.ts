import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerProportyRegisterComponent } from './customer-proporty-register/customer-proporty-register.component';
import { IncomingInspectionRecordComponent } from './incoming-inspection-record/incoming-inspection-record.component';
import { MaterialInwardRecordComponent } from './material-inward-record/material-inward-record.component';
import { MaterialMomentsComponent } from './material-moments/material-moments.component';
import { MaterialReqSlipComponent } from './material-req-slip/material-req-slip.component';
import { MaterialStockComponent } from './material-stock/material-stock.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: "",
    component: StoreComponent,
    children: [
      {
        path: "app-material-inward-record",
        component: MaterialInwardRecordComponent
      },
      {
        path: "app-material-req-slip",
        component: MaterialReqSlipComponent
      },
      {
        path: "app-material-moments",
        component: MaterialMomentsComponent
      },
      {
        path: "app-material-stock",
        component: MaterialStockComponent
      },
      {
        path: "app-incoming-inspection-record",
        component: IncomingInspectionRecordComponent
      },
      {
        path: "app-customer-proporty-registe",
        component: CustomerProportyRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
