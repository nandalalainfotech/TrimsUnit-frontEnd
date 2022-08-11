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
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
@Component({
    selector: 'app-preventive-maintenance-plan',
    templateUrl: './preventive-maintenance-plan.component.html',
    styleUrls: ['./preventive-maintenance-plan.component.css']
})

export class PreventiveMaintenancePlanComponent implements OnInit {

    PreMaintainPlanForm: FormGroup | any;
    submitted = false;
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    filename: string = "";
    user?: Login001mb | any;
    slNo: number | any;
    mslno: number | any;
    mname: string = "";
    status: string = "";
    date: Date | any;
    unitdepartslNo: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string = "";
    updatedDatetime: Date | any;
    machine001mb?: Machine001mb;
    preventiveplans: Preventiveplan001wb[] = [];
    preventiveplan001wb?: Preventiveplan001wb;
    // rowData: Observable<any[]>;
    minDate = new Date();
    maxDate = new Date();
    constructor(
        private http: HttpClient,
        private datepipe: DatePipe,
        private authManager: AuthManager,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private machineSettingManager: MachineSettingManager,
        private calloutService: CalloutService,
        private preventivePlanManager: PreventivePlanManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;
        console.log(" this.user-->", this.user);
        
        // maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
        this.createDataGrid001();
        this.PreMaintainPlanForm = this.formBuilder.group({
            mslno: [''],
            status: ['', Validators.required],
            date: ['', Validators.required]
        })

        this.route.queryParams.subscribe(params => {
            this.mslno = params.mslno;
            this.loadData();
            this.machineSettingManager.findOne(this.mslno).subscribe(response => {
                this.machine001mb = deserialize<Machine001mb>(Machine001mb, response);
            });
        });
    }

    loadData() {
        this.preventivePlanManager.findAllByMachineId(this.mslno).subscribe(response => {
            this.preventiveplans = deserialize<Preventiveplan001wb[]>(Preventiveplan001wb, response);
            if (this.preventiveplans.length > 0) {
                this.gridOptions?.api?.setRowData(this.preventiveplans);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.PreMaintainPlanForm.controls; }

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
                headerName: 'Machine Code',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setMachineCode.bind(this)
            },
            {
                headerName: 'Machine Name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setMachineName.bind(this)
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
            }, {
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

    setMachineCode(params: any): string {
        return params.data.mslno2 ? params.data.mslno2.mcode : null;
    }

    setMachineName(params: any): string {
        return params.data.mslno2 ? params.data.mslno2.mname : null;
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Preventive Maintenance Plan";
        modalRef.componentInstance.details = params.data
    }

    onViewClick() {
        this.preventivePlanManager.prePlanPdf(this.mslno).subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }
    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.PreMaintainPlanForm.patchValue({
            'mslno': params.data.mslno,
            'status': params.data.status,
            'date': new Date(params.data.date),
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Preventive Maintenance Plan";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.preventivePlanManager.preplanDelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.preventiveplans.length; i++) {
                        if (this.preventiveplans[i].slNo == params.data.slNo) {
                            this.preventiveplans?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Preventive Maintenance Plan Removed Successfully");
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

    onPremainPlanClick(event: any, PreMaintainPlanForm: any) {
        this.markFormGroupTouched(this.PreMaintainPlanForm);
        this.submitted = true;
        if (this.PreMaintainPlanForm.invalid) {
            return;
        }

        let preventiveplan001wb = new Preventiveplan001wb();
        preventiveplan001wb.mslno = this.machine001mb?.slNo;
        preventiveplan001wb.status = this.f.status.value ? this.f.status.value : "";
        preventiveplan001wb.date = new Date(this.f.date.value);
        if (this.slNo) {
            preventiveplan001wb.slNo = this.slNo;
            preventiveplan001wb.unitdepartslNo = this.unitdepartslNo;
            preventiveplan001wb.insertUser = this.insertUser;
            preventiveplan001wb.insertDatetime = this.insertDatetime;
            preventiveplan001wb.updatedUser = this.authManager.getcurrentUser.username;
            preventiveplan001wb.updatedDatetime = new Date();
            this.preventivePlanManager.preplanUpdate(preventiveplan001wb).subscribe((response) => {
                this.calloutService.showSuccess("Preventive Maintenance Plan Updated Successfully");
                this.loadData();
                this.PreMaintainPlanForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            preventiveplan001wb.unitdepartslNo=this.user.unitdepartslNo
            preventiveplan001wb.insertUser = this.authManager.getcurrentUser.username;
            preventiveplan001wb.insertDatetime = new Date();
            this.preventivePlanManager.preplansave(preventiveplan001wb).subscribe((response) => {

                this.calloutService.showSuccess("Preventive Maintenance Plan Saved Successfully");
                this.loadData();
                this.PreMaintainPlanForm.reset();
                this.submitted = false;
            });
        }


    }

    onReset() {
        this.submitted = false;
        this.PreMaintainPlanForm.reset();
    }

    onGeneratePdfReport() {
        this.preventivePlanManager.prePlanPdf(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }

    onGenerateExcelReport() {
        this.preventivePlanManager.prePlanExcel(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }
}
