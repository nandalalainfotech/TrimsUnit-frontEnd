import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { PaymentManager } from 'src/app/shared/services/restcontroller/bizservice/Payment.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SalesOrderManager } from 'src/app/shared/services/restcontroller/bizservice/Salesorder.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { ApprovalRoutingModule } from './approval-routing.module';


@NgModule({
  declarations: [ApprovalRequestComponent],
  imports: [
    ApprovalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    MatTabsModule,
    BreadcrumbModule,
    CalendarModule,
    NgbModule,
    CommonModule
  ],
  providers: [
    DatePipe,
    PurchasereqslipManager,
    SparesettingManager,
    SupplierQuotationManager,
    SalesOrderManager,
    PaymentManager,
    StatusSettingManager
  ]
})
export class ApprovalModule { }
