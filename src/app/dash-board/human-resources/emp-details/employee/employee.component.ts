import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/employeedetail.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { StatutoryPlanManager } from 'src/app/shared/services/restcontroller/bizservice/statutory.service';
import { Emp001mb } from 'src/app/shared/services/restcontroller/entities/employeedetails.mb';
import { Statutory001wb } from 'src/app/shared/services/restcontroller/entities/statutory001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public gridOptions: GridOptions | any;
  statutoryForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  ecode: string = "";
  ename: string = "";
  esno: string = "";
  pfno: string = "";
  insurno: string = "";
  mediclno: string = "";
  escheme: string = "";
  pscheme: string = "";
  inscheme: string = "";
  mscheme: string = "";
  esstartdate: Date | any;
  esenddate: Date | any;
  pfstartdate: Date | any;
  pfenddate: Date | any;
  instartdate: Date | any;
  insenddate: Date | any;
  mstartdate: Date | any;
  menddate: Date | any;
  emp001mb?: Emp001mb;
  currentemp001mb: Emp001mb[] = [];
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  statutoryPlan: Statutory001wb[] = [];
  statutory001wb?: Statutory001wb;
  selectedFile: any;
  frameworkComponents: any;
  user?: Login001mb | any;
    unitdepartslNo: number | any;
    
  constructor(
    private http: HttpClient,
    private datepipe: DatePipe,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private statutoryPlanManager: StatutoryPlanManager,
    private calloutService: CalloutService,
    private employeeDetailsManager: EmployeeDetailsManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.createDataGrid001();
    this.loadData();
    this.statutoryForm = this.formBuilder.group({
      ecode:  ['', Validators.required],
      ename:  ['', Validators.required],
      esno: ['', Validators.required],
      pfno: ['', Validators.required],
      insurno: ['', Validators.required],
      mediclno: ['', Validators.required],
      escheme: ['', Validators.required],
      pscheme: ['', Validators.required],
      inscheme: ['', Validators.required],
      mscheme: ['', Validators.required],
      esstartdate: ['', Validators.required],
      esenddate: ['', Validators.required],
      pfstartdate: ['', Validators.required],
      pfenddate: ['', Validators.required],
      instartdate: ['', Validators.required],
      insenddate: ['', Validators.required],
      mstartdate: ['', Validators.required],
      menddate: ['', Validators.required],
    });



    this.employeeDetailsManager.allemployee().subscribe(response => {
      this.currentemp001mb = deserialize<Emp001mb[]>(Emp001mb, response);
      });

  }


  loadData() {
    this.statutoryPlanManager. allstuplan().subscribe((response: any) => {
      this.statutoryPlan = deserialize<Statutory001wb[]>(Statutory001wb, response);
      if (this.statutoryPlan.length > 0) {
        this.gridOptions?.api?.setRowData(this.statutoryPlan);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.statutoryForm.controls }
  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'Sl No',
        field: 'slNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Employee Code',
        field: 'ecode',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setEmployeCode.bind(this)
      },
      {
        headerName: 'Employee Name',
        field: 'ename',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setEmployeName.bind(this)
      },
      {
        headerName: 'ESI No',
        field: 'esno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Esi Scheme',
        field: 'escheme',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'ESI Start Date',
        field: 'esstartdate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.esstartdate ? this.datepipe.transform(params.data.esstartdate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'ESI End Date',
        field: 'esenddate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.esenddate ? this.datepipe.transform(params.data.esenddate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'PF No',
        field: 'pfno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Pf Scheme',
        field: 'pscheme',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Pf Strat Date',
        field: 'pfstartdate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.pfstartdate ? this.datepipe.transform(params.data.pfstartdate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Pf End Date',
        field: 'pfenddate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.pfenddate ? this.datepipe.transform(params.data.pfenddate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Insurence No',
        field: 'insurno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Insurence Scheme',
        field: 'inscheme',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Insurence Strat Date',
        field: 'instartdate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.instartdate ? this.datepipe.transform(params.data.instartdate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Insurence End Date',
        field: 'insenddate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.insenddate ? this.datepipe.transform(params.data.insenddate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Mediclaime No',
        field: 'mediclno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },



      {
        headerName: 'Mediclaime Scheme',
        field: 'mscheme',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      //<------------------------------------------------------->





      {
        headerName: 'Medi Start Date',
        field: 'mstartdate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.mstartdate ? this.datepipe.transform(params.data.mstartdate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Medi End Date',
        field: 'menddate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.menddate ? this.datepipe.transform(params.data.menddate, 'dd-MM-yyyy') : '';
        }
      },

      //<----------------------------------------------------------------------------->     
      {
        headerName: 'Bank Name',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setbank.bind(this)

      },
      {
        headerName: 'A/C Holder Name',
        field: 'acholdername',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'A/C Number',
        field: 'accno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'IFSC code',
        field: 'ifsccode',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      //<----------------------------------------------------------------------------->     
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



  setbank(params: any): string {
    return params.data.bslno2 ? params.data.bslno2.bankname : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Statutory Plan";
    modalRef.componentInstance.details = params.data
  }
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.statutoryForm.patchValue({
    'ecode': params.data.ecode,
      'ename': params.data.ename,
      'esno': params.data.esno,
      'pfno': params.data.pfno,
      'insurno': params.data.insurno,
      'mediclno': params.data.mediclno,
      'escheme': params.data.escheme,
      'pscheme': params.data.pscheme,
      'inscheme': params.data.inscheme,
      'mscheme': params.data.mscheme,

      'esstartdate': new Date(params.data.esstartdate),
      'esenddate': new Date(params.data.esenddate),
      'pfstartdate': new Date(params.data.pfstartdate),
      'pfenddate': new Date(params.data.pfenddate),
      'instartdate': new Date(params.data.instartdate),
      'insenddate': new Date(params.data.insenddate),
      'mstartdate': new Date(params.data.mstartdate),
      'menddate': new Date(params.data.menddate),


    });

  }
  setEmployeName(params: any): string {
    return params.data.emslno2 ? params.data.emslno2.empname : null;
  }
  setEmployeCode(params: any): string {
    return params.data.emslno2 ? params.data.emslno2.empcode : null;
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Statutory Plan";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.statutoryPlanManager.stuplanDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.statutoryPlan.length; i++) {
            if (this.statutoryPlan[i].slNo == params.data.slNo) {
              this.statutoryPlan?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Statutory Plan Removed Successfully");
        });
      }
    });
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onstatutoryClick(event: any, statutoryForm: any) {
    this.markFormGroupTouched(this.statutoryForm);
    this.submitted = true;
    if (this.statutoryForm.invalid) {
      return;
    }

    let statutory001wb = new Statutory001wb();
    statutory001wb.ecode = this.f.ecode.value ? this.f.ecode.value : "";
    statutory001wb.ename = this.f.ename.value ? this.f.ename.value : "";
    statutory001wb.esno = this.f.esno.value ? this.f.esno.value : "";
    statutory001wb.pfno = this.f.pfno.value ? this.f.pfno.value : "";
    statutory001wb.insurno = this.f.insurno.value ? this.f.insurno.value : "";
    statutory001wb.mediclno = this.f.mediclno.value ? this.f.mediclno.value : "";
    statutory001wb.escheme = this.f.escheme.value ? this.f.escheme.value : "";
    statutory001wb.pscheme = this.f.pscheme.value ? this.f.pscheme.value : "";
    statutory001wb.inscheme = this.f.inscheme.value ? this.f.inscheme.value : "";
    statutory001wb.mscheme = this.f.mscheme.value ? this.f.mscheme.value : "";
    statutory001wb.esstartdate = new Date(this.f.esstartdate.value);
    statutory001wb.esenddate = new Date(this.f.esenddate.value);
    statutory001wb.pfstartdate = new Date(this.f.pfstartdate.value);
    statutory001wb.pfenddate = new Date(this.f.pfenddate.value);
    statutory001wb.instartdate = new Date(this.f.instartdate.value);
    statutory001wb.insenddate = new Date(this.f.insenddate.value);
    statutory001wb.mstartdate = new Date(this.f.mstartdate.value);
    statutory001wb.menddate = new Date(this.f.menddate.value);
    if (this.slNo) {
      statutory001wb.slNo = this.slNo;
      statutory001wb.unitdepartslNo = this.unitdepartslNo;
      statutory001wb.insertUser = this.insertUser;
      statutory001wb.insertDatetime = this.insertDatetime;
      statutory001wb.updatedUser = this.authManager.getcurrentUser.username;
      statutory001wb.updatedDatetime = new Date();
      this.statutoryPlanManager.stuplanUpdate(statutory001wb).subscribe((response) => {
        this.calloutService.showSuccess("Statutory Plan Updated Successfully");
        this.loadData();
        this.statutoryForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      statutory001wb.unitdepartslNo = this.user.unitdepartslNo;
      statutory001wb.insertUser = this.authManager.getcurrentUser.username;
      statutory001wb.insertDatetime = new Date();
      this.statutoryPlanManager.stuplansave(statutory001wb).subscribe((response) => {

        this.calloutService.showSuccess("Statutory Plan Saved Successfully");
        this.loadData();
        this.statutoryForm.reset();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.statutoryForm.reset();
  }


  onViewClick() {
    this.statutoryPlanManager.statoryPdf().subscribe((response) => {
      
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.statutoryPlanManager.statoryPdf().subscribe((response) => {      
      if (this.emp001mb) {
        saveAs(response);
      } else {
        saveAs(response, "Statutory-Details");
      }

    })
  }

  onGenerateExcelReport() {
    this.statutoryPlanManager.statoryExcel().subscribe((response) => {
      saveAs(response, "Statutory-Details");
    })
  }




}




