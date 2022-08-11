import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierMasterRoutingModule } from './supplier-master-routing.module';
import { SupplierRegFormComponent } from './supplier-reg-form/supplier-reg-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { AssessmentCriteriaComponent } from './assessment-criteria/assessment-criteria.component';
import { AssessmentCriteriaManager } from 'src/app/shared/services/restcontroller/bizservice/AssessmentCriteria.service';
import { SupplierAssessmentManager } from 'src/app/shared/services/restcontroller/bizservice/supplierAssessment.service';
import { ActivityComponent } from './activity/activity.component';
import { SupplierChecklistComponent } from './supplier-checklist/supplier-checklist.component';
import { ActivityManager } from 'src/app/shared/services/restcontroller/bizservice/activity.service';
import { SupplierChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-checklist.service';
import { TraningPlanComponent } from './traning-plan/traning-plan.component';
import { TrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/trainingplan.service';


@NgModule({
  declarations: [SupplierRegFormComponent,
    AssessmentCriteriaComponent,
    ActivityComponent,
    SupplierChecklistComponent,
    TraningPlanComponent],
  imports: [
    CommonModule,
    SupplierMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BreadcrumbModule
  ],
  providers: [AssessmentCriteriaManager,
    SupplierAssessmentManager,
    ActivityManager,
    SupplierChecklistManager,
    TrainingPlanManager
  ]

})
export class SupplierMasterModule { }
