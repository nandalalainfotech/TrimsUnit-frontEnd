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
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
  selector: 'app-machine-setting',
  templateUrl: './machine-setting.component.html',
  styleUrls: ['./machine-setting.component.css']
})

export class MachineSettingComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  listOfMachinesForm: FormGroup | any;
  slNo: number | any;
  sslno: number | any;
  submitted = false;
  mcode: string = "";
  mname: string = "";
  year: string = "";
  capacity: string = "";
  mtype: string = "";
  make: string = "";
  location: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  machineSetting: Machine001mb[] = [];
  machine001mb?: Machine001mb;
  status001mbs?: Status001mb[] = [];
  statussets: Status001mb[] = [];
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(private router: Router, private machineSettingManager: MachineSettingManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private authManger: AuthManager,
    private statusSettingManager: StatusSettingManager,
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
    this.listOfMachinesForm = this.formBuilder.group({
      mcode: ['', Validators.required],
      mname: ['', Validators.required],
      sslno: ['', Validators.required],
      year: ['', Validators.required],
      capacity: ['', Validators.required],
      mtype: ['', Validators.required],
      make: ['', Validators.required],
      location: ['', Validators.required],
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });

    this.loadData();
  }


  loadData() {
    this.machineSettingManager.allmachine().subscribe(response => {
      this.machineSetting = deserialize<Machine001mb[]>(Machine001mb, response);
      if (this.machineSetting.length > 0) {
        this.gridOptions?.api?.setRowData(this.machineSetting);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.listOfMachinesForm.controls; }



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
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Machine Code',
        field: 'mcode',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Machine Name',
        field: 'mname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Year of Purchase',
        field: 'year',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        cellClass: "grid-cell-centered",
        suppressSizeToFit: true
      },
      {
        headerName: 'Capacity',
        field: 'capacity',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Type/Size',
        field: 'mtype',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Make',
        field: 'make',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Location',
        field: 'location',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Status',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setStatusName.bind(this)
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
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
        // flex: 1,
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
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }

  setStatusName(params: any): string {
    return params.data.sslno2 ? params.data.sslno2.name : null;
  }

  onEditButtonClick(params: any) {
    // params.colDef.cellRendererParams.isActive = false
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.listOfMachinesForm.patchValue({
      'sslno': params.data.sslno,
      'mcode': params.data.mcode,
      'mname': params.data.mname,
      'year': params.data.year,
      'capacity': params.data.capacity,
      'mtype': params.data.mtype,
      'make': params.data.make,
      'location': params.data.location,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Machine Settings";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.machineSettingManager.machinedelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.machineSetting.length; i++) {
            if (this.machineSetting[i].slNo == params.data.slNo) {
              this.machineSetting?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.calloutService.showSuccess("Machine Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Machine Settings";
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

  onMachineClick(event: any, listOfMachinesForm: any) {
    this.markFormGroupTouched(this.listOfMachinesForm);
    this.submitted = true;
    if (this.listOfMachinesForm.invalid) {
      return;
    }
    let machine001mb = new Machine001mb();
    machine001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
    machine001mb.mcode = this.f.mcode.value ? this.f.mcode.value : "";
    machine001mb.mname = this.f.mname.value ? this.f.mname.value : "";
    machine001mb.year = this.f.year.value ? this.f.year.value : "";
    machine001mb.capacity = this.f.capacity.value ? this.f.capacity.value : "";
    machine001mb.mtype = this.f.mtype.value ? this.f.mtype.value : "";
    machine001mb.make = this.f.make.value ? this.f.make.value : "";
    machine001mb.location = this.f.location.value ? this.f.location.value : "";
    if (this.slNo) {
      machine001mb.slNo = this.slNo;
      machine001mb.unitdepartslNo = this.unitdepartslNo;
      machine001mb.insertUser = this.insertUser;
      machine001mb.insertDatetime = this.insertDatetime;
      machine001mb.updatedUser = this.authManager.getcurrentUser.username;
      machine001mb.updatedDatetime = new Date();
      this.machineSettingManager.machineupdate(machine001mb).subscribe((response) => {
        this.calloutService.showSuccess("Machine Details Updated Successfully");
        this.loadData();
        this.listOfMachinesForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      machine001mb.unitdepartslNo = this.user.unitdepartslNo;
      machine001mb.insertUser = this.authManager.getcurrentUser.username;
      machine001mb.insertDatetime = new Date();
      this.machineSettingManager.machinesave(machine001mb).subscribe((response) => {

        this.calloutService.showSuccess("Machine Details Saved Successfully");
        this.loadData();
        this.listOfMachinesForm.reset();
        this.submitted = false;
      });
    }

  }


  onReset() {
    this.submitted = false;
    this.listOfMachinesForm.reset();
  }
  onViewClick() {
    this.machineSettingManager.machinePdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.machineSettingManager.machinePdf().subscribe((response) => {
      saveAs(response, "Machine-Details");
    })
  }

  onGenerateExcelReport() {
    this.machineSettingManager.machineExcel().subscribe((response) => {
      saveAs(response, "Machine-Details");
    });
  }

}
