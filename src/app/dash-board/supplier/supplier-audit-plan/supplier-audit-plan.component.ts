import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { saveAs } from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SupplierAuditManager } from 'src/app/shared/services/restcontroller/bizservice/supplierAudit.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Supplieraudit001wb } from 'src/app/shared/services/restcontroller/entities/supplierAudit001mb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
    selector: 'app-supplier-audit-plan',
    templateUrl: './supplier-audit-plan.component.html',
    styleUrls: ['./supplier-audit-plan.component.css']
})
export class SupplierAuditPlanComponent implements OnInit {

    SupplierPlanForm: FormGroup | any;
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    minDate = new Date();
    maxDate = new Date();
    submitted = false;
    suppSlno: any;
    supNo: any;
    supregSlno: any;
    slNo: number | any;
    supregslno: number | any;
    status: string | null = "";
    date: Date | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string | null = "";
    updatedDatetime: Date | any;
    supplierregistration001mb?: Supplierregistration001mb;
    supplierRegs: Supplierregistration001mb[] = [];
    supaudit: Supplieraudit001wb[] = [];
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(private http: HttpClient,
        private modalService: NgbModal,
        private authManager: AuthManager,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private calloutService: CalloutService,
        private supplierRegManager: SupplierRegManager,
        private supplierAuditManager: SupplierAuditManager,
        private datepipe: DatePipe) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }


    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
        this.createDataGrid001();

        this.SupplierPlanForm = this.formBuilder.group({
            supregslno: [''],
            status: ['', Validators.required],
            date: ['', Validators.required],
        })

        this.supplierRegManager.allSupplier().subscribe(response => {
            this.supplierRegs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
        });

        this.route.queryParams.subscribe(params => {
            this.supregslno = params.suppSlno;
            this.loadData();
            this.supplierRegManager.findOne(this.supregslno).subscribe(response => {
                this.supplierregistration001mb = deserialize<Supplierregistration001mb>(Supplierregistration001mb, response);
            });
        });
    }

    get f() { return this.SupplierPlanForm.controls; }

    loadData() {
        this.supplierAuditManager.findAllBySupplierId(this.supregslno).subscribe(response => {
            this.supaudit = deserialize<Supplieraudit001wb[]>(Supplieraudit001wb, response);
            if (this.supaudit.length > 0) {
                this.gridOptions?.api?.setRowData(this.supaudit);
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
        return params.data.supregslno2 ? params.data.supregslno2.supplierCode : null;
    }

    setSupname(params: any): string {
        return params.data.supregslno2 ? params.data.supregslno2.supplierName : null;
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier Audit Plan";
        modalRef.componentInstance.details = params.data
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.SupplierPlanForm.patchValue({
            'supregslno': params.data.supregslno,
            'status': params.data.status,
            'date': new Date(params.data.date),
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Supplier Audit Plan";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.supplierAuditManager.auditdelete(params.data.slNo).subscribe((response: any) => {
                    for (let i = 0; i < this.supaudit.length; i++) {
                        if (this.supaudit[i].slNo == params.data.slNo) {
                            this.supaudit?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Supplier Audit Plan Removed Successfully");
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

    onSupplierPlanClick(event: any, SupplierPlanForm: any) {
        this.markFormGroupTouched(this.SupplierPlanForm);
        this.submitted = true;
        if (this.SupplierPlanForm.invalid) {
            return;
        }

        let supplierAudit001wb = new Supplieraudit001wb();
        supplierAudit001wb.supregslno = this.supplierregistration001mb?.slNo;
        supplierAudit001wb.status = this.f.status.value ? this.f.status.value : "";
        supplierAudit001wb.date = new Date(this.f.date.value);
        if (this.slNo) {
            supplierAudit001wb.slNo = this.slNo;
            supplierAudit001wb.unitdepartslNo = this.unitdepartslNo;
            supplierAudit001wb.insertUser = this.insertUser;
            supplierAudit001wb.insertDatetime = this.insertDatetime;
            supplierAudit001wb.updatedUser = this.authManager.getcurrentUser.username;
            supplierAudit001wb.updatedDatetime = new Date();
            this.supplierAuditManager.auditupdate(supplierAudit001wb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Audit Plan Updated Successfully");
                this.loadData();
                this.SupplierPlanForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            supplierAudit001wb.unitdepartslNo= this.user.unitdepartslNo;
            supplierAudit001wb.insertUser = this.authManager.getcurrentUser.username;
            supplierAudit001wb.insertDatetime = new Date();
            this.supplierAuditManager.auditsave(supplierAudit001wb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Audit Plan Saved Successfully");
                this.loadData();
                this.SupplierPlanForm.reset();
                this.submitted = false;
            });
        }


    }

    onReset() {
        this.submitted = false;
        this.SupplierPlanForm.reset();
    }

    onGeneratePdfReport() {
        this.supplierAuditManager.supPlanPdf(this.supregslno).subscribe((response: any) => {
            if (this.supplierregistration001mb) {
                saveAs(response, this.supplierregistration001mb.supplierCode);
            } else {
                saveAs(response, "download");
            }
        })
    }

    onViewClick() {
        this.supplierAuditManager.supPlanPdf(this.supregslno).subscribe((response: any) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }

    onGenerateExcelReport() {
        this.supplierAuditManager.supPlanExcel(this.supregslno).subscribe((response: any) => {
            if (this.supplierregistration001mb) {
                saveAs(response, this.supplierregistration001mb.supplierCode);
            } else {
                saveAs(response, "download");
            }
        })
    }

}
