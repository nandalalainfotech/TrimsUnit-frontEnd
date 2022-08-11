import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import * as saveAs from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BreakdownSettingManager } from 'src/app/shared/services/restcontroller/bizservice/breakdown.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Breakdown001mb } from 'src/app/shared/services/restcontroller/entities/Breakdown001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-breakdown-setting',
  templateUrl: './breakdown-setting.component.html',
  styleUrls: ['./breakdown-setting.component.css']
})
export class BreakdownSettingComponent implements OnInit {

  public gridOptions: GridOptions | any;
  frameworkComponents: any;
  breakdownForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  sslno: number | any;
  name: string = "";
  details: string = "";
  // status: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  statussets: Status001mb[] = [];
  breakdownSettings: Breakdown001mb[] = [];
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private breakdownSettingManager: BreakdownSettingManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    private statusSettingManager: StatusSettingManager,
    private httpClient: HttpClient, private http: HttpClient

  ) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();

    this.breakdownForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      // status: ['', Validators.required],
      sslno: ['', Validators.required],
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);

    });

    this.loadData();
  }



  loadData() {
    this.breakdownSettingManager.allbreakdown().subscribe(response => {
      this.breakdownSettings = deserialize<Breakdown001mb[]>(Breakdown001mb, response);
      if (this.breakdownSettings.length > 0) {
        this.gridOptions?.api?.setRowData(this.breakdownSettings);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.breakdownForm.controls; }

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
        headerName: 'BreakDown Name',
        field: 'name',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setMachineCode.bind(this)
      },
      {
        headerName: 'Details',
        field: 'details',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true


      },
      {
        headerName: 'Status',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setStatus.bind(this)
      },
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

  setStatus(params: any): string {
    return params.data.sslno2 ? params.data.sslno2.name : null;
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.breakdownForm.patchValue({
      'name': params.data.name,
      'details': params.data.details,
      'sslno': params.data.sslno,


    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Breakdown Setting";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.breakdownSettingManager.breakdowndelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.breakdownSettings.length; i++) {
            if (this.breakdownSettings[i].slNo == params.data.slNo) {
              this.breakdownSettings?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Breakdown Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Breakdown Setting";
    modalRef.componentInstance.details = params.data;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onBreakdownFormClick(event: any, breakdownForm: any) {

    this.markFormGroupTouched(this.breakdownForm);
    this.submitted = true;
    if (this.breakdownForm.invalid) {
      return;
    }
    let breakdown001mb = new Breakdown001mb();
    breakdown001mb.name = this.f.name.value ? this.f.name.value : "";
    breakdown001mb.details = this.f.details.value ? this.f.details.value : "";
    breakdown001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
    if (this.slNo) {
      breakdown001mb.slNo = this.slNo;
      breakdown001mb.unitdepartslNo = this.unitdepartslNo;
      breakdown001mb.insertUser = this.insertUser;
      breakdown001mb.insertDatetime = this.insertDatetime;
      breakdown001mb.updatedUser = this.authManager.getcurrentUser.username;
      breakdown001mb.updatedDatetime = new Date();
      this.breakdownSettingManager.breakdownupdate(breakdown001mb).subscribe((response) => {
        this.calloutService.showSuccess("Breakdown Details Updated Successfully");
        this.loadData();
        this.breakdownForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    }
    else {
      breakdown001mb.unitdepartslNo= this.user.unitdepartslNo;
      breakdown001mb.insertUser = this.authManager.getcurrentUser.username;
      breakdown001mb.insertDatetime = new Date();
      this.breakdownSettingManager.breakdowntsave(breakdown001mb).subscribe((response) => {
        this.calloutService.showSuccess("Breakdown Details Saved Successfully");
        this.loadData();
        this.breakdownForm.reset();
        this.submitted = false;
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.breakdownForm.reset();
  }

  onViewClick() {
    this.breakdownSettingManager.breakPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.breakdownSettingManager.breakPdf().subscribe((response) => {
      saveAs(response, "BreakDown-Details");
    })
  }

  onGenerateExcelReport() {
    this.breakdownSettingManager.breakExcel().subscribe((response) => {
     saveAs(response, "BreakDown-Details");
    
    });
  }

}
