import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import * as saveAs from 'file-saver';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BreakdownSettingManager } from 'src/app/shared/services/restcontroller/bizservice/breakdown.service';
import { RootCauseSettingManager } from 'src/app/shared/services/restcontroller/bizservice/root-cause-setting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Breakdown001mb } from 'src/app/shared/services/restcontroller/entities/Breakdown001mb';
import { Rootcause001mb } from 'src/app/shared/services/restcontroller/entities/Rootcause001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
    selector: 'app-root-cause-setting',
    templateUrl: './root-cause-setting.component.html',
    styleUrls: ['./root-cause-setting.component.css']
})
export class RootCauseSettingComponent implements OnInit {
    public gridOptions: GridOptions | any;
    frameworkComponents: any;
    rootCauseSettingForm: FormGroup | any;
    submitted = false;
    slNo: number | any;
    sslno: number | any;
    brslno: number | any;
    name: string = "";
    details: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string = "";
    updatedDatetime: Date | any;
    rootcauses: Rootcause001mb[] = [];
    statussets: Status001mb[] = [];
    breakdownSettings: Breakdown001mb[] = [];
    rootcase001mb?: Rootcause001mb;
    user?: Login001mb | any;
    unitdepartslNo: number | any;
    
    constructor(private formBuilder: FormBuilder,
        private rootCauseSettingManager: RootCauseSettingManager,
        private statusSettingManager: StatusSettingManager,
        private modalService: NgbModal,
        private breakdownSettingManager: BreakdownSettingManager,
        private authManager: AuthManager,
        private calloutService: CalloutService,
    ) {
        this.frameworkComponents = {
            //  linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;
        this.createDataGrid001();
        this.rootCauseSettingForm = this.formBuilder.group({
            sslno: ['', Validators.required],
            brslno: ['', Validators.required],
            name: ['', Validators.required],
            details: ['', Validators.required],
        })

        this.statusSettingManager.allstatus().subscribe(response => {
            this.statussets = deserialize<Status001mb[]>(Status001mb, response);
        });

        this.breakdownSettingManager.allbreakdown().subscribe(response => {
            this.breakdownSettings = deserialize<Breakdown001mb[]>(Breakdown001mb, response);
        });

        this.loadData();
    }

    loadData() {
        this.rootCauseSettingManager.allrootcause().subscribe(response => {
            this.rootcauses = deserialize<Rootcause001mb[]>(Rootcause001mb, response);
            if (this.rootcauses.length > 0) {
                this.gridOptions?.api?.setRowData(this.rootcauses);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.rootCauseSettingForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: 'Sl_No',
                field: 'slNo',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'BreakDown Name',
                field: 'brslno',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setBreakDown.bind(this)
            },
            {
                headerName: 'RootCause Name',
                field: 'name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Details',
                field: 'details',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: 'sslno',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setStatusName.bind(this)
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

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    setStatusName(params: any): string {
        return params.data.sslno2 ? params.data.sslno2.name : null;
    }

    setBreakDown(params: any): string {
        return params.data.brslno2 ? params.data.brslno2.name : null;
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.sslno = params.data.sslno;
        this.brslno = params.data.brslno;
        this.name = params.data.name;
        this.details = params.data.details;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.rootCauseSettingForm.patchValue({
            'sslno': params.data.sslno,
            'brslno': params.data.brslno,
            'name': params.data.name,
            'details': params.data.details,
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Root Cause Setting";
        modalRef.componentInstance.details = params.data
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Root Cause Setting";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.rootCauseSettingManager.rootcausedelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.rootcauses.length; i++) {
                        if (this.rootcauses[i].slNo == params.data.slNo) {
                            this.rootcauses?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Root Cause Details Removed Successfully");
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

    onRootCauseClick(event: any, rootCauseSettingForm: any) {
        this.markFormGroupTouched(this.rootCauseSettingForm);
        this.submitted = true;
        if (this.rootCauseSettingForm.invalid) {
            return;
        }
        let rootcause001mb = new Rootcause001mb();
        rootcause001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
        rootcause001mb.brslno = this.f.brslno.value ? this.f.brslno.value : "";
        rootcause001mb.name = this.f.name.value ? this.f.name.value : "";
        rootcause001mb.details = this.f.details.value ? this.f.details.value : "";
        if (this.slNo) {
            rootcause001mb.slNo = this.slNo;
            rootcause001mb.unitdepartslNo = this.unitdepartslNo;
            rootcause001mb.insertUser = this.insertUser;
            rootcause001mb.insertDatetime = this.insertDatetime;
            rootcause001mb.updatedUser = this.authManager.getcurrentUser.username;
            rootcause001mb.updatedDatetime = new Date();
            this.rootCauseSettingManager.rootcauseupdate(rootcause001mb).subscribe((response) => {
                this.calloutService.showSuccess("Root Cause Details Updated Successfully");
                this.loadData();
                this.rootCauseSettingForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            rootcause001mb.unitdepartslNo= this.user.unitdepartslNo;
            rootcause001mb.insertUser = this.authManager.getcurrentUser.username;
            rootcause001mb.insertDatetime = new Date();
            this.rootCauseSettingManager.rootcausesave(rootcause001mb).subscribe((response) => {
                this.calloutService.showSuccess("Root Cause Details Saved Successfully");
                this.loadData();
                this.rootCauseSettingForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.rootCauseSettingForm.reset();
    }

    onViewClick() {
        this.rootCauseSettingManager.rootcausePdf().subscribe((response) => {
          var blob = new Blob([response], { type: 'application/pdf' });
          var blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
        })
      }
    
      onGeneratePdfReport() {
        this.rootCauseSettingManager.rootcausePdf().subscribe((response) => {
          saveAs(response, "Rootcause-Details");
        })
      }
    
      onGenerateExcelReport() {
        this.rootCauseSettingManager.rootcauseExcel().subscribe((response) => {
         saveAs(response, "Rootcause-Details");
          });
      }
    
}
