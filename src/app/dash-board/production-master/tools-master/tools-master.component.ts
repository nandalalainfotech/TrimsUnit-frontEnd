import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { ToolManager } from 'src/app/shared/services/restcontroller/bizservice/tool.service';
import { Tool001mb } from 'src/app/shared/services/restcontroller/entities/tool001mb';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-tools-master',
  templateUrl: './tools-master.component.html',
  styleUrls: ['./tools-master.component.css']
})
export class ToolsMasterComponent implements OnInit {
  
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  ToolForm: FormGroup | any;

  slNo: number | any;
  submitted = false;
  pdno: number | any;
  fix1: string = "";
  fix2: string = "";
  fix3: string = "";
  fix4: string = "";
  fix5: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  toolSetting: Tool001mb[] = [];
  tool001mb?: Tool001mb;
  user?: Login001mb | any;
    unitdepartslNo: number | any;


  constructor(
    private router: Router, 
    private toolManager: ToolManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private authManger: AuthManager,
    // private statusSettingManager: StatusSettingManager,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      //  linkRenderer: LinkRendererComponent,
      iconRenderer: IconRendererComponent
    }

  }


  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    this.ToolForm = this.formBuilder.group({     

      
      pdno: ['', Validators.required],
      fix1: ['', Validators.required],
      fix2: ['', Validators.required],
      fix3: ['', Validators.required],
      fix4: ['', Validators.required],
      fix5: ['', Validators.required],

    })

    // this.statusSettingManager.allstatus().subscribe(response => {
    //   this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    // });

    this.loadData();

  }
    

  loadData() {
    this.toolManager.alltool().subscribe(response => {
      this.toolSetting = deserialize<Tool001mb[]>(Tool001mb, response);
      if (this.toolSetting.length > 0) {
        this.gridOptions?.api?.setRowData(this.toolSetting);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.ToolForm.controls; }


  
  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'Sl_No',
        field: 'slNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Prouct No',
        field: 'pdno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Fixture1',
        field: 'fix1',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Fixture2',
        field: 'fix2',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Fixture3',
        field: 'fix3',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Fixture4',
        field: 'fix4',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Fixture5',
        field: 'fix5',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

     
      // {
      //   headerName: 'Status',
      //   width: 200,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      //   valueGetter: this.setStatusName.bind(this)
      // },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }

  // setStatusName(params: any): string {
  //   return params.data.sslno2 ? params.data.sslno2.name : null;
  // }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.ToolForm.patchValue({
      'pdno': params.data.pdno,
      'fix1': params.data.fix1,
      'fix2': params.data.fix2,
      'fix3': params.data.fix3,
      'fix4': params.data.fix4,
      'fix5': params.data.fix5,


    });
    
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Tool Settings";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.toolManager.toolDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.toolSetting.length; i++) {
            if (this.toolSetting[i].slNo == params.data.slNo) {
              this.toolSetting?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.calloutService.showSuccess("Tool Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Tool Settings";
    modalRef.componentInstance.details = params.data
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ontoolClick(event: any, ToolForm: any) {
    this.markFormGroupTouched(this.ToolForm);
    this.submitted = true;
    if (this.ToolForm.invalid) {
      return;
    }
    let tool001mb = new Tool001mb();

    tool001mb.pdno = this.f.pdno.value ? this.f.pdno.value : "";
    tool001mb.fix1 = this.f.fix1.value ? this.f.fix1.value : "";
    tool001mb.fix2 = this.f.fix2.value ? this.f.fix2.value : "";
    tool001mb.fix3 = this.f.fix3.value ? this.f.fix3.value : "";
    tool001mb.fix4 = this.f.fix4.value ? this.f.fix4.value : "";
    tool001mb.fix5 = this.f.fix5.value ? this.f.fix5.value : "";


    
    if (this.slNo) {
      tool001mb.slNo = this.slNo;
      tool001mb.unitdepartslNo = this.unitdepartslNo;
      tool001mb.insertUser = this.insertUser;
      tool001mb.insertDatetime = this.insertDatetime;
      tool001mb.updatedUser = this.authManager.getcurrentUser.username;
      tool001mb.updatedDatetime = new Date();
      this.toolManager.toolUpdate(tool001mb).subscribe((response) => {
        this.calloutService.showSuccess("Tools Details Updated Successfully");
        this.loadData();
        this.ToolForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      tool001mb.unitdepartslNo= this.user.unitdepartslNo;
      tool001mb.insertUser = this.authManager.getcurrentUser.username;
      tool001mb.insertDatetime = new Date();
      this.toolManager.toolSave(tool001mb).subscribe((response) => {

        this.calloutService.showSuccess("Tools Details Saved Successfully");
        this.loadData();
        this.ToolForm.reset();
        this.submitted = false;
      });
    }

  }


  onReset() {
    this.submitted = false;
    this.ToolForm.reset();
  }

  onViewClick() {
    this.toolManager.toolPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.toolManager.toolPdf().subscribe((response) => {
      if (this.tool001mb) {
        saveAs(response);
      } else {
        saveAs(response, "Tools-Details");
      }
    })
  }

  onGenerateExcelReport() {
    this.toolManager.toolExcel().subscribe((response) => {
     saveAs(response, "Tools-Details");
      });
  }

}
  


