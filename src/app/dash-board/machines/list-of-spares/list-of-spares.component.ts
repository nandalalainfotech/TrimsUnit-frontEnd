import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { get } from 'jquery';
import { Observable } from 'rxjs';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
@Component({
  selector: 'app-list-of-spares',
  templateUrl: './list-of-spares.component.html',
  styleUrls: ['./list-of-spares.component.css']
})
export class ListOfSparesComponent implements OnInit {
  constructor(){
    
  }
  ngOnInit(): void {
  
  }
  
}


