import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineReportsRoutingModule } from './machine-reports-routing.module';
import { MachineReportsManager } from 'src/app/shared/services/restcontroller/bizservice/machine-reports.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MachineReportsRoutingModule
  ],
  providers: [MachineReportsManager]

})
export class MachineReportsModule { }
