import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitmasterRoutingModule } from './unitmaster-routing.module';
import { UnitmasterComponent } from './unitmaster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [UnitmasterComponent],
  imports: [
    CommonModule,
    UnitmasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    FlexLayoutModule,
    BreadcrumbModule,
    MatSidenavModule,
    AgGridModule.withComponents([])
  ]
})
export class UnitmasterModule { }
