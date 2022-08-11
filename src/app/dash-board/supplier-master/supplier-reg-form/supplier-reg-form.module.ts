import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRegFormRoutingModule } from './supplier-reg-form-routing.module';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupplierRegFormRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SupplierRegFormModule { }
