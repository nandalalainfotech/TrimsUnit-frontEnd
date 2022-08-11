import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LineChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { FusionChartsModule } from 'angular-fusioncharts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as Maps from 'fusioncharts/fusioncharts.maps';
import * as World from 'fusioncharts/maps/fusioncharts.world';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProgressBarModule } from 'primeng/progressbar';
import { AssessmentCriteriaManager } from '../shared/services/restcontroller/bizservice/AssessmentCriteria.service';
import { BreakDownRegManager } from '../shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { DailyChecklistManager } from '../shared/services/restcontroller/bizservice/Dailycecklist.service';
import { EmployeeDetailsManager } from '../shared/services/restcontroller/bizservice/employeedetail.service';
import { EmployeFecilityManager } from '../shared/services/restcontroller/bizservice/employef.service';
import { FirePlanManager } from '../shared/services/restcontroller/bizservice/fireplan.service';
import { FirstaidMaterialsManager } from '../shared/services/restcontroller/bizservice/firstaid-materials.service';
import { LegalManager } from '../shared/services/restcontroller/bizservice/legal.service';
import { LegalDocumentsManager } from '../shared/services/restcontroller/bizservice/legaldocuments.service';
import { MachineSettingManager } from '../shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventiveChecklistManager } from '../shared/services/restcontroller/bizservice/preventivechecklist.service';
import { PreventivePlanManager } from '../shared/services/restcontroller/bizservice/preventiveplan.service';
import { SafetyEquipmentsManager } from '../shared/services/restcontroller/bizservice/safetyequipments.service';
import { SupplierAssessmentManager } from '../shared/services/restcontroller/bizservice/supplierAssessment.service';
import { SupplierAuditManager } from '../shared/services/restcontroller/bizservice/supplierAudit.service';
import { SupplierRegManager } from '../shared/services/restcontroller/bizservice/supplierReg.service';
import { SupplierTrainingPlanManager } from '../shared/services/restcontroller/bizservice/suppliertrainingplan.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { AdvancepieChartComponent } from './body/advancepie-chart/advancepie-chart.component';
import { BodyComponent } from './body/body.component';
import { ComboChartComponent } from './body/combo-chart/combo-chart.component';
import { DoughnutChartComponent } from './body/doughnut-chart/doughnut-chart.component';
import { PiegridChartComponent } from './body/piegrid-chart/piegrid-chart.component';
import { PolarChartComponent } from './body/polar-chart/polar-chart.component';
import { ProductChartComponent } from './body/product-chart/product-chart.component';
import { RealtimeChartComponent } from './body/realtime-chart/realtime-chart.component';
import { SalebarChartComponent } from './body/salebar-chart/salebar-chart.component';
import { SalegaugeChartComponent } from './body/salegauge-chart/salegauge-chart.component';
import { SalelineChartComponent } from './body/saleline-chart/saleline-chart.component';
import { SalepieChartComponent } from './body/salepie-chart/salepie-chart.component';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { SupplierComponent } from './supplier/supplier.component';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { FileDocumetManager } from '../shared/services/restcontroller/bizservice/file.service';
import { BankMasterComponent } from './employee-master/bank-master/bank-master.component';
import { BankNameManager } from '../shared/services/restcontroller/bizservice/bank.service';
import { PurchasebleMasterComponent } from './purchase-master/purchaseble-master/purchaseble-master.component';
import { PurchaseableManager } from '../shared/services/restcontroller/bizservice/purchaseable.service';
import { PurchaseorderManager } from '../shared/services/restcontroller/bizservice/Purchaseorder.service';
import { OrderItemManager } from '../shared/services/restcontroller/bizservice/orderitem-wb.service';
import { OrderItemSettingManager } from '../shared/services/restcontroller/bizservice/orderItems.service';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { PurchaseWidjetComponent } from './body/purchase-widjet/purchase-widjet.component';
import { PurchaseChartComponent } from './body/purchase-chart/purchase-chart.component';
import { ApprovalComponent } from './approval/approval.component';
import { StoreWidjetComponent } from './body/store-widjet/store-widjet.component';
import { ProductionWidjetComponent } from './body/production-widjet/production-widjet.component';
import { QualityWidjetComponent } from './body/quality-widjet/quality-widjet.component';
import { HrWidjetComponent } from './body/hr-widjet/hr-widjet.component';
import { PurchasereqslipManager } from '../shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SalesMasterComponent } from './sales-master/sales-master.component';
import { CustomerManager } from '../shared/services/restcontroller/bizservice/customer.service';
import { ProducionComponent } from './producion/producion.component';
import { QualityComponent } from './quality/quality.component';
import { CustemerAddManager } from '../shared/services/restcontroller/bizservice/Custemer-wb.service';
import { SalesInvoiceManager } from '../shared/services/restcontroller/bizservice/salesinvoice.service';
import { SalesMasterManager } from '../shared/services/restcontroller/bizservice/salesmaster.service';
import { ProductionSettingComponent } from './production-setting/production-setting.component';
import { FixtureSettingManager } from '../shared/services/restcontroller/bizservice/fixturesetting.service';
import { MaterialreceiveditemManager } from '../shared/services/restcontroller/bizservice/Materialreceiveditem.service';
import { CompanyDetailsManager } from '../shared/services/restcontroller/bizservice/Companydetails.service';
import { SpecificationManager } from '../shared/services/restcontroller/bizservice/Specification.service';
import { PurchasereqItemManager } from '../shared/services/restcontroller/bizservice/Purchasereqitem.service';
import { SupplierQuotationItemManager } from '../shared/services/restcontroller/bizservice/SupplierQuotationitem.service';
import { SupplierContactManager } from '../shared/services/restcontroller/bizservice/supplierContact.service';
import { ConsumbleManager } from '../shared/services/restcontroller/bizservice/consumble.service';
import { ChildPartManager } from '../shared/services/restcontroller/bizservice/ChildPart.service';
import { PartManager } from '../shared/services/restcontroller/bizservice/part.service';
import { SupplierQuotationManager } from '../shared/services/restcontroller/bizservice/supplierquotation.service';




//import { TrainingPlanComponent } from './human-resource/emp-details/training-plan/training-plan.component';
//import { StatutoryPlanComponent } from './human-resource/emp-details/statutory-plan/statutory-plan.component';
//import { LegalDocumentsDetailsComponent } from './human-resouces/legal-documents-details/legal-documents-details.component';
//import { LegalDocumentsMastersComponent } from './legal-documents-masters/legal-documents-masters.component';
//import { LegalDocumentsComponent } from './legal-documents-masters/legal-documents/legal-documents.component';
//import { LegalDocumentsPlanComponent } from './legal-documents/legal-documents-plan/legal-documents-plan.component';


FusionChartsModule.fcRoot(FusionCharts, Maps, World, Charts, FusionTheme);


// import { GoJsChartComponent } from './body/go-js-chart/go-js-chart.component';


// import {NgxCumulioComponent} from 'ngx-cumulio';


@NgModule({

    declarations: [
        DashBoardComponent,
        HeaderComponent,
        FooterComponent,
        SideMenuComponent,
        BodyComponent,
        SupplierComponent,
        SupplierMasterComponent,
        ProductChartComponent,
        DoughnutChartComponent,
        SalebarChartComponent,
        ProductionWidjetComponent,
        QualityWidjetComponent,
        HrWidjetComponent,
        StoreWidjetComponent,
        SalegaugeChartComponent,
        SalepieChartComponent,
        RealtimeChartComponent,
        AdvancepieChartComponent,
        PiegridChartComponent,
        PolarChartComponent,
        SalelineChartComponent,
        ComboChartComponent,
        CustomerMasterComponent,
        PurchaseWidjetComponent,
        PurchaseChartComponent,
        ApprovalComponent,
    
       

       
    ],

    imports: [
        FormsModule,
        // BarChartModule,
        LineChartModule,
        NgxChartsModule,
        ChartsModule,
        // NgApexchartsModule,
        // D3Module, 
        // MatDividerModule,
        // MatToolbarModule,
        PerfectScrollbarModule,
        // BrowserModule,
        // BrowserAnimationsModule,
         ProgressBarModule,
       
        ProgressbarModule.forRoot(),
        RoundProgressModule,
        TranslateModule.forRoot(),
        BreadcrumbModule,
        MatMenuModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ColorPickerModule,
        DashboardRoutingModule,
        FusionChartsModule,
        AgChartsAngularModule,
      
    ],
    providers: [DataSharedService,
         MachineSettingManager, 
        
         UserManager,
         PreventivePlanManager, 
         PreventiveChecklistManager, 
         DailyChecklistManager, 
         BreakDownRegManager, 
         SupplierRegManager, 
         AssessmentCriteriaManager,
         SupplierAssessmentManager,
         SupplierAuditManager,
         SupplierTrainingPlanManager,
        EmployeeDetailsManager,
         FirstaidMaterialsManager,
         FirePlanManager,
         LegalDocumentsManager,
         LegalManager,
         EmployeFecilityManager,
         SafetyEquipmentsManager,
         FileDocumetManager,
         BankNameManager,
         PurchaseableManager,
         PurchaseorderManager,
         OrderItemSettingManager,
         OrderItemManager,
         MaterialreceiveditemManager,
         CustomerManager,
         CustemerAddManager,
         PurchasereqslipManager,
         SalesInvoiceManager,
         SalesMasterManager,
         CompanyDetailsManager,
         SpecificationManager,
         PurchasereqItemManager,
         SupplierQuotationItemManager,
         SupplierContactManager,
         ConsumbleManager,
         ChildPartManager,
         PartManager,
         SupplierQuotationManager
      
         
        ],
    exports: [NgbCollapseModule],
})
export class DashboardModule { }

