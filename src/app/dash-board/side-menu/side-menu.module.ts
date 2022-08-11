import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFilterModule } from 'src/app/shared/pipe/SearchFilterModule';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        MatMenuModule,
        NgbModule,
        BrowserAnimationsModule,
        SearchFilterModule
    ],
    exports: [],
    providers: [MachineSettingManager],
    bootstrap: []
})
export class SideMenuModule { }
