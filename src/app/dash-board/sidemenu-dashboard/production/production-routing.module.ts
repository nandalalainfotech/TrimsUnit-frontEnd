import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { ScrapComponent } from './scrap/scrap.component';

const routes: Routes = [
  {
    path: "",
    component:ProductionComponent,
    children: [
      {
        path: "app-scrap",
        component:ScrapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
