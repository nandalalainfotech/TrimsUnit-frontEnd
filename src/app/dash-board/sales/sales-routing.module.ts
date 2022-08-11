import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [{
  path: "",
  component: SalesComponent,
  children: [
    {
      path: "app-sales-invoice",
      component: SalesInvoiceComponent,
        
    },
  
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
