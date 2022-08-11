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
import { ChecklistSettingManager } from 'src/app/shared/services/restcontroller/bizservice/checklist-setting.service';
import { DailyChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/Dailycecklist.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { Checklist001mb } from 'src/app/shared/services/restcontroller/entities/Checklist001mb';
import { Dailychecklist001wb } from 'src/app/shared/services/restcontroller/entities/Dailychecklist001wb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-daily-maintenance-checklist',
    templateUrl: './daily-maintenance-checklist.component.html',
    styleUrls: ['./daily-maintenance-checklist.component.css'],
    providers: [DatePipe]
})

export class DailyMaintenanceChecklistComponent implements OnInit {
    mslno: any;
    submitted = false;
    slNo: any;
    cpslno: number | any;
    date: Date | any;
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string | null = "";
    updatedDatetime: Date | any;
    machine001mb?: Machine001mb;
    checklist001mbs?: Checklist001mb[] = [];
    checklistsetting?: Checklist001mb;
    dailychecks: Dailychecklist001wb[] = [];
    dailyForm: FormGroup | any;
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(
        private httpClient: HttpClient,
        private http: HttpClient,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private dailyChecklistManager: DailyChecklistManager,
        private checklistSettingManager: ChecklistSettingManager,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal,
        private machineSettingManager: MachineSettingManager,
        private datepipe: DatePipe) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.route.queryParams.subscribe(params => {
            this.mslno = params.mslno;
            this.loadData();
            this.machineSettingManager.findOne(this.mslno).subscribe(response => {
                this.machine001mb = deserialize<Machine001mb>(Machine001mb, response);
            });
        });

        this.checklistSettingManager.allchecklist().subscribe(response => {

            this.checklist001mbs = deserialize<Checklist001mb[]>(Checklist001mb, response);
        });

        this.createDataGrid001();
        this.dailyForm = this.formBuilder.group({
            mslno: [''],
            cpslno: ['', Validators.required],
            date: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')]
        })
    }

    loadData() {
        this.dailyChecklistManager.findAllByMachineId(this.mslno).subscribe(response => {
            this.dailychecks = deserialize<Dailychecklist001wb[]>(Dailychecklist001wb, response);
            if (this.dailychecks.length > 0) {
                this.gridOptions?.api?.setRowData(this.dailychecks);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.dailyForm.controls }

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
                headerName: 'Check Points',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setCheckPoints.bind(this)
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
                    return params.data.date ? this.datePipe.transform(params.data.date, 'dd-MM-yyyy') : '';
                }
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 80,
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
                width: 85,
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

    setCheckPoints(params: any): string {
        return params.data.cpslno2 ? params.data.cpslno2.checkpoints : null;
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.dailyForm.patchValue({
            'mslno': params.data.mslno,
            'cpslno': params.data.cpslno,
            'date': params.data.date
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Daily Maintenance Checklist";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.dailyChecklistManager.dailychecklistdelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.dailychecks.length; i++) {
                        if (this.dailychecks[i].slNo == params.data.slNo) {
                            this.dailychecks?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.calloutService.showSuccess("Daily Maintenance Checklist Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Daily Maintenance Checklist";
        modalRef.componentInstance.details = params.data
    }

    onViewClick() {
        this.dailyChecklistManager.dailyCheckPdf(this.mslno).subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
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

    ondailyCheckClick(event: any, dailyForm: any) {
        this.markFormGroupTouched(this.dailyForm);
        this.submitted = true;
        if (this.dailyForm.invalid) {
            return
        }
        let dailychecklist001wb = new Dailychecklist001wb();
        dailychecklist001wb.mslno = this.machine001mb?.slNo;
        dailychecklist001wb.cpslno = this.f.cpslno.value ? this.f.cpslno.value : "";
        dailychecklist001wb.date = new Date(this.f.date.value);
        if (this.slNo) {

            dailychecklist001wb.slNo = this.slNo;
            dailychecklist001wb.unitdepartslNo = this.unitdepartslNo;
            dailychecklist001wb.insertUser = this.insertUser;
            dailychecklist001wb.insertDatetime = this.insertDatetime;
            dailychecklist001wb.updatedUser = this.authManager.getcurrentUser.username;
            dailychecklist001wb.updatedDatetime = new Date();
            this.dailyChecklistManager.dailychecklistupdate(dailychecklist001wb).subscribe((response) => {
                this.calloutService.showSuccess("Daily Maintenance Checklist Updated Successfully");
                this.loadData();
                this.dailyForm.reset();
                this.dailyForm.patchValue(
                    { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
                );
                this.slNo = null;
                this.submitted = false;
            });
        }
        else {
            dailychecklist001wb.unitdepartslNo = this.user.unitdepartslNo;
            dailychecklist001wb.date = new Date();
            dailychecklist001wb.insertUser = this.authManager.getcurrentUser.username;
            dailychecklist001wb.insertDatetime = new Date();
            this.dailyChecklistManager.dailychecklistsave(dailychecklist001wb).subscribe((response) => {
                this.calloutService.showSuccess("Daily Maintenance Checklist Saved Successfully");
                this.loadData();
                this.dailyForm.reset();
                this.dailyForm.patchValue(
                    { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
                );
                this.submitted = false;
            });
        }
    }


    onReset() {
        this.dailyForm.controls.cpslno.reset();
        this.submitted = false;
    }

    onGeneratePdfReport() {
        this.dailyChecklistManager.dailyCheckPdf(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }

    onGenerateExcelReport() {
        this.dailyChecklistManager.dailyCheckExcel(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }

}


