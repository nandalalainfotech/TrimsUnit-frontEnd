import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionSettingComponent } from './production-setting.component';
import { ProductionSettingModule } from './production-setting.module';

const routes: Routes = [  {
  path: "",
  component: ProductionSettingComponent,
  children: [
      {
          path: 'app-fixture-machine-master',
          loadChildren: () => import("./fixture-machine-master/fixture-machine-master.module").then(m => m.FixtureMachineMasterModule)
      },
   
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionSettingRoutingModule { }
