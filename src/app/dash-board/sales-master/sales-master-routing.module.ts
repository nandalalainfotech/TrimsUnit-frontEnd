import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from '../sales/sales.component';
import { CustemerRegisterComponent } from './custemer-register/custemer-register.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { SalesMasterComponent } from './sales-master.component';

const routes: Routes = [{
  path: "",
  component: SalesMasterComponent,
  children: [
    {
      path: "app-sales-details",
      component: SalesDetailsComponent
    },
    {
      path: "app-custemer-register",
      component: CustemerRegisterComponent
    },
   
  
  ]
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesMasterRoutingModule { }
