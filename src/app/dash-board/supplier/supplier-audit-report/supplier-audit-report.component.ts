import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import * as saveAs from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { ActivityManager } from 'src/app/shared/services/restcontroller/bizservice/activity.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SupplierChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-checklist.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { SupplierReportManager } from 'src/app/shared/services/restcontroller/bizservice/supplierreport.service';
import { Activity001mb } from 'src/app/shared/services/restcontroller/entities/activity001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { SupplierChecklist001mb } from 'src/app/shared/services/restcontroller/entities/supplier-checklist001mb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { Supplierreport001wb } from 'src/app/shared/services/restcontroller/entities/supplierreport001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-supplier-audit-report',
  templateUrl: './supplier-audit-report.component.html',
  styleUrls: ['./supplier-audit-report.component.css']
})
export class SupplierAuditReportComponent implements OnInit {

  SupplierReportForm: FormGroup | any;
  submitted = false;
  frameworkComponents: any;
  slNo: number | any;
  supregslNo: number | any;
  activeslNo: number | any;
  supcheckslNo: number | any;
  observation: string = "";
  auditScore: number | any;
  ncrRef: number | any;
  remarks: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  suppSlno: any;
  activity001mbs: Activity001mb[] = [];
  supplierChecklist001mbs: SupplierChecklist001mb[] = [];
  supplierRegs: Supplierregistration001mb[] = [];
  supplierregistration001mb?: Supplierregistration001mb;
  supReport: Supplierreport001wb[] = [];
  public gridOptions: GridOptions | any;
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(private supplierRegManager: SupplierRegManager,
    private supplierReportManager: SupplierReportManager,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private activityManager: ActivityManager,
    private supplierChecklistManager: SupplierChecklistManager,) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }


  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();

    this.SupplierReportForm = this.formBuilder.group({
      supregslNo: [""],
      activeslNo: ["", Validators.required],
      supcheckslNo: ["", Validators.required],
      observation: ["", Validators.required],
      auditScore: ["", Validators.required],
      ncrRef: ["", Validators.required],
      remarks: ["", Validators.required]
    })

    this.supplierRegManager.allSupplier().subscribe(response => {
      this.supplierRegs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
    });

    this.route.queryParams.subscribe(params => {
      this.supregslNo = params.suppSlno;
      this.loadData();
      this.supplierRegManager.findOne(this.supregslNo).subscribe(response => {
        this.supplierregistration001mb = deserialize<Supplierregistration001mb>(Supplierregistration001mb, response);
      });
    });

    this.activityManager.allactivity().subscribe(response => {
      this.activity001mbs = deserialize<Activity001mb[]>(Activity001mb, response);
    });

    this.supplierChecklistManager.allsupchecklist().subscribe(response => {
      this.supplierChecklist001mbs = deserialize<SupplierChecklist001mb[]>(SupplierChecklist001mb, response);
    });

  }

  get f() { return this.SupplierReportForm.controls; }

  loadData() {
    this.supplierReportManager.findAllBySupplierId(this.supregslNo).subscribe(response => {
      this.supReport = deserialize<Supplierreport001wb[]>(Supplierreport001wb, response);
      if (this.supReport.length > 0) {
        this.gridOptions?.api?.setRowData(this.supReport);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


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
        headerName: 'Supplier Code',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSupcode.bind(this)
      },
      {
        headerName: 'Supplier Name',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSupname.bind(this)
      },
      {
        headerName: 'Activity',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setActivity.bind(this)
      },
      {
        headerName: 'Check Points',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCheckpoints.bind(this)
      },
      {
        headerName: 'Observation',
        field: 'observation',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Audit Score',
        field: 'auditScore',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'NCR Ref',
        field: 'ncrRef',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 100,
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
        width: 105,
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

  setSupcode(params: any): string {
    return params.data.supregslNo2 ? params.data.supregslNo2.supplierCode : null;
  }

  setSupname(params: any): string {
    return params.data.supregslNo2 ? params.data.supregslNo2.supplierName : null;
  }

  setActivity(params: any): string {
    return params.data.activeslNo2 ? params.data.activeslNo2.activity : null;
  }

  setCheckpoints(params: any): string {
    return params.data.supcheckslNo2 ? params.data.supcheckslNo2.checkpointsName : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Supplier Audit Report";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.SupplierReportForm.patchValue({
      'supregslno': params.data.supregslno,
      'activeslNo': params.data.activeslNo,
      'supcheckslNo': params.data.supcheckslNo,
      'observation': params.data.observation,
      'auditScore': params.data.auditScore,
      'ncrRef': params.data.ncrRef,
      'remarks': params.data.remarks
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Supplier Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.supplierReportManager.reportdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.supReport.length; i++) {
            if (this.supReport[i].slNo == params.data.slNo) {
              this.supReport?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Supplier Audit Report Removed Successfully");
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

  onSupplierReportClick(event: any, SupplierReportForm: any) {
    this.markFormGroupTouched(this.SupplierReportForm);
    this.submitted = true;
    if (this.SupplierReportForm.invalid) {
      return;
    }

    let supplierreport001wb = new Supplierreport001wb();
    supplierreport001wb.supregslNo = this.supplierregistration001mb?.slNo;
    supplierreport001wb.activeslNo = this.f.activeslNo.value ? this.f.activeslNo.value : "";
    supplierreport001wb.supcheckslNo = this.f.supcheckslNo.value ? this.f.supcheckslNo.value : "";
    supplierreport001wb.observation = this.f.observation.value ? this.f.observation.value : "";
    supplierreport001wb.auditScore = this.f.auditScore.value ? this.f.auditScore.value : "";
    supplierreport001wb.ncrRef = this.f.ncrRef.value ? this.f.ncrRef.value : "";
    supplierreport001wb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
    if (this.slNo) {
      supplierreport001wb.slNo = this.slNo;
      supplierreport001wb.unitdepartslNo = this.unitdepartslNo;
      supplierreport001wb.insertUser = this.insertUser;
      supplierreport001wb.insertDatetime = this.insertDatetime;
      supplierreport001wb.updatedUser = this.authManager.getcurrentUser.username;
      supplierreport001wb.updatedDatetime = new Date();
      this.supplierReportManager.reportupdate(supplierreport001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Audit Report Updated Successfully");
        this.loadData();
        this.SupplierReportForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      supplierreport001wb.unitdepartslNo= this.user.unitdepartslNo;
      supplierreport001wb.insertUser = this.authManager.getcurrentUser.username;
      supplierreport001wb.insertDatetime = new Date();
      this.supplierReportManager.reportsave(supplierreport001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Audit Report Saved Successfully");
        this.loadData();
        this.SupplierReportForm.reset();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.SupplierReportForm.reset();
  }

  onGeneratePdfReport() {
    this.supplierReportManager.supReportPdf(this.supregslNo).subscribe((response: any) => {
      if (this.supplierregistration001mb) {
        saveAs(response, this.supplierregistration001mb.supplierCode);
      } else {
        saveAs(response, "download");
      }
    })
  }

  onViewClick() {
    this.supplierReportManager.supReportPdf(this.supregslNo).subscribe((response: any) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGenerateExcelReport() {
    this.supplierReportManager.supReportExcel(this.supregslNo).subscribe((response: any) => {
      if (this.supplierregistration001mb) {
        saveAs(response, this.supplierregistration001mb.supplierCode);
      } else {
        saveAs(response, "download");
      }
    })
  }

  onActivityChange(event: any) {
    this.supplierChecklist001mbs = [];
    this.supplierChecklistManager.findAllbyActivityId(event.target.value).subscribe(response => {
      this.supplierChecklist001mbs = deserialize<Supplierreport001wb[]>(Supplierreport001wb, response);
    });
  }


  

}
