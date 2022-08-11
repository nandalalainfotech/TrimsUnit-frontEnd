import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SupplierAssessmentComponent } from './supplier-assessment/supplier-assessment.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierAuditPlanComponent } from './supplier-audit-plan/supplier-audit-plan.component';
import { SupplierAuditManager } from 'src/app/shared/services/restcontroller/bizservice/supplierAudit.service';
import { SupplierAuditReportComponent } from './supplier-audit-report/supplier-audit-report.component';
import { CalendarModule } from 'primeng/calendar';
import { SupplierReportManager } from 'src/app/shared/services/restcontroller/bizservice/supplierreport.service';
import { ActivityManager } from 'src/app/shared/services/restcontroller/bizservice/activity.service';
import { SupplierChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-checklist.service';
import { SupplierTrainingPlanComponent } from './supplier-training-plan/supplier-training-plan.component';
import { SupplierTrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/suppliertrainingplan.service';
import { TrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/trainingplan.service';
import { SupplierAttendanceReportComponent } from './supplier-attendance-report/supplier-attendance-report.component';
import { SupplierAttendanceManager } from 'src/app/shared/services/restcontroller/bizservice/Supplierattendancereport.service';


@NgModule({
  declarations: [ SupplierAssessmentComponent,
  SupplierAuditPlanComponent,
  SupplierAuditReportComponent,
  SupplierTrainingPlanComponent,
  SupplierAttendanceReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SupplierRoutingModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BreadcrumbModule,
    CalendarModule,
  ],
  providers:[SupplierRegManager, 
    SupplierAuditManager, 
    DatePipe, 
    SupplierReportManager, 
    ActivityManager, 
    SupplierChecklistManager,
    TrainingPlanManager, 
    SupplierTrainingPlanManager,
    SupplierAttendanceManager ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SupplierModule { }
