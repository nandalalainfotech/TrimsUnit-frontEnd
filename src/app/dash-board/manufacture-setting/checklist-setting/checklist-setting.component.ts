import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import * as saveAs from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ChecklistSettingManager } from 'src/app/shared/services/restcontroller/bizservice/checklist-setting.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Checklist001mb } from 'src/app/shared/services/restcontroller/entities/Checklist001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
    selector: 'app-checklist-setting',
    templateUrl: './checklist-setting.component.html',
    styleUrls: ['./checklist-setting.component.css']
})
export class ChecklistSettingComponent implements OnInit {

    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    checklistForm: FormGroup | any;
    submitted = false;
    slNo: number | any;
    sslno: number | any;
    mcslno: number | any;
    mname: string = "";
    checkpoints: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string = "";
    updatedDatetime: Date | any;
    //------- to declare a this name from entity file 
    checklistSettings: Checklist001mb[] = [];
    checklist001mb?: Checklist001mb;
    machineSettings: Machine001mb[] = [];
    machine001mb?: Machine001mb;
    statussets: Status001mb[] = [];
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    //------- to declare a constructor name from service file 
    constructor(
        private router: Router, private checklistSettingManager: ChecklistSettingManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal,
        private dataSharedService: DataSharedService,
        private authManger: AuthManager,
        private formBuilder: FormBuilder,
        private baseService: BaseService,
        private machineSettingManager: MachineSettingManager,
        private statusSettingManager: StatusSettingManager,
        private httpClient: HttpClient, private http: HttpClient
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;
        this.createDataGrid001();
        this.checklistForm = this.formBuilder.group({
            mcslno: ['', Validators.required],
            mname: [''],
            checkpoints: ['', Validators.required],
            sslno: ['', Validators.required],
        })

        this.statusSettingManager.allstatus().subscribe(response => {
            this.statussets = deserialize<Status001mb[]>(Status001mb, response);

        });
        this.machineSettingManager.findAllSlNoAndMcode().subscribe((response: any) => {
            this.machineSettings = deserialize<Machine001mb[]>(Machine001mb, response);
        });

        this.loadData();

        this.onChange();
    }

    loadData() {
        this.checklistSettingManager.allchecklist().subscribe(response => {
            this.checklistSettings = deserialize<Checklist001mb[]>(Checklist001mb, response);
            if (this.checklistSettings.length > 0) {
                this.gridOptions?.api?.setRowData(this.checklistSettings);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.checklistForm.controls; }

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
                headerName: 'Sl_No',
                field: 'slNo',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
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
                headerName: 'Check Points',
                field: 'checkpoints',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true


            },
            {
                headerName: 'Status',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setStatus.bind(this)
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
        return params.data.mcslno2 ? params.data.mcslno2.mcode : null;
    }

    setStatus(params: any): string {
        return params.data.sslno2 ? params.data.sslno2.name : null;
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.checklistForm.patchValue({
            'sslno': params.data.sslno,
            'mcslno': params.data.mcslno,
            'checkpoints': params.data.checkpoints,


        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Checklist Setting";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.checklistSettingManager.checklistdelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.checklistSettings.length; i++) {
                        if (this.checklistSettings[i].slNo == params.data.slNo) {
                            this.checklistSettings?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Checklist Details Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Checklist Setting";
        modalRef.componentInstance.details = params.data;
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }
    // --------------------save and update method----------->
    onChecklistClick(event: any, checklistForm: any) {
        this.markFormGroupTouched(this.checklistForm);
        this.submitted = true;
        if (this.checklistForm.invalid) {
            return;
        }
        let checklist001mb = new Checklist001mb();
        checklist001mb.mcslno = this.f.mcslno.value ? this.f.mcslno.value : "";
        checklist001mb.checkpoints = this.f.checkpoints.value ? this.f.checkpoints.value : "";
        checklist001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
        if (this.slNo) {
            checklist001mb.slNo = this.slNo;
            checklist001mb.unitdepartslNo = this.unitdepartslNo;
            checklist001mb.insertUser = this.insertUser;
            checklist001mb.insertDatetime = this.insertDatetime;
            checklist001mb.updatedUser = this.authManager.getcurrentUser.username;
            checklist001mb.updatedDatetime = new Date();
            this.checklistSettingManager.checklistupdate(checklist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Checklist Details Updated Successfully");
                this.loadData();
                this.checklistForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        }
        else {
            checklist001mb.unitdepartslNo= this.user.unitdepartslNo;
            checklist001mb.insertUser = this.authManager.getcurrentUser.username;
            checklist001mb.insertDatetime = new Date();
            this.checklistSettingManager.checklistsave(checklist001mb).subscribe((response) => {
                this.calloutService.showSuccess("Checklist Details Saved Successfully");
                this.loadData();
                this.checklistForm.reset();
                this.submitted = false;
            });
        }
    }
    // --------------------save and update method end----------->
    onReset() {
        this.submitted = false;
        this.checklistForm.reset();
    }

    onChange() {
        this.checklistForm.get('mcslno').valueChanges.subscribe((value: any) => {
            for (let machineSetting of this.machineSettings) {
                if (machineSetting.slNo == value) {
                    this.checklistForm.patchValue({
                        'mname': machineSetting.mname
                    });
                    break;
                }
            }
        });
    }

    onViewClick() {
        this.checklistSettingManager.checklistPdf().subscribe((response) => {
          var blob = new Blob([response], { type: 'application/pdf' });
          var blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
        })
      }
    
      onGeneratePdfReport() {
        this.checklistSettingManager.checklistPdf().subscribe((response) => {
          saveAs(response, "Checklist-Details");
        })
      }
    
      onGenerateExcelReport() {
        this.checklistSettingManager.checklistExcel().subscribe((response) => {
         saveAs(response, "Checklist-Details");
          });
      }
}
