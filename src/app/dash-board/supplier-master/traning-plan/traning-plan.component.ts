import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { TrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/trainingplan.service';
import { Trainingplan001mb } from 'src/app/shared/services/restcontroller/entities/trainingplan001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-traning-plan',
  templateUrl: './traning-plan.component.html',
  styleUrls: ['./traning-plan.component.css']
})
export class TraningPlanComponent implements OnInit {

  TraningPlanForm: FormGroup | any;
  submitted = false;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo: number | any;
  trainingname: string = "";
  status: string = "";
  insertUser: string = "";
  insertDatetime?: Date;
  updatedUser: string | null = "";
  updatedDatetime?: Date;
  trainplan: Trainingplan001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private trainingPlanManager: TrainingPlanManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();

    this.TraningPlanForm = this.formBuilder.group({
      trainingname: ['', Validators.required],
      status: ['', Validators.required],
    })

    this.loadData();

  }

  loadData() {
    this.trainingPlanManager.alltrainingPlan().subscribe(response => {
      this.trainplan = deserialize<Trainingplan001mb[]>(Trainingplan001mb, response);
      if (this.trainplan.length > 0) {
        this.gridOptions?.api?.setRowData(this.trainplan);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }

  get f() { return this.TraningPlanForm.controls; }

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
        headerName: 'Name Of Training',
        field: 'trainingname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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
        width: 100,
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
        width: 105,
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
    this.TraningPlanForm.patchValue({
      'trainingname': params.data.trainingname,
      'status': params.data.status
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Supplier Training Plan";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.trainingPlanManager.trainingPlandelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.trainplan.length; i++) {
            if (this.trainplan[i].slNo == params.data.slNo) {
              this.trainplan?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Supplier Training Plan Removed Successfully");
        });
      }
    })
  }
  
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Supplier Training Plan";
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

  onTrainingPlanClick(event: any, TraningPlanForm: any) {
    this.markFormGroupTouched(this.TraningPlanForm);
    this.submitted = true;
    if (this.TraningPlanForm.invalid) {
      return;
    }

    let trainingplan001mb = new Trainingplan001mb();
    trainingplan001mb.trainingname = this.f.trainingname.value ? this.f.trainingname.value : "";
    trainingplan001mb.status = this.f.status.value ? this.f.status.value : "";

    if (this.slNo) {
      trainingplan001mb.slNo = this.slNo;
      trainingplan001mb.unitdepartslNo = this.unitdepartslNo;
      trainingplan001mb.insertUser = this.insertUser;
      trainingplan001mb.insertDatetime = this.insertDatetime;
      trainingplan001mb.updatedUser = this.authManager.getcurrentUser.username;
      trainingplan001mb.updatedDatetime = new Date();
      this.trainingPlanManager.trainingPlanupdate(trainingplan001mb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Training Plan Updated Successfully");
        this.TraningPlanForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      trainingplan001mb.unitdepartslNo= this.user.unitdepartslNo;
      trainingplan001mb.insertUser = this.authManager.getcurrentUser.username;
      trainingplan001mb.insertDatetime = new Date();
      this.trainingPlanManager.trainingPlansave(trainingplan001mb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Training Plan Saved Successfully");
        this.TraningPlanForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.TraningPlanForm.reset();
  }

  onViewClick() {
    this.trainingPlanManager.suptrnplanPdf().subscribe((response) => {
        var blob = new Blob([response], { type: 'application/pdf' });
        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
    })
}

onGeneratePdfReport() {
    this.trainingPlanManager.suptrnplanPdf().subscribe((response) => {
        saveAs(response, "Supplier_Train_plan_Details");
    })
}

onGenerateExcelReport() {
    this.trainingPlanManager.suptrnplanExcel().subscribe((response) => {
        saveAs(response, "Supplier_Train_plan_Details");
    });
}



}
