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
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { SupplierTrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/suppliertrainingplan.service';
import { TrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/trainingplan.service';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { Suppliertrainingplan001wb } from 'src/app/shared/services/restcontroller/entities/suppliertrainingplan001wb';
import { Trainingplan001mb } from 'src/app/shared/services/restcontroller/entities/trainingplan001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
    selector: 'app-supplier-training-plan',
    templateUrl: './supplier-training-plan.component.html',
    styleUrls: ['./supplier-training-plan.component.css']
})
export class SupplierTrainingPlanComponent implements OnInit {

    SupplierTrainingPlanForm: FormGroup | any;
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    minDate = new Date();
    maxDate = new Date();
    submitted = false;
    slNo: number | any;
    supregslNo: number | any;
    trainingslNo: number | any;
    status: string | null = "";
    date: Date | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string | null = "";
    updatedDatetime: Date | any;
    suppliertrainPlans?: Suppliertrainingplan001wb;
    // supplierRegs: Supplierregistration001mb[] = [];
    trainplans: Trainingplan001mb[] = [];
    supplierregistration001mb?: Supplierregistration001mb;
    suppliertrainings: Suppliertrainingplan001wb[] = [];
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(private http: HttpClient,
        private modalService: NgbModal,
        private authManager: AuthManager,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private calloutService: CalloutService,
        private supplierRegManager: SupplierRegManager,
        private suppTrainPlanManager: SupplierTrainingPlanManager,
        private trainingPlanManager: TrainingPlanManager,
        private datepipe: DatePipe) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }


    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
        this.createDataGrid001();

        this.SupplierTrainingPlanForm = this.formBuilder.group({
            supregslNo: [''],
            trainingslNo: ['', Validators.required],
            status: ['', Validators.required],
            date: ['', Validators.required],
        })

        // this.supplierRegManager.allSupplier().subscribe(response => {
        //     this.supplierRegs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
        // });

        this.trainingPlanManager.alltrainingPlan().subscribe(response => {
            this.trainplans = deserialize<Trainingplan001mb[]>(Trainingplan001mb, response);
        });

        this.route.queryParams.subscribe(params => {
            this.supregslNo = params.suppSlno;
            this.loadData();
            this.supplierRegManager.findOne(this.supregslNo).subscribe(response => {
                this.supplierregistration001mb = deserialize<Supplierregistration001mb>(Supplierregistration001mb, response);
            });
        });
    }

    get f() { return this.SupplierTrainingPlanForm.controls; }

    loadData() {
        this.suppTrainPlanManager.findAllBySupplierId(this.supregslNo).subscribe(response => {
            this.suppliertrainings = deserialize<Suppliertrainingplan001wb[]>(Suppliertrainingplan001wb, response);
            if (this.suppliertrainings.length > 0) {
                this.gridOptions?.api?.setRowData(this.suppliertrainings);
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
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setSupcode.bind(this)
            },
            {
                headerName: 'Supplier Name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setSupname.bind(this)
            },
            {
                headerName: 'Training Name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setTrainingName.bind(this)
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
                headerName: 'Date',
                // field: 'date',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
                }
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

    setSupcode(params: any): string {
        return params.data.supregslNo2 ? params.data.supregslNo2.supplierCode : null;
    }

    setTrainingName(params: any): string {
        return params.data.trainingslNo2 ? params.data.trainingslNo2.trainingname : null;
    }

    setSupname(params: any): string {
        return params.data.supregslNo2 ? params.data.supregslNo2.supplierName : null;
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier Training Plan";
        modalRef.componentInstance.details = params.data
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.SupplierTrainingPlanForm.patchValue({
            // 'supregslno': params.data.supregslno,
            'trainingslNo': params.data.trainingslNo,
            'status': params.data.status,
            'date': new Date(params.data.date),
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Supplier Training Plan";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.suppTrainPlanManager.suppTrainingdelete(params.data.slNo).subscribe((response: any) => {
                    for (let i = 0; i < this.suppliertrainings.length; i++) {
                        if (this.suppliertrainings[i].slNo == params.data.slNo) {
                            this.suppliertrainings?.splice(i, 1);
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

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onSupplierTrainPlanClick(event: any, SupplierTrainingPlanForm: any) {
        this.markFormGroupTouched(this.SupplierTrainingPlanForm);
        this.submitted = true;
        if (this.SupplierTrainingPlanForm.invalid) {
            return;
        }

        let suppliertrainingplan001wb = new Suppliertrainingplan001wb();
        suppliertrainingplan001wb.supregslNo = this.supplierregistration001mb?.slNo;
        suppliertrainingplan001wb.trainingslNo = this.f.trainingslNo.value ? this.f.trainingslNo.value : "";
        suppliertrainingplan001wb.status = this.f.status.value ? this.f.status.value : "";
        suppliertrainingplan001wb.date = new Date(this.f.date.value);
        if (this.slNo) {
            suppliertrainingplan001wb.slNo = this.slNo;
            suppliertrainingplan001wb.unitdepartslNo = this.unitdepartslNo;
            suppliertrainingplan001wb.insertUser = this.insertUser;
            suppliertrainingplan001wb.insertDatetime = this.insertDatetime;
            suppliertrainingplan001wb.updatedUser = this.authManager.getcurrentUser.username;
            suppliertrainingplan001wb.updatedDatetime = new Date();
            this.suppTrainPlanManager.suppTrainingupdate(suppliertrainingplan001wb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Training Plan Updated Successfully");
                this.loadData();
                this.SupplierTrainingPlanForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            suppliertrainingplan001wb.unitdepartslNo= this.user.unitdepartslNo;
            suppliertrainingplan001wb.insertUser = this.authManager.getcurrentUser.username;
            suppliertrainingplan001wb.insertDatetime = new Date();
            this.suppTrainPlanManager.suppTrainingsave(suppliertrainingplan001wb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Training Plan Saved Successfully");
                this.loadData();
                this.SupplierTrainingPlanForm.reset();
                this.submitted = false;
            });
        }


    }

    onReset() {
        this.submitted = false;
        this.SupplierTrainingPlanForm.reset();
    }

    onGeneratePdfReport() {
        this.suppTrainPlanManager.suppTrainingPlanPdf(this.supregslNo).subscribe((response: any) => {
            if (this.supplierregistration001mb) {
                saveAs(response, this.supplierregistration001mb.supplierCode);
            } else {
                saveAs(response, "download");
            }
        })
    }

    onViewClick() {
        this.suppTrainPlanManager.suppTrainingPlanPdf(this.supregslNo).subscribe((response: any) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }

    onGenerateExcelReport() {
        this.suppTrainPlanManager.suppTrainingPlanExcel(this.supregslNo).subscribe((response: any) => {
            if (this.supplierregistration001mb) {
                saveAs(response, this.supplierregistration001mb.supplierCode);
            } else {
                saveAs(response, "download");
            }
        })
    }

}

