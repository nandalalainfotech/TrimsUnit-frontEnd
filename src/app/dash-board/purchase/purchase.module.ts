import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { PurchaseReqSlipComponent } from './purchase-req-slip/purchase-req-slip.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { SupplierQuotationComponent } from './supplier-quotation/supplier-quotation.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesOrderManager } from 'src/app/shared/services/restcontroller/bizservice/Salesorder.service';
import { PaymentComponent } from './payment/payment.component';
import { PaymentManager } from 'src/app/shared/services/restcontroller/bizservice/Payment.service';
import { CompanyDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/Companydetails.service';
import { ConsigneeManager } from 'src/app/shared/services/restcontroller/bizservice/Consignee.service';




@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseReqSlipComponent,
    SupplierQuotationComponent,
    PurchaseOrderComponent,
    SalesOrderComponent,
    PaymentComponent,
   
  ],

  imports: [
    CommonModule,
    PurchaseRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    MatTabsModule,
    CalendarModule
  ],

  providers: [
    SparesettingManager,
    PurchasereqslipManager,
    SupplierQuotationManager ,
    DatePipe,
    PurchaseorderManager,
    SalesOrderManager,
    PaymentManager,
    CompanyDetailsManager,
    ConsigneeManager
  ],
  
})

export class PurchaseModule { }
