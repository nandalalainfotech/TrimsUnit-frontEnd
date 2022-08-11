import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { SupplierPerformanceComponent } from './supplier-performance/supplier-performance.component';
import { PurchaseComponent } from './purchase.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [SupplierPerformanceComponent,PurchaseComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    MatTabsModule,
    NgxChartsModule,
         ProgressBarModule,
  ]
})
export class PurchaseModule { }
