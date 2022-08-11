import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [ SettingsComponent ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    FlexLayoutModule,
    BreadcrumbModule,
    MatSidenavModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    UserManager,
    RoleManager
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SettingsModule { }
