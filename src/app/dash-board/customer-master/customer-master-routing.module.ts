import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMasterComponent } from './customer-master.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerMasterComponent,
    children: [
      {
        path: 'app-customer',
        component: CustomerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMasterRoutingModule { }
