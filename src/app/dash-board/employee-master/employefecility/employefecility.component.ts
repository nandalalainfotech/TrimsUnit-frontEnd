import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeFecilityManager } from 'src/app/shared/services/restcontroller/bizservice/employef.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Employef001mb } from 'src/app/shared/services/restcontroller/entities/employef001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-employefecility',
  templateUrl: './employefecility.component.html',
  styleUrls: ['./employefecility.component.css']
})
export class EmployefecilityComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  listOfEmployeForm: FormGroup | any;
  slNo: number | any;
  submitted = false;
  faNo: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  EmployeSetting: Employef001mb[] = [];
  employef001mb?: Employef001mb;
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private calloutService: CalloutService,
    private employeFecilityManager: EmployeFecilityManager,
    private dataSharedService: DataSharedService,
    private authManager: AuthManager,
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
    this.listOfEmployeForm = this.formBuilder.group({
      faNo: ['', Validators.required],
    })

    this.loadData();
  }
  
  loadData() {
    this.employeFecilityManager.allemployef().subscribe(response => {
    this.EmployeSetting = deserialize<Employef001mb[]>(Employef001mb, response);
      if (this.EmployeSetting.length > 0) {
        this.gridOptions?.api?.setRowData(this.EmployeSetting);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.listOfEmployeForm.controls; }

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
        headerName: 'FirstAid Box No',
        field: 'faNo',
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
    this.listOfEmployeForm.patchValue({
      'faNo': params.data.faNo,
    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Employee Facility";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.employeFecilityManager.employefdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.EmployeSetting.length; i++) {
            if (this.EmployeSetting[i].slNo == params.data.slNo) {
              this.EmployeSetting?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.calloutService.showSuccess("Employee Facility Removed Successfully");
        });
      }
    })
  }
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Employee Facility";
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

  onEmployesClick(event: any, listOfEmployeForm: any) {
    this.markFormGroupTouched(this.listOfEmployeForm);
    this.submitted = true;
    if (this.listOfEmployeForm.invalid) {
      return;
    }
    let employef001mb = new Employef001mb();
    employef001mb.faNo = this.f.faNo.value ? this.f.faNo.value : "";
    if (this.slNo) {
      employef001mb.slNo = this.slNo;
      employef001mb.unitdepartslNo = this.unitdepartslNo;
      employef001mb.insertUser = this.insertUser;
      employef001mb.insertDatetime = this.insertDatetime;
      employef001mb.updatedUser = this.authManager.getcurrentUser.username;
      employef001mb.updatedDatetime = new Date();
      this.employeFecilityManager.employefupdate(employef001mb).subscribe((response) => {
        this.calloutService.showSuccess("Employee Facility Updated Successfully");
        this.loadData();
        this.listOfEmployeForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      employef001mb.unitdepartslNo = this.user.unitdepartslNo;
      employef001mb.insertUser = this.authManager.getcurrentUser.username;
      employef001mb.insertDatetime = new Date();
      this.employeFecilityManager.employefsave(employef001mb).subscribe((response) => {
        this.calloutService.showSuccess("Employee Facility Saved Successfully");
        this.loadData();
        this.listOfEmployeForm.reset();
        this.submitted = false;
      });
    }

  }


  onReset() {
    this.submitted = false;
    this.listOfEmployeForm.reset();
  }

  onViewClick() {
    this.employeFecilityManager.empfclPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.employeFecilityManager.empfclPdf().subscribe((response) => {
      if (this.employef001mb) {
        saveAs(response);
      } else {
        saveAs(response, "Employee-Facility");
      }
    })
  }

  onGenerateExcelReport() {
    this.employeFecilityManager.empfclExcel().subscribe((response) => {
     saveAs(response, "Employee-Facility");
      });
  }

}
