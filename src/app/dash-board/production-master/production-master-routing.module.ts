import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildPartComponent } from './child-part/child-part.component';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { ProductionMasterComponent } from './production-master.component';
import { ToolsMasterComponent } from './tools-master/tools-master.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { PartSpecificationMasterComponent } from './part-specification-master/part-specification-master.component';
import { ConsumerMasterComponent } from './consumer-master/consumer-master.component';

const routes: Routes = [

  {
    path: "",
    component: ProductionMasterComponent,
    children: [
        {
            path: 'app-production-details',
            component: ProductionDetailsComponent,
        },
        {
          path: 'app-part-specification-master',
          component: PartSpecificationMasterComponent,
        },
        {
          path: 'app-child-part',
          component: ChildPartComponent,
        },
        {
          path: 'app-consumer-master',
          component: ConsumerMasterComponent,
        },
        {
          path: 'app-part-master',
          component: PartMasterComponent,
        },
        {
          path: 'app-tools-master',
          component: ToolsMasterComponent,
        },
       

      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionMasterRoutingModule { }
