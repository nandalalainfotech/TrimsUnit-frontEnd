import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ApprovalRequestRoutingModule } from './approval-request-routing.module';
import { ApprovalRequestComponent } from './approval-request.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';


@NgModule({
  declarations: [
    // ApprovalRequestComponent,
  ],
  imports: [
    CommonModule,
    ApprovalRequestRoutingModule,
    BreadcrumbModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
  ],
  providers: [
    DatePipe,
    

   
  ]
})
export class ApprovalRequestModule { }
