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
import { CompanyDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/Companydetails.service';
import { CustmerRegManager } from 'src/app/shared/services/restcontroller/bizservice/CustemerRegistration.service';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';
import { ProdManager } from 'src/app/shared/services/restcontroller/bizservice/prod.service';
import { SalesInvoiceManager } from 'src/app/shared/services/restcontroller/bizservice/salesinvoice.service';
import { SalesOrderManager } from 'src/app/shared/services/restcontroller/bizservice/Salesorder.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

import { ProdPlanComponent } from './prod-plan/prod-plan.component';
import { ProducionRoutingModule } from './producion-routing.module';
import { ProducionComponent } from './producion.component';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { QualityDetailsComponent } from './quality-details/quality-details.component';
import { ProdLogComponent } from './prod-log/prod-log.component';
import { ReworkComponent } from './rework/rework.component';
import { RmScrapComponent } from './rm-scrap/rm-scrap.component';
import { PartScrapComponent } from './part-scrap/part-scrap.component';
import { ProdActualComponent } from './prod-actual/prod-actual.component';
import { SFGComponent } from './sfg/sfg.component';
import { FGComponent } from './fg/fg.component';
import { MSettingComponent } from './m-setting/m-setting.component';

@NgModule({
  declarations: [ProductionDetailsComponent, QualityDetailsComponent, ProdPlanComponent,ProducionComponent, ProdLogComponent, ReworkComponent, RmScrapComponent, PartScrapComponent, ProdActualComponent, SFGComponent, FGComponent, MSettingComponent],
  imports: [
    CommonModule,
    ProducionRoutingModule,
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
    DatePipe,
    ProdManager,
    SupplierQuotationManager,
    SalesOrderManager,
    CustomerManager,
    SalesInvoiceManager,
    CustmerRegManager
   
  ]
})
export class ProducionModule { }
