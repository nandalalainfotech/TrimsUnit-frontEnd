import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SupplierAttendanceManager } from 'src/app/shared/services/restcontroller/bizservice/Supplierattendancereport.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { TrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/trainingplan.service';
import { Supplierattendancereport001wb } from 'src/app/shared/services/restcontroller/entities/Supplierattendancereport001wb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { Trainingplan001mb } from 'src/app/shared/services/restcontroller/entities/trainingplan001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-supplier-attendance-report',
  templateUrl: './supplier-attendance-report.component.html',
  styleUrls: ['./supplier-attendance-report.component.css']
})
export class SupplierAttendanceReportComponent implements OnInit {


  SupplierAttendanceForm: FormGroup | any;
  submitted = false;
  frameworkComponents: any;
  minDate = new Date();
  maxDate = new Date();
  slNo: number | any;
  supregslNo: number | any;
  trainingslNo: number | any;
  trainerName: string = "";
  traineeName: string = "";
  traineeRole: string = "";
  attendancestatus: string = "";
  date: Date | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  attendance: Supplierattendancereport001wb[] = [];
  supplierRegs: Supplierregistration001mb[] = [];
  supplierregistration001mb?: Supplierregistration001mb;
  trainplans: Trainingplan001mb[] = [];
  public gridOptions: GridOptions | any;
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private supplierRegManager: SupplierRegManager,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private trainingPlanManager: TrainingPlanManager,
    private supplierAttendanceManager: SupplierAttendanceManager,
    private datepipe: DatePipe
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.createDataGrid001();

    this.SupplierAttendanceForm = this.formBuilder.group({
      supregslNo: [""],
      trainingslNo: ["", Validators.required],
      trainerName: ["", Validators.required],
      traineeName: ["", Validators.required],
      traineeRole: ["", Validators.required],
      attendancestatus: ["", Validators.required],
      date: ["", Validators.required]
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

    this.trainingPlanManager.alltrainingPlan().subscribe(response => {
      this.trainplans = deserialize<Trainingplan001mb[]>(Trainingplan001mb, response);
    });

  }

  get f() { return this.SupplierAttendanceForm.controls; }

  loadData() {
    this.supplierAttendanceManager.findAllBySupplierId(this.supregslNo).subscribe(response => {
      this.attendance = deserialize<Supplierattendancereport001wb[]>(Supplierattendancereport001wb, response);
      if (this.attendance.length > 0) {
        this.gridOptions?.api?.setRowData(this.attendance);
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
        headerName: 'Trainer Name',
        field: 'trainerName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Training Topics',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setTrainingName.bind(this)
      },
      {
        headerName: 'Trainee Name',
        field: 'traineeName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Trainee Role',
        field: 'traineeRole',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Attendance Status',
        field: 'attendancestatus',
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

  setTrainingName(params: any): string {
    return params.data.trainingslNo2 ? params.data.trainingslNo2.trainingname : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Supplier Attendance Report";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.SupplierAttendanceForm.patchValue({
      'trainingslNo': params.data.trainingslNo,
      'trainerName': params.data.trainerName,
      'traineeName': params.data.traineeName,
      'traineeRole': params.data.traineeRole,
      'attendancestatus': params.data.attendancestatus,
      'date': new Date(params.data.date),
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Supplier Attendance Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.supplierAttendanceManager.attendancedelete(params.data.slNo).subscribe((response: any) => {
          for (let i = 0; i < this.attendance.length; i++) {
            if (this.attendance[i].slNo == params.data.slNo) {
              this.attendance?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Supplier Traning Attendance Removed Successfully");
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

  onSupplierAttendanceClick(event: any, SupplierAttendanceForm: any) {
    this.markFormGroupTouched(this.SupplierAttendanceForm);
    this.submitted = true;
    if (this.SupplierAttendanceForm.invalid) {
      return;
    }

    let supplierattendancereport001wb = new Supplierattendancereport001wb();
    supplierattendancereport001wb.supregslNo = this.supplierregistration001mb?.slNo;
    supplierattendancereport001wb.trainingslNo = this.f.trainingslNo.value ? this.f.trainingslNo.value : "";
    supplierattendancereport001wb.trainerName = this.f.trainerName.value ? this.f.trainerName.value : "";
    supplierattendancereport001wb.traineeName = this.f.traineeName.value ? this.f.traineeName.value : "";
    supplierattendancereport001wb.traineeRole = this.f.traineeRole.value ? this.f.traineeRole.value : "";
    supplierattendancereport001wb.attendancestatus = this.f.attendancestatus.value ? this.f.attendancestatus.value : "";
    supplierattendancereport001wb.date = new Date(this.f.date.value);
    if (this.slNo) {
      supplierattendancereport001wb.slNo = this.slNo;
      supplierattendancereport001wb.unitdepartslNo = this.unitdepartslNo;
      supplierattendancereport001wb.insertUser = this.insertUser;
      supplierattendancereport001wb.insertDatetime = this.insertDatetime;
      supplierattendancereport001wb.updatedUser = this.authManager.getcurrentUser.username;
      supplierattendancereport001wb.updatedDatetime = new Date();
      this.supplierAttendanceManager.attendanceupdate(supplierattendancereport001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Traning Attendance Updated Successfully");
        this.loadData();
        this.SupplierAttendanceForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      supplierattendancereport001wb.unitdepartslNo= this.user.unitdepartslNo;
      supplierattendancereport001wb.insertUser = this.authManager.getcurrentUser.username;
      supplierattendancereport001wb.insertDatetime = new Date();
      this.supplierAttendanceManager.attendancesave(supplierattendancereport001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Traning Attendance Saved Successfully");
        this.loadData();
        this.SupplierAttendanceForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.SupplierAttendanceForm.reset();
  }

  onGeneratePdfReport() {
    this.supplierAttendanceManager.attendancePdf(this.supregslNo).subscribe((response: any) => {
      if (this.supplierregistration001mb) {
        saveAs(response, this.supplierregistration001mb.supplierCode);
      } else {
        saveAs(response, "download");
      }
    })
  }

  onViewClick() {
    this.supplierAttendanceManager.attendancePdf(this.supregslNo).subscribe((response: any) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGenerateExcelReport() {
    this.supplierAttendanceManager.attendanceExcel(this.supregslNo).subscribe((response: any) => {
      if (this.supplierregistration001mb) {
        saveAs(response, this.supplierregistration001mb.supplierCode);
      } else {
        saveAs(response, "download");
      }
    })
  }

}
