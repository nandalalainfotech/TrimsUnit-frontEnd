import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionComponent } from '../sidemenu-dashboard/production/production.component';
import { MSettingComponent } from './m-setting/m-setting.component';
import { ProdLogComponent } from './prod-log/prod-log.component';
import { ProdPlanComponent } from './prod-plan/prod-plan.component';
import { ProducionComponent } from './producion.component';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { QualityDetailsComponent } from './quality-details/quality-details.component';

const routes: Routes = [

  {
    path: "",
    component: ProducionComponent,
    children: [
        {
            path: 'app-prod-plan',
            component:ProdPlanComponent,

        },
        {
          path: 'app-prod-log',
          component:ProdLogComponent,

      },
      {
        path: 'app-m-setting',
        component:MSettingComponent,

    },
       

      ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducionRoutingModule { }
