import { CommonModule } from '@angular/common';
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
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { PurchaseMasterRoutingModule } from './purchase-master-routing.module';
import { PurchaseMasterComponent } from './purchase-master.component';
import { ConsigneeDetailsComponent } from './consignee-details/consignee-details.component';
import { ConsigneeManager } from 'src/app/shared/services/restcontroller/bizservice/Consignee.service';
import { PurchasebleMasterComponent } from './purchaseble-master/purchaseble-master.component';
import { PurchaseableManager } from 'src/app/shared/services/restcontroller/bizservice/purchaseable.service';
import { ItemMasterComponent } from './item-master/item-master.component';



@NgModule({
  declarations: [
    PurchaseMasterComponent,
    CompanyDetailsComponent,
    ConsigneeDetailsComponent,
    PurchasebleMasterComponent,
    ItemMasterComponent
  ],
  imports: [
    CommonModule,
    PurchaseMasterRoutingModule,
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
    CompanyDetailsManager,
    ConsigneeManager,
    PurchaseableManager
  ],
})
export class PurchaseMasterModule { }
