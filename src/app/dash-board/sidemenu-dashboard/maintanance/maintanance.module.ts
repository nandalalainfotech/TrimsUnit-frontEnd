import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintananceRoutingModule } from './maintanance-routing.module';
import { MaintananceComponent } from './maintanance.component';
import {  MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MtbfComponent } from './mtbf/mtbf.component';
import { PreventiveMaintananceComponent } from './preventive-maintanance/preventive-maintanance.component';
import { MaintananceBDComponent } from './maintanance-bd/maintanance-bd.component';
import { OeeComponent } from './oee/oee.component';
import { MttrComponent } from './mttr/mttr.component';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [MaintananceComponent,
     MtbfComponent,
      PreventiveMaintananceComponent,

       MaintananceBDComponent,
        OeeComponent,
         MttrComponent],
  imports: [
    CommonModule,
    MaintananceRoutingModule,
    ProgressBarModule,
    MatTabsModule,
    NgxChartsModule  ]
})
export class MaintananceModule { }
