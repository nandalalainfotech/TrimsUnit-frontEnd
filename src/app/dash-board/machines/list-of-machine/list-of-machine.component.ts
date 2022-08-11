import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
@Component({
  selector: 'app-list-of-machine',
  templateUrl: './list-of-machine.component.html',
  styleUrls: ['./list-of-machine.component.css']
})
export class ListOfMachineComponent implements OnInit {
 constructor(){
   
 }
  ngOnInit(): void {
   
  }
  
}
