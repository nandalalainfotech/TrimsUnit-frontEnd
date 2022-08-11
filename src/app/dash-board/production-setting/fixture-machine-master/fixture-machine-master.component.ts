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
import { FixtureSettingManager } from 'src/app/shared/services/restcontroller/bizservice/fixturesetting.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Fixture001mb } from 'src/app/shared/services/restcontroller/entities/Fixture001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
  selector: 'app-fixture-machine-master',
  templateUrl: './fixture-machine-master.component.html',
  styleUrls: ['./fixture-machine-master.component.css']
})
export class FixtureMachineMasterComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  listOfFixtureForm: FormGroup | any;
  slNo: number | any;
  sslno: number | any;
  submitted = false;
  fcode: string = "";
  fname: string = "";
  fyear: string = "";
  fcapacity: string = "";
  ftype: string = "";
  fmake: string = "";
  flocation: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  fixtureSetting: Fixture001mb[] = [];
  fixture001mb?: Fixture001mb;
  status001mbs?: Status001mb[] = [];
  statussets: Status001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;


  constructor(private router: Router, private fixtureSettingManager: FixtureSettingManager,
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
    this.listOfFixtureForm = this.formBuilder.group({
      fcode: ['', Validators.required],
      fname: ['', Validators.required],
      sslno: ['', Validators.required],
      fyear: ['', Validators.required],
      fcapacity: ['', Validators.required],
      ftype: ['', Validators.required],
      fmake: ['', Validators.required],
      flocation: ['', Validators.required],
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });

    this.loadData();
  }


  loadData() {
    this.fixtureSettingManager.allfixture().subscribe(response => {
      this.fixtureSetting = deserialize<Fixture001mb[]>(Fixture001mb, response);
      if (this.fixtureSetting.length > 0) {
        this.gridOptions?.api?.setRowData(this.fixtureSetting);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.listOfFixtureForm.controls; }



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
        headerName: 'Fixture Code',
        field: 'fcode',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Fixture Name',
        field: 'fname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Year of Purchase',
        field: 'fyear',
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
        field: 'fcapacity',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Type/Size',
        field: 'ftype',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Make',
        field: 'fmake',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Location',
        field: 'flocation',
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
    this.listOfFixtureForm.patchValue({
      'sslno': params.data.sslno,
      'fcode': params.data.fcode,
      'fname': params.data.fname,
      'fyear': params.data.fyear,
      'fcapacity': params.data.fcapacity,
      'ftype': params.data.ftype,
      'fmake': params.data.fmake,
      'flocation': params.data.flocation,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Machine Settings";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.fixtureSettingManager.fixturedelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.fixtureSetting.length; i++) {
            if (this.fixtureSetting[i].slNo == params.data.slNo) {
              this.fixtureSetting?.splice(i, 1);
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

  onFixtureClick(event: any, listOfFixtureForm: any) {
    this.markFormGroupTouched(this.listOfFixtureForm);
    this.submitted = true;
    if (this.listOfFixtureForm.invalid) {
      return;
    }
    let fixture001mb = new Fixture001mb();
    fixture001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
    fixture001mb.fcode = this.f.fcode.value ? this.f.fcode.value : "";
    fixture001mb.fname = this.f.fname.value ? this.f.fname.value : "";
    fixture001mb.fyear = this.f.fyear.value ? this.f.fyear.value : "";
    fixture001mb.fcapacity = this.f.fcapacity.value ? this.f.fcapacity.value : "";
    fixture001mb.ftype = this.f.ftype.value ? this.f.ftype.value : "";
    fixture001mb.fmake = this.f.fmake.value ? this.f.fmake.value : "";
    fixture001mb.flocation = this.f.flocation.value ? this.f.flocation.value : "";
    if (this.slNo) {
      fixture001mb.slNo = this.slNo;
      fixture001mb.unitdepartslNo = this.unitdepartslNo;
      fixture001mb.insertUser = this.insertUser;
      fixture001mb.insertDatetime = this.insertDatetime;
      fixture001mb.updatedUser = this.authManager.getcurrentUser.username;
      fixture001mb.updatedDatetime = new Date();
      this.fixtureSettingManager.fixtureupdate(fixture001mb).subscribe((response) => {
        this.calloutService.showSuccess("Machine Details Updated Successfully");
        this.loadData();
        this.listOfFixtureForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      fixture001mb.unitdepartslNo= this.user.unitdepartslNo;
      fixture001mb.insertUser = this.authManager.getcurrentUser.username;
      fixture001mb.insertDatetime = new Date();
      this.fixtureSettingManager.fixturesave(fixture001mb).subscribe((response) => {

        this.calloutService.showSuccess("Machine Details Saved Successfully");
        this.loadData();
        this.listOfFixtureForm.reset();
        this.submitted = false;
      });
    }

  }


  onReset() {
    this.submitted = false;
    this.listOfFixtureForm.reset();
  }
  onViewClick() {
    this.fixtureSettingManager.machinePdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.fixtureSettingManager.machinePdf().subscribe((response) => {
      saveAs(response, "Machine-Details");
    })
  }

  onGenerateExcelReport() {
    this.fixtureSettingManager.machineExcel().subscribe((response) => {
     saveAs(response, "Machine-Details");
      });
  }

}

