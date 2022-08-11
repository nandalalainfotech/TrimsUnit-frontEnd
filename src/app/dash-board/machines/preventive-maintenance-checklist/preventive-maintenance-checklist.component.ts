import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventiveChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/preventivechecklist.service';
import { Checklist001mb } from 'src/app/shared/services/restcontroller/entities/Checklist001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventivechecklist001wb } from 'src/app/shared/services/restcontroller/entities/preventivechecklist001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-preventive-maintenance-checklist',
    templateUrl: './preventive-maintenance-checklist.component.html',
    styleUrls: ['./preventive-maintenance-checklist.component.css']
})

export class PreventiveMaintenanceChecklistComponent implements OnInit {

    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    preventiveChecklistForm: FormGroup | any;
    submitted = false;
    slNo: any;
    mslno: any;
    cpslno: any;
    checkpointdate: Date | any;
    observation: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string | null = "";
    updatedDatetime: Date | any;
    machine001mb?: Machine001mb;
    checklist001mbs?: Checklist001mb[] = [];
    preventchecks: Preventivechecklist001wb[] = [];
    checklistsetting?: Checklist001mb;
    preventivechecklist001wbs: any;
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private preventiveChecklistManager: PreventiveChecklistManager,
        private machineSettingManager: MachineSettingManager,
        private checklistSettingManager: ChecklistSettingManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal,
        private datePipe: DatePipe,
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.preventiveChecklistForm = this.formBuilder.group({
            mslno: [''],
            cpslno: [''],
            checkpointdate: ['', Validators.required],
            observations: new FormArray([]),
        })

        this.route.queryParams.subscribe(params => {
            this.mslno = params.mslno;
            this.loadData();
            this.machineSettingManager.findOne(this.mslno).subscribe(response => {
                this.machine001mb = deserialize<Machine001mb>(Machine001mb, response);

            });
        });

        this.checklistSettingManager.allchecklist().subscribe(response => {
            this.checklist001mbs = deserialize<Checklist001mb[]>(Checklist001mb, response);
            for (let i = 0; i < this.checklist001mbs.length; i++) {
                this.o.push(this.formBuilder.group({
                    id: [this.checklist001mbs[i].slNo,],
                    observation: ["", Validators.required],
                    label: [this.checklist001mbs[i].checkpoints],
                }));
            }
        });


        this.createDataGrid001();

    }

    loadData() {
        this.preventiveChecklistManager.findAllByMachineId(this.mslno).subscribe(response => {
            this.preventchecks = deserialize<Preventivechecklist001wb[]>(Preventivechecklist001wb, response);
            if (this.preventchecks.length > 0) {
                this.gridOptions?.api?.setRowData(this.preventchecks);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.preventiveChecklistForm.controls; }

    get o() { return this.f.observations as FormArray; }

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
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setMachineCode.bind(this)
            },
            {
                headerName: 'Machine Name',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setMachineName.bind(this)
            },
            {
                headerName: 'Check Points',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setCheckPoints.bind(this)
            },
            {
                headerName: 'Check Points Date',
                field: 'checkpointdate',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Observation',
                field: 'observation',
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
                width: 80,
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
                width: 85,
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
        this.preventiveChecklistForm.patchValue({
            'mslno': params.data.mslno,
            'cpslno': params.data.cpslno,
            'checkpointdate': new Date(params.data.checkpointdate),
        });
        for (let j = 0; j < this.f.observations.controls.length; j++) {
            if (this.f.observations.value[j].id == params.data.cpslno) {
                this.f.observations.controls[j].controls["observation"].setValue(params.data.observation);
            } else {
                this.f.observations.controls[j].controls["observation"].setValue();
                this.f.observations.controls[j].controls["observation"].disable({ emitEvent: false });
            }
        }
    }



    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Preventive Maintenance Checklist";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.preventiveChecklistManager.preventchecklistdelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.preventchecks.length; i++) {
                        if (this.preventchecks[i].slNo == params.data.slNo) {
                            this.preventchecks?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.calloutService.showSuccess("Preventive Maintenance Checklist Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Preventive Maintenance Checklist";
        modalRef.componentInstance.details = params.data
    }

    onViewClick() {
        this.preventiveChecklistManager.preCheckPdf(this.mslno).subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }
    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            control.markAllAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onChecklistClick(event: any, preventiveChecklistForm: any) {
        this.markFormGroupTouched(this.preventiveChecklistForm);
        this.submitted = true;
        if (this.preventiveChecklistForm.invalid) {
            return;
        }
        let preventivechecklist001wbs: Preventivechecklist001wb[] = [];
        if (this.checklist001mbs) {
            for (let i = 0; i < this.checklist001mbs.length; i++) {
                for (let j = 0; j < this.f.observations.controls.length; j++) {
                    if (this.checklist001mbs[i].checkpoints == this.f.observations.value[j].label) {
                        let preventivechecklist001wb = new Preventivechecklist001wb();
                        preventivechecklist001wb.mslno = this.machine001mb?.slNo;
                        preventivechecklist001wb.cpslno = this.checklist001mbs[i].slNo ? this.checklist001mbs[i].slNo : 0;
                        preventivechecklist001wb.checkpointdate = this.f.checkpointdate.value ? this.f.checkpointdate.value : "dd-MM-yyyy";
                        preventivechecklist001wb.observation = this.f.observations.value[j].observation ? this.f.observations.value[j].observation : "";
                        preventivechecklist001wb.insertUser = this.authManager.getcurrentUser.username;
                        preventivechecklist001wb.insertDatetime = new Date();
                        preventivechecklist001wb.unitdepartslNo = this.user.unitdepartslNo;
                        preventivechecklist001wbs.push(preventivechecklist001wb);

                    }
                }
            }
        }


        let preventivechecklist001wb = new Preventivechecklist001wb();
        if (this.slNo) {
            preventivechecklist001wb.slNo = this.slNo;
            preventivechecklist001wb.unitdepartslNo = this.unitdepartslNo;
            preventivechecklist001wb.insertUser = this.insertUser;
            preventivechecklist001wb.insertDatetime = this.insertDatetime;
            preventivechecklist001wb.updatedUser = this.authManager.getcurrentUser.username;
            preventivechecklist001wb.updatedDatetime = new Date();
            preventivechecklist001wb.mslno = this.machine001mb?.slNo;
            preventivechecklist001wb.cpslno = this.f.cpslno.value;
            preventivechecklist001wb.checkpointdate = this.f.checkpointdate.value ? this.f.checkpointdate.value : "dd-MM-yyyy";
            for (let j = 0; j < this.f.observations.controls.length; j++) {
                if (this.f.observations.value[j].id == this.f.cpslno.value) {
                    preventivechecklist001wb.observation = this.f.observations.controls[j].controls["observation"].value;
                }
            }
            this.preventiveChecklistManager.preventchecklistupdate(preventivechecklist001wb).subscribe((response) => {
                this.calloutService.showSuccess("Preventive Maintenance Checklist Updated Successfully");
                this.loadData();
                this.preventiveChecklistForm.controls['checkpointdate'].reset();
                for (let j = 0; j < this.f.observations.controls.length; j++) {
                    this.f.observations.controls[j].controls["observation"].reset();
                    this.f.observations.controls[j].controls["observation"].enable();
                }
                this.slNo = null;
                this.submitted = false;
            });
        }
        else {
            preventivechecklist001wb.unitdepartslNo = this.user.unitdepartslNo;
            console.log(" preventivechecklist001wb.unitdepartslNo-->", preventivechecklist001wb.unitdepartslNo);
            
            preventivechecklist001wb.insertUser = this.authManager.getcurrentUser.username;
            preventivechecklist001wb.insertDatetime = new Date();
            this.preventiveChecklistManager.preventchecklistsave(preventivechecklist001wbs).subscribe((response) => {
                this.calloutService.showSuccess("Preventive Maintenance Checklist Saved Successfully");
                this.loadData();
                this.preventiveChecklistForm.controls['checkpointdate'].reset();
                for (let j = 0; j < this.f.observations.controls.length; j++) {
                    this.f.observations.controls[j].controls["observation"].reset();
                }
                this.submitted = false;
            });
        };
    }

    onReset() {
        this.submitted = false;
        this.preventiveChecklistForm.controls['checkpointdate'].reset();
        for (let j = 0; j < this.f.observations.controls.length; j++) {
            this.f.observations.controls[j].controls["observation"].reset();
            this.f.observations.controls[j].controls["observation"].enable();
        }
    }

    onGeneratePdfReport() {
        this.preventiveChecklistManager.preCheckPdf(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }

    onGenerateExcelReport() {
        this.preventiveChecklistManager.preCheckExcel(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }
}