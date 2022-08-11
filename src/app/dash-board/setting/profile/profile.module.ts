import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from 'src/app/app.component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { PasswordComponent } from './password/password.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsernameComponent } from './username/username.component';



@NgModule({
  declarations: [
    ProfileComponent,
    RegistrationComponent,
    PasswordComponent,
    UsernameComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    FlexLayoutModule,
    BreadcrumbModule,
    MatSidenavModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    LoginManager,
    AuthManager,
    UserManager,
    PersonManager,
    DepartmentsManager
  ],
})
export class ProfileModule { }
