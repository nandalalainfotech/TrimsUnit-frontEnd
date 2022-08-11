import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ConsigneeDetailsComponent } from './consignee-details/consignee-details.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { PurchaseMasterComponent } from './purchase-master.component';
import { PurchasebleMasterComponent } from './purchaseble-master/purchaseble-master.component';

const routes: Routes = [{
  path: "",
  component: PurchaseMasterComponent,
  children: [
    {
      path: "app-company-details",
      component: CompanyDetailsComponent
    },
    {
      path: "app-consignee-details",
      component: ConsigneeDetailsComponent
    },
    {
      path: "app-purchaseble-master",
      component: PurchasebleMasterComponent
    },
    {
      path: "app-item-master",
      component: ItemMasterComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseMasterRoutingModule { }
