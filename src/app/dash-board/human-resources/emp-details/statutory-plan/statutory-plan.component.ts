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
import { Bank001mb } from 'src/app/shared/services/restcontroller/entities/bank001mb';
import { BankNameManager } from 'src/app/shared/services/restcontroller/bizservice/bank.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
 selector: 'app-statutory-plan',
  templateUrl: './statutory-plan.component.html',
  styleUrls: ['./statutory-plan.component.css']
})
export class StatutoryPlanComponent implements OnInit {
  public gridOptions: GridOptions | any;
  statutoryForm: FormGroup | any;
  submitted = false;
  slNo:number | any;
  bslno:number | any;
  bankname:string = "";
  ecode: string = "";
  ename: string = "";
  esno: string = "";
  escheckbox:string = "";
  inscheckbox:string = "";
  pfcheckbox:string = "";
  medicheckbox:string = "";
  bankcheckbox:string = "";
  acholdername:string = "";
  accno:string = "";
  ifsccode:string = "";
  pfno: string = "";
  insurno: string = "";
  mediclno: string = "";
  escheme:string = "";
  pscheme: string = "";
  inscheme: string = "";
  mscheme: string = "";
  esstartdate: Date | any;
  esenddate:Date | any;
  pfstartdate: Date | any;
  pfenddate:Date | any;
  instartdate: Date | any;
  insenddate: Date | any;
  mstartdate:Date | any;
  menddate:Date | any;
  bank001mb?: Bank001mb;
  currentbank001mb: Bank001mb[] = [];
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  // minDate = new Date();
  // maxDate = new Date();
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
    private bankNameManager: BankNameManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }




  setDisableESI() {
    this.statutoryForm.get('esno').disable();
    this.statutoryForm.get('escheme').disable();
    this.statutoryForm.get('esstartdate').disable();
    this.statutoryForm.get('esenddate').disable();
  }

  setEnableESI() {
    this.statutoryForm.get('esno').enable();
    this.statutoryForm.get('escheme').enable();
    this.statutoryForm.get('esstartdate').enable();
    this.statutoryForm.get('esenddate').enable();
  }


  setDisablePF() {
    this.statutoryForm.get('pfno').disable();
    this.statutoryForm.get('pscheme').disable();
    this.statutoryForm.get('pfstartdate').disable();
    this.statutoryForm.get('pfenddate').disable();
  }

  setEnablePF() {
    this.statutoryForm.get('pfno').enable();
    this.statutoryForm.get('pscheme').enable();
    this.statutoryForm.get('pfstartdate').enable();
    this.statutoryForm.get('pfenddate').enable();
  }


  setDisableINS() {
    this.statutoryForm.get('insurno').disable();
    this.statutoryForm.get('inscheme').disable();
    this.statutoryForm.get('instartdate').disable();
    this.statutoryForm.get('insenddate').disable();
  }

  setEnableINS() {
    this.statutoryForm.get('insurno').enable();
    this.statutoryForm.get('inscheme').enable();
    this.statutoryForm.get('instartdate').enable();
    this.statutoryForm.get('insenddate').enable();
  }


  setDisableMED() {
    this.statutoryForm.get('mediclno').disable();
    this.statutoryForm.get('mscheme').disable();
    this.statutoryForm.get('mstartdate').disable();
    this.statutoryForm.get('menddate').disable();

  }

  setEnableMED() {
    this.statutoryForm.get('mediclno').enable();
    this.statutoryForm.get('mscheme').enable();
    this.statutoryForm.get('mstartdate').enable();
    this.statutoryForm.get('menddate').enable();
  }


  setDisableBANK() {
    this.statutoryForm.get('bslno').disable();
    this.statutoryForm.get('acholdername').disable();
    this.statutoryForm.get('accno').disable();
    this.statutoryForm.get('ifsccode').disable();

  }

  setEnableBANK() {
    this.statutoryForm.get('bslno').enable();
    this.statutoryForm.get('acholdername').enable();
    this.statutoryForm.get('accno').enable();
    this.statutoryForm.get('ifsccode').enable();
  }

  

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    // this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.createDataGrid001();
    this.loadData();
    this.statutoryForm = this.formBuilder.group({
      bslno: ['',],
      escheckbox: ['', Validators.required],
      inscheckbox: ['', Validators.required],
      pfcheckbox: ['', Validators.required],
      medicheckbox: ['', Validators.required],

      bankcheckbox: ['', Validators.required],
      acholdername: ['', Validators.required],
      accno: ['', Validators.required],
      ifsccode: ['', Validators.required],
      
      ecode: ['', Validators.required],
      ename: ['', Validators.required],
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



    this.bankNameManager.allbank().subscribe(response => {
      this.currentbank001mb = deserialize<Bank001mb[]>(Bank001mb, response);
    });

  }


  loadData() {
    this.statutoryPlanManager.allstuplan().subscribe((response: any) => {
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
    statutory001wb.bslno = this.f.bslno.value ? this.f.bslno.value : "";
    statutory001wb.acholdername = this.f.acholdername.value ? this.f.acholdername.value : "";
    statutory001wb.accno = this.f.accno.value ? this.f.accno.value : "";
    statutory001wb.ifsccode = this.f.ifsccode.value ? this.f.ifsccode.value : "";
    statutory001wb.bankcheckbox = this.f.bankcheckbox.value ? this.f.bankcheckbox.value : "";
    

    statutory001wb.ecode = this.f.ecode.value ? this.f.ecode.value : "";
    statutory001wb.ename = this.f.ename.value ? this.f.ename.value : "";

    statutory001wb.esno = this.f.esno.value ? this.f.esno.value : "NA";
    statutory001wb.escheme = this.f.escheme.value ? this.f.escheme.value : "NA";
    statutory001wb.esstartdate = this.f.esstartdate.value? this.f.esstartdate.value : 0;
    statutory001wb.esenddate =  this.f.esenddate.value? this.f.esenddate.value : 0;
    statutory001wb.escheckbox = this.f.escheckbox.value ? this.f.escheckbox.value : "";

   
    statutory001wb.pfno = this.f.pfno.value ? this.f.pfno.value : "NA";
    statutory001wb.pscheme = this.f.pscheme.value ? this.f.pscheme.value : "NA";
    statutory001wb.pfstartdate =  this.f.pfstartdate.value? this.f.pfstartdate.value : 0;
    statutory001wb.pfenddate = this.f.pfenddate.value? this.f.pfenddate.value : 0;
    statutory001wb.pfcheckbox = this.f.pfcheckbox.value ? this.f.pfcheckbox.value : "";

    statutory001wb.insurno = this.f.insurno.value ? this.f.insurno.value : "NA";
    statutory001wb.inscheme = this.f.inscheme.value ? this.f.inscheme.value : "NA";
    statutory001wb.instartdate =  this.f.instartdate.value? this.f.instartdate.value : 0;
    statutory001wb.insenddate =  this.f.insenddate.value? this.f.insenddate.value : 0;
    statutory001wb.inscheckbox = this.f.inscheckbox.value ? this.f.inscheckbox.value : "";
    
    statutory001wb.mediclno = this.f.mediclno.value ? this.f.mediclno.value : "NA";
    statutory001wb.mscheme = this.f.mscheme.value ? this.f.mscheme.value : "NA";
    statutory001wb.mstartdate =  this.f.mstartdate.value? this.f.mstartdate.value : 0;
    statutory001wb.menddate = this.f.menddate.value? this.f.menddate.value : 0;
    statutory001wb.medicheckbox = this.f.medicheckbox.value ? this.f.medicheckbox.value : "";
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
      if (this.bank001mb) {
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




