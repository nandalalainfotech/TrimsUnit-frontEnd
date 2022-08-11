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
import { SupplierChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-checklist.service';
import { Activity001mb } from 'src/app/shared/services/restcontroller/entities/activity001mb';
import { SupplierChecklist001mb } from 'src/app/shared/services/restcontroller/entities/supplier-checklist001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
    selector: 'app-supplier-checklist',
    templateUrl: './supplier-checklist.component.html',
    styleUrls: ['./supplier-checklist.component.css']
})
export class SupplierChecklistComponent implements OnInit {
    SupChecklistForm: FormGroup | any;
    frameworkComponents: any;
    submitted = false;
    public gridOptions: GridOptions | any;
    slNo: number | any;
    activityslNo: number | any;
    checkpointsName: string = "";
    status: string = "";
    insertUser: string = "";
    insertDatetime?: Date;
    updatedUser: string = "";
    updatedDatetime?: Date | null;
    SupplierChecklist001mbs: SupplierChecklist001mb[] = [];
    activity001mbs: Activity001mb[] = [];
    user?: Login001mb | any;
    unitdepartslNo: number | any;
    constructor(
        private formBuilder: FormBuilder,
        private supplierChecklistManager: SupplierChecklistManager,
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
        this.SupChecklistForm = this.formBuilder.group({
            activityslNo: ['', Validators.required],
            checkpointsName: ['', Validators.required],
            status: ['', Validators.required],
        })

        this.loadData();
        this.activityManager.allactivity().subscribe(response => {
            this.activity001mbs = deserialize<Activity001mb[]>(Activity001mb, response);
        });
    }

    loadData() {
        this.supplierChecklistManager.allsupchecklist().subscribe(response => {
            this.SupplierChecklist001mbs = deserialize<SupplierChecklist001mb[]>(SupplierChecklist001mb, response);
            if (this.SupplierChecklist001mbs.length > 0) {
                this.gridOptions?.api?.setRowData(this.SupplierChecklist001mbs);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.SupChecklistForm.controls; }

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
                // field: 'activity',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setActivity.bind(this)
            },
            {
                headerName: 'CheckPoints',
                field: 'checkpointsName',
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

    setActivity(params: any): string {
        return params.data.activityslNo2 ? params.data.activityslNo2.activity : null;
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.SupChecklistForm.patchValue({
            'activityslNo': params.data.activityslNo,
            'checkpointsName': params.data.checkpointsName,
            'status': params.data.status,
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Supplier Checklist";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.supplierChecklistManager.supchecklistDelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.SupplierChecklist001mbs.length; i++) {
                        if (this.SupplierChecklist001mbs[i].slNo == params.data.slNo) {
                            this.SupplierChecklist001mbs?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Supplier Checklist Details Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier Checklist";
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

    onSupChecklistClick(event: any, SupChecklistForm: any) {
        this.markFormGroupTouched(this.SupChecklistForm);
        this.submitted = true;
        if (this.SupChecklistForm.invalid) {
            return;
        }

        let supplierChecklist001mb = new SupplierChecklist001mb();
        supplierChecklist001mb.activityslNo = this.f.activityslNo.value ? this.f.activityslNo.value : "";
        supplierChecklist001mb.checkpointsName = this.f.checkpointsName.value ? this.f.checkpointsName.value : "";
        supplierChecklist001mb.status = this.f.status.value ? this.f.status.value : "";

        if (this.slNo) {
            supplierChecklist001mb.slNo = this.slNo;
            supplierChecklist001mb.unitdepartslNo = this.unitdepartslNo;
            supplierChecklist001mb.insertUser = this.insertUser;
            supplierChecklist001mb.insertDatetime = this.insertDatetime;
            supplierChecklist001mb.updatedUser = this.authManager.getcurrentUser.username;
            supplierChecklist001mb.updatedDatetime = new Date();
            this.supplierChecklistManager.supchecklistUpdate(supplierChecklist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Checklist Details Updated Successfully");
                this.loadData();
                this.SupChecklistForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            supplierChecklist001mb.unitdepartslNo= this.user.unitdepartslNo;
            supplierChecklist001mb.insertUser = this.authManager.getcurrentUser.username;
            supplierChecklist001mb.insertDatetime = new Date();
            this.supplierChecklistManager.supchecklistSave(supplierChecklist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Checklist Details Saved Successfully");
                this.loadData();
                this.SupChecklistForm.reset();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.SupChecklistForm.reset();
    }




  onViewClick() {
    this.supplierChecklistManager.suplchecklPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.supplierChecklistManager.suplchecklPdf().subscribe((response) => {
      saveAs(response, "Supplier_checklist_Details");
    })
  }

  onGenerateExcelReport() {
    this.supplierChecklistManager.suplchecklExcel().subscribe((response) => {
     saveAs(response, "Supplier_checklist_Details");
      });
  }

}