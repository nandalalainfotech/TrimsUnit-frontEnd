import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssessmentCriteriaManager } from 'src/app/shared/services/restcontroller/bizservice/AssessmentCriteria.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Assessmentcriteria001mb } from 'src/app/shared/services/restcontroller/entities/Assessmentcriteria001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-assessment-criteria',
  templateUrl: './assessment-criteria.component.html',
  styleUrls: ['./assessment-criteria.component.css']
})

export class AssessmentCriteriaComponent implements OnInit {
  AssessCriteriaForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;
  public gridOptions: GridOptions | any;
  slNo: number | any;
  criteria: string = "";
  details: string = "";
  max: number | any;
  status: string = "";
  insertUser: string = "";
  insertDatetime?: Date;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  accessmentcriterias: Assessmentcriteria001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;
  constructor(
    private formBuilder: FormBuilder,
    private assessCriteriaManager: AssessmentCriteriaManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private authManager: AuthManager,
    private modalService: NgbModal,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    this.AssessCriteriaForm = this.formBuilder.group({
      criteria: ['', Validators.required],
      details: ['', Validators.required],
      max: [''],
      status: ['', Validators.required],
    })

    this.loadData();
  }

  loadData() {
    this.assessCriteriaManager.allcriteria().subscribe(response => {
      this.accessmentcriterias = deserialize<Assessmentcriteria001mb[]>(Assessmentcriteria001mb, response);
      if (this.accessmentcriterias.length > 0) {
        this.gridOptions?.api?.setRowData(this.accessmentcriterias);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.AssessCriteriaForm.controls; }

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
        headerName: 'Criteria',
        field: 'criteria',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Details',
        field: 'details',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Max',
        field: 'max',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
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

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.AssessCriteriaForm.patchValue({
      'criteria': params.data.criteria,
      'details': params.data.details,
      'max': params.data.max,
      'status': params.data.status,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Assessment Criteria";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.assessCriteriaManager.criteriaDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.accessmentcriterias.length; i++) {
            if (this.accessmentcriterias[i].slNo == params.data.slNo) {
              this.accessmentcriterias?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Assessment Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Assessment Criteria";
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

  onAssessCriteriaClick(event: any, AssessCriteriaForm: any) {
    this.markFormGroupTouched(this.AssessCriteriaForm);
    this.submitted = true;
    if (this.AssessCriteriaForm.invalid) {
      return;
    }

    let assesscriteria001mb = new Assessmentcriteria001mb();
    assesscriteria001mb.criteria = this.f.criteria.value ? this.f.criteria.value : "";
    assesscriteria001mb.details = this.f.details.value ? this.f.details.value : "";
    assesscriteria001mb.max = this.f.max.value ? this.f.max.value : "";
    assesscriteria001mb.status = this.f.status.value ? this.f.status.value : "";

    if (this.slNo) {
      assesscriteria001mb.slNo = this.slNo;
      assesscriteria001mb.unitdepartslNo = this.unitdepartslNo;
      assesscriteria001mb.insertUser = this.insertUser;
      assesscriteria001mb.insertDatetime = this.insertDatetime;
      assesscriteria001mb.updatedUser = this.authManager.getcurrentUser.username;
      assesscriteria001mb.updatedDatetime = new Date();
      this.assessCriteriaManager.criteriaUpdate(assesscriteria001mb).subscribe((response) => {
        this.calloutService.showSuccess("Assessment Details Updated Successfully");
        this.loadData();
        this.AssessCriteriaForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      assesscriteria001mb.unitdepartslNo= this.user.unitdepartslNo;
      assesscriteria001mb.insertUser = this.authManager.getcurrentUser.username;
      assesscriteria001mb.insertDatetime = new Date();
      this.assessCriteriaManager.criteriaSave(assesscriteria001mb).subscribe((response) => {
        this.calloutService.showSuccess("Assessment Details Completed Successfully");
        this.loadData();
        this.AssessCriteriaForm.reset();
        this.submitted = false;
      });
    }
  }


  onReset() {
    this.submitted = false;
    this.AssessCriteriaForm.reset();
  }



  onViewClick() {
    this.assessCriteriaManager.asscrtPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.assessCriteriaManager.asscrtPdf().subscribe((response) => {
      saveAs(response, "Assessment_crit-Details");
    })
  }

  onGenerateExcelReport() {
    this.assessCriteriaManager.asscrtExcel().subscribe((response) => {
     saveAs(response, "Assessment_crit-Details");
      });
  }
  
}
