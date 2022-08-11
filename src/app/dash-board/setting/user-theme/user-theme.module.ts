import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserThemeRoutingModule } from './user-theme-routing.module';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { UserThemeComponent } from './user-theme.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    UserThemeComponent
  ],
  imports: [
    CommonModule,
    UserThemeRoutingModule,
    BreadcrumbModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSidenavModule,
    
  
  ]
})
export class UserThemeModule { }
