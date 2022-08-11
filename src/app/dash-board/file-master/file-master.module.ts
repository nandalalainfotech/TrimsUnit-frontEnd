import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FileMasterRoutingModule } from './file-master-routing.module';
import { FileDocumentComponent } from './file-document/file-document.component';
import { FileMasterComponent } from './file-master.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';


@NgModule({
  declarations: [
    FileDocumentComponent,
    FileMasterComponent
  ],
  imports: [
    CommonModule,
    FileMasterRoutingModule,
    BreadcrumbModule,
    MatTabsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class FileMasterModule { }
