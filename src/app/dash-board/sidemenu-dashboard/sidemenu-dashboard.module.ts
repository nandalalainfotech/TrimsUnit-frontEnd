import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidemenuDashboardRoutingModule } from './sidemenu-dashboard-routing.module';

import { SidemenuDashboardComponent } from './sidemenu-dashboard.component';
import { MaintananceComponent } from './maintanance/maintanance.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { QualityComponent } from './quality/quality.component';
import { StoreComponent } from './store/store.component';
import { HrComponent } from './hr/hr.component';
import { ProductionComponent } from './production/production.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [SidemenuDashboardComponent,
    //  PurchaseComponent,
    //   QualityComponent,
    //    StoreComponent,
    //     HrComponent,
    //      ProductionComponent,
    ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    SidemenuDashboardRoutingModule,
    ProgressBarModule
  ]
})
export class SidemenuDashboardModule { }
