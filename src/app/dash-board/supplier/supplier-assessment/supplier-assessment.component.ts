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
import { AssessmentCriteriaManager } from 'src/app/shared/services/restcontroller/bizservice/AssessmentCriteria.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SupplierAssessmentManager } from 'src/app/shared/services/restcontroller/bizservice/supplierAssessment.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Assessmentcriteria001mb } from 'src/app/shared/services/restcontroller/entities/Assessmentcriteria001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Supplierassessment001wb } from 'src/app/shared/services/restcontroller/entities/Supplierassessment001wb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-supplier-assessment',
    templateUrl: './supplier-assessment.component.html',
    styleUrls: ['./supplier-assessment.component.css']
})

export class SupplierAssessmentComponent implements OnInit {
    SupplierAssessForm: FormGroup | any;
    frameworkComponents: any;
    submitted = false;
    slNo: number | any;
    suppSlno: number | any;
    detail: string = "";
    assessSlno: number | any;
    score: number | any;
    insertUser: string = "";
    insertDatetime?: Date;
    updatedUser: string = "";
    updatedDatetime?: Date | null;
    suppassessments: Supplierassessment001wb[] = [];
    accessmentcriterias: Assessmentcriteria001mb[] = [];
    supplierRegs: Supplierregistration001mb[] = [];
    supplierregistration001mb?: Supplierregistration001mb;
    public gridOptions: GridOptions | any;
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(
        private assessCriteriaManager: AssessmentCriteriaManager,
        private supplierRegManager: SupplierRegManager,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private modalService: NgbModal,
        private supplierAssessmentManager: SupplierAssessmentManager,
        private authManager: AuthManager,
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.createDataGrid001();
        this.SupplierAssessForm = this.formBuilder.group({
            suppSlno: [''],
            detail: [''],
            assessSlno: ['', Validators.required],
            score: ['', Validators.required],

        })

        this.onChange();

        this.assessCriteriaManager.allcriteria().subscribe(response => {
            this.accessmentcriterias = deserialize<Assessmentcriteria001mb[]>(Assessmentcriteria001mb, response);
        });

        this.supplierRegManager.allSupplier().subscribe(response => {
            this.supplierRegs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
        });

        this.route.queryParams.subscribe(params => {
            this.suppSlno = params.suppSlno;
            this.loadData();
            this.supplierRegManager.findOne(this.suppSlno).subscribe(response => {
                this.supplierregistration001mb = deserialize<Supplierregistration001mb>(Supplierregistration001mb, response);
            });
        });
    }

    loadData() {
        this.supplierAssessmentManager.findAllBySupplierId(this.suppSlno).subscribe(response => {
            this.suppassessments = deserialize<Supplierassessment001wb[]>(Supplierassessment001wb, response);
            if (this.suppassessments.length > 0) {
                this.gridOptions?.api?.setRowData(this.suppassessments);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.SupplierAssessForm.controls; }

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
                headerName: 'Assessment Criteria',
                // field: 'assessment',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setCriteria.bind(this)
            },
            {
                headerName: 'Details Verified',
                // field: 'details',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setDetails.bind(this)
            },
            {
                headerName: 'Max Score',
                field: 'max',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setMaxScore.bind(this)
            },
            {
                headerName: 'Scored',
                field: 'score',
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
        return params.data.suppSlno2 ? params.data.suppSlno2.supplierCode : null;
    }

    setSupname(params: any): string {
        return params.data.suppSlno2 ? params.data.suppSlno2.supplierName : null;
    }

    setCriteria(params: any): string {
        return params.data.assessSlno2 ? params.data.assessSlno2.criteria : null;
    }

    setDetails(params: any): string {
        return params.data.assessSlno2 ? params.data.assessSlno2.details : null;
    }

    setMaxScore(params: any): string {
        return params.data.assessSlno2 ? params.data.assessSlno2.max : null;
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.SupplierAssessForm.patchValue({
            'assessSlno': params.data.assessSlno,
            'detail': params.data.assessSlno2.details,
            // 'max': params.data.assessSlno2.address,
            'score': params.data.score,
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Supplier Assessment";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.supplierAssessmentManager.assessmentdelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.suppassessments.length; i++) {
                        if (this.suppassessments[i].slNo == params.data.slNo) {
                            this.suppassessments?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Supplier Assessment Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier Assessment";
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

    onSupplierAssessClick(event: any, SupplierAssessForm: any) {
        this.markFormGroupTouched(this.SupplierAssessForm);
        this.submitted = true;
        if (this.SupplierAssessForm.invalid) {
            return;
        }

        let supplierassess001wb = new Supplierassessment001wb();
        supplierassess001wb.suppSlno = this.supplierregistration001mb?.slNo;
        supplierassess001wb.assessSlno = this.f.assessSlno.value ? this.f.assessSlno.value : "";
        supplierassess001wb.score = this.f.score.value ? this.f.score.value : "";
        if (this.slNo) {
            supplierassess001wb.slNo = this.slNo;
            supplierassess001wb.unitdepartslNo = this.unitdepartslNo;
            supplierassess001wb.insertUser = this.insertUser;
            supplierassess001wb.insertDatetime = this.insertDatetime;
            supplierassess001wb.updatedUser = this.authManager.getcurrentUser.username;
            supplierassess001wb.updatedDatetime = new Date();
            this.supplierAssessmentManager.assessmentupdate(supplierassess001wb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Assessment Updated Successfully");
                this.loadData();
                this.SupplierAssessForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            supplierassess001wb.unitdepartslNo= this.user.unitdepartslNo;
            supplierassess001wb.insertUser = this.authManager.getcurrentUser.username;
            supplierassess001wb.insertDatetime = new Date();
            this.supplierAssessmentManager.assessmentsave(supplierassess001wb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Assessment Completed Successfully");
                this.loadData();
                this.SupplierAssessForm.reset();
                this.submitted = false;
            });
        }
    }

    onChange() {
        this.SupplierAssessForm.get('assessSlno').valueChanges.subscribe((value: any) => {
            for (let accessmentcriteria of this.accessmentcriterias) {
                if (accessmentcriteria.slNo == value) {
                    this.SupplierAssessForm.patchValue({
                        'detail': accessmentcriteria.details
                    });
                    break;
                }
            }
        });
    }

    onReset() {
        this.submitted = false;
        this.SupplierAssessForm.reset();
    }

    onGeneratePdfReport() {
        this.supplierAssessmentManager.assessmentPdf(this.suppSlno).subscribe((response: any) => {
          if (this.supplierregistration001mb) {
            saveAs(response, this.supplierregistration001mb.supplierCode);
          } else {
            saveAs(response, "download");
          }
        })
      }
    
      onViewClick() {
        this.supplierAssessmentManager.assessmentPdf(this.suppSlno).subscribe((response: any) => {
          var blob = new Blob([response], { type: 'application/pdf' });
          var blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
        })
      }
    
      onGenerateExcelReport() {
        this.supplierAssessmentManager.assessmentExcel(this.suppSlno).subscribe((response: any) => {
          if (this.supplierregistration001mb) {
            saveAs(response, this.supplierregistration001mb.supplierCode);
          } else {
            saveAs(response, "download");
          }
        })
      }
}
