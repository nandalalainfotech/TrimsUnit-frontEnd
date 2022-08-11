import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: "",
    component:StoreComponent,
    children: [
      {
        path: "app-raw-material",
        component:RawMaterialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
