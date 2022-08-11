import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualityRoutingModule } from './quality-routing.module';
import { InternalComplaintsComponent } from './internal-complaints/internal-complaints.component';
import { QualityComponent } from './quality.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [InternalComplaintsComponent,QualityComponent],
  imports: [
    CommonModule,
    QualityRoutingModule,
    MatTabsModule,
    ProgressBarModule,
    NgxChartsModule
  ]
})
export class QualityModule { }
