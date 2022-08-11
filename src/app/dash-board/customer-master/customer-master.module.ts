import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerMasterRoutingModule } from './customer-master-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';


@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerMasterRoutingModule,
    BreadcrumbModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
  ],
  providers:[
    CustomerManager
  ]
})
export class CustomerMasterModule { }
