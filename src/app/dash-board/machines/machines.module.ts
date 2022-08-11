import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { PopupComponent } from 'ag-grid-community';
import { CalendarModule } from 'primeng/calendar';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { BreakdownSettingManager } from 'src/app/shared/services/restcontroller/bizservice/breakdown.service';
import { BreakDownRegManager } from 'src/app/shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { ChecklistSettingManager } from 'src/app/shared/services/restcontroller/bizservice/checklist-setting.service';
import { DailyChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/Dailycecklist.service';
import { MachineReportsManager } from 'src/app/shared/services/restcontroller/bizservice/machine-reports.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventiveactionSettingManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveaction-setting.service';
import { PreventiveChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/preventivechecklist.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { RootCauseSettingManager } from 'src/app/shared/services/restcontroller/bizservice/root-cause-setting.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { BreakDownRegisterComponent } from './break-down-register/break-down-register.component';
import { DailyMaintenanceChecklistComponent } from './daily-maintenance-checklist/daily-maintenance-checklist.component';
import { MachineReportsComponent } from './machine-reports/machine-reports.component';
import { MachinesRoutingModule } from './machines-routing.module';
import { MachinesComponent } from './machines.component';
import { PreventiveMaintenanceChecklistComponent } from './preventive-maintenance-checklist/preventive-maintenance-checklist.component';
import { PreventiveMaintenancePlanComponent } from './preventive-maintenance-plan/preventive-maintenance-plan.component';


@NgModule({
    declarations: [
        MachinesComponent,
        PreventiveMaintenanceChecklistComponent,
        PreventiveMaintenancePlanComponent,
        DailyMaintenanceChecklistComponent,
        BreakDownRegisterComponent,
        MachineReportsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MachinesRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        AgGridModule.withComponents([]),
        AgrenderercomponentModule,
        MatTabsModule,
        BreadcrumbModule,
        CalendarModule,
        NgbModule
    ],
    providers: [
        DatePipe,
        PreventivePlanManager,
        PreventiveChecklistManager,
        DailyChecklistManager,
        ChecklistSettingManager,
        BreakdownSettingManager,
        RootCauseSettingManager,
        PreventiveactionSettingManager,
        MachineSettingManager,
        SparesettingManager,
        BreakDownRegManager,
        MachineReportsManager
    ],
    // exports: [ConformationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MachinesModule { }
