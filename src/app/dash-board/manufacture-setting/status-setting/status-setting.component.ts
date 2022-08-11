import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as saveAs from 'file-saver';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-status-setting',
  templateUrl: './status-setting.component.html',
  styleUrls: ['./status-setting.component.css']
})
export class StatusSettingComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  StatusForm: FormGroup | any;
  slNo: number | any;
  codeGroup: number | any;
  name: string = "";
  status: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  submitted = false;
  statussets: Status001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(private statusSettingManager: StatusSettingManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    this.StatusForm = this.formBuilder.group({
      codeGroup: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
      if (this.statussets.length > 0) {
        this.gridOptions?.api?.setRowData(this.statussets);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.StatusForm.controls; }

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
        headerName: 'Code Group',
        field: 'codeGroup',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        cellClass: "grid-cell-centered",
        suppressSizeToFit: true
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
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

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.StatusForm.patchValue({
      'codeGroup': params.data.codeGroup,
      'name': params.data.name,
      'status': params.data.status,
    });
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Status Setting";
    modalRef.componentInstance.details = params.data
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Status Setting";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.statusSettingManager.statusdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.statussets.length; i++) {
            if (this.statussets[i].slNo == params.data.slNo) {
              this.statussets?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.calloutService.showSuccess("Status Details Removed Successfully");
        });
      }
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onStatusClick(event: any, StatusForm: any) {
    this.markFormGroupTouched(this.StatusForm);
    this.submitted = true;
    if (this.StatusForm.invalid) {
      return;
    }
   console.log("StatusForm--->", StatusForm);
   
    
    let status001mb = new Status001mb();
    status001mb.codeGroup = this.f.codeGroup.value ? this.f.codeGroup.value : "";
    status001mb.name = this.f.name.value ? this.f.name.value : "";
    status001mb.status = this.f.status.value ? this.f.status.value : "";
    if (this.slNo) {
      status001mb.slNo = this.slNo;
      status001mb.unitdepartslNo = this.unitdepartslNo;
      status001mb.insertUser = this.insertUser;
      status001mb.insertDatetime = this.insertDatetime;
      status001mb.updatedUser = this.authManager.getcurrentUser.username;
      status001mb.updatedDatetime = new Date();
      this.statusSettingManager.statusupdate(status001mb).subscribe((response) => {
        this.calloutService.showSuccess("Status Details Updated Successfully");
        let statusResp = deserialize<Status001mb>(Status001mb, response);
        for (let status of this.statussets) {
          if (status.slNo == statusResp.slNo) {
            status.codeGroup = statusResp.codeGroup;
            status.name = statusResp.name;
            status.status = statusResp.status;
            status001mb.unitdepartslNo = this.unitdepartslNo;
            status.insertUser = this.insertUser;
            status.insertDatetime = this.insertDatetime;
            status.updatedUser = this.authManager.getcurrentUser.username;
            status.updatedDatetime = new Date();
          }
        }
        this.gridOptions.api.setRowData(this.statussets);
        this.gridOptions.api.refreshView();
        this.gridOptions.api.deselectAll();
        this.StatusForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      status001mb.unitdepartslNo= this.user.unitdepartslNo;
      status001mb.insertUser = this.authManager.getcurrentUser.username;
      status001mb.insertDatetime = new Date();
      this.statusSettingManager.statussave(status001mb).subscribe((response) => {
        this.calloutService.showSuccess("Status Details Saved Successfully");
        let statusResp = deserialize<Status001mb>(Status001mb, response);
        this.statussets?.push(statusResp);
        const newItems = [JSON.parse(JSON.stringify(statusResp))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.gridOptions.api.deselectAll();
        this.StatusForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.StatusForm.reset();
  }


  onViewClick() {
    this.statusSettingManager.statusPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.statusSettingManager.statusPdf().subscribe((response) => {
      saveAs(response, "Status-Details");
    })
  }

  onGenerateExcelReport() {
    this.statusSettingManager.statusExcel().subscribe((response) => {
     saveAs(response, "Status-Details");
      });
  }
}
