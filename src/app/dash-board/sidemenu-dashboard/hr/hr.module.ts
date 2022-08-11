import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { TrainingComponent } from './training/training.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HrComponent } from './hr.component';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [HrComponent,TrainingComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    MatTabsModule,
    NgxChartsModule,
    ProgressBarModule
  ]
})
export class HrModule { }
