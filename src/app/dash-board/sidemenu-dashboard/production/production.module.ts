import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ScrapComponent } from './scrap/scrap.component';
import { ProductionComponent } from './production.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [ScrapComponent,ProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    MatTabsModule,
    ProgressBarModule,
    NgxChartsModule
  ]
})
export class ProductionModule { }
