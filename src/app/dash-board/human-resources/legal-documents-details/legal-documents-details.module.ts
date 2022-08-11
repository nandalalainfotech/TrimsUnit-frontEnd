import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { FirstaidMaterialsManager } from 'src/app/shared/services/restcontroller/bizservice/firstaid-materials.service';

import { LegalDocumentsDetailsRoutingModule } from './legal-documents-details-routing.module';
import { LegalDocumentsComponent } from './legal-documents/legal-documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [LegalDocumentsComponent,
    LegalDocumentsComponent],
  imports: [
    CommonModule,
    LegalDocumentsDetailsRoutingModule,
    BreadcrumbModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
  ],
  providers: [
    DatePipe,
  
  ]
})
export class LegalDocumentsDetailsModule { }
