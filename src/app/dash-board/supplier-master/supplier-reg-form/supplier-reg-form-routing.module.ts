import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierRegFormComponent } from './supplier-reg-form.component';

const routes: Routes = [
  {
    path:"",
    component: SupplierRegFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRegFormRoutingModule { }
