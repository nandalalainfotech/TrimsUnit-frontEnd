import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierAssessmentRoutingModule } from './supplier-assessment-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupplierAssessmentRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SupplierAssessmentModule { }
