import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreComponent } from './store.component';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [RawMaterialComponent,StoreComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatTabsModule,
    NgxChartsModule,
    ProgressBarModule
  ]
})
export class StoreModule { }
