import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { ActivityManager } from 'src/app/shared/services/restcontroller/bizservice/activity.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Activity001mb } from 'src/app/shared/services/restcontroller/entities/activity001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
    ActivityForm: FormGroup | any;
    frameworkComponents: any;
    submitted = false;
    public gridOptions: GridOptions | any;
    slNo: number | any;
    activity: string = "";
    status: string = "";
    insertUser: string = "";
    insertDatetime?: Date;
    updatedUser: string = "";
    updatedDatetime?: Date | null;
    activity001mbs: Activity001mb[] = [];
    user?: Login001mb | any;
    unitdepartslNo: number | any;
    
    constructor(
        private formBuilder: FormBuilder,
        private activityManager: ActivityManager,
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
        this.ActivityForm = this.formBuilder.group({
            activity: ['', Validators.required],
            status: ['', Validators.required],
        })

        this.loadData();
    }

    loadData() {
        this.activityManager.allactivity().subscribe(response => {
            this.activity001mbs = deserialize<Activity001mb[]>(Activity001mb, response);
            if (this.activity001mbs.length > 0) {
                this.gridOptions?.api?.setRowData(this.activity001mbs);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.ActivityForm.controls; }

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
                headerName: 'Activity',
                field: 'activity',
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
        this.ActivityForm.patchValue({
            'activity': params.data.activity,
            'status': params.data.status,
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Audit Report Activity";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.activityManager.activityDelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.activity001mbs.length; i++) {
                        if (this.activity001mbs[i].slNo == params.data.slNo) {
                            this.activity001mbs?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Audit Report Activity Details Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Audit Report Activity";
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

    onActivityClick(event: any, ActivityForm: any) {
        this.markFormGroupTouched(this.ActivityForm);
        this.submitted = true;
        if (this.ActivityForm.invalid) {
            return;
        }

        let activity001mb = new Activity001mb();
        activity001mb.activity = this.f.activity.value ? this.f.activity.value : "";
        activity001mb.status = this.f.status.value ? this.f.status.value : "";

        if (this.slNo) {
            activity001mb.slNo = this.slNo;
            activity001mb.unitdepartslNo = this.unitdepartslNo;
            activity001mb.insertUser = this.insertUser;
            activity001mb.insertDatetime = this.insertDatetime;
            activity001mb.updatedUser = this.authManager.getcurrentUser.username;
            activity001mb.updatedDatetime = new Date();
            this.activityManager.activityUpdate(activity001mb).subscribe((response) => {
                this.calloutService.showSuccess("Audit Report Activity Details Updated Successfully");
                this.loadData();
                this.ActivityForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            activity001mb.unitdepartslNo= this.user.unitdepartslNo;
            activity001mb.insertUser = this.authManager.getcurrentUser.username;
            activity001mb.insertDatetime = new Date();
            this.activityManager.activitySave(activity001mb).subscribe((response) => {
                this.calloutService.showSuccess("Audit Report Activity Details Saved Successfully");
                this.loadData();
                this.ActivityForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.ActivityForm.reset();
    }

    onViewClick() {
        this.activityManager.SuplactivityPdf().subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }

    onGeneratePdfReport() {
        this.activityManager.SuplactivityPdf().subscribe((response) => {
            saveAs(response, "Supply_activity_Details");
        })
    }

    onGenerateExcelReport() {
        this.activityManager.SuplactivityExcel().subscribe((response) => {
            saveAs(response, "Supply_activity_Details");
        });
    }



}
