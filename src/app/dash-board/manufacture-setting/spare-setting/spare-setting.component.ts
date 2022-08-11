import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Spares001mb } from 'src/app/shared/services/restcontroller/entities/spares001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
@Component({
    selector: 'app-spare-setting',
    templateUrl: './spare-setting.component.html',
    styleUrls: ['./spare-setting.component.css']
})

export class SpareSettingComponent implements OnInit {

    public gridOptions: GridOptions | any;
    frameworkComponents: any;
    spareSettingForm: FormGroup | any;
    submitted = false;
    slNo: number | any;
    msslno: number | any;
    mname: string = "";
    spares: string = "";
    sparescost: number | any;
    specification: string = "";
    leadtime: Date | any;
    minimumstocklevel: number | any;
    reorderlevel: number | any;
    sslno: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string = "";
    updatedDatetime: Date | any;
    sparesSettings: Spares001mb[] = [];
    spares001mb?: Spares001mb;
    machineSettings: Machine001mb[] = [];
    machine001mb?: Machine001mb;
    status001mbs?: Status001mb[] = [];
    statussets: Status001mb[] = [];
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(
        private router: Router,
        private calloutService: CalloutService,
        private sparesettingManager: SparesettingManager,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private statusSettingManager: StatusSettingManager,
        private machineSettingManager: MachineSettingManager,
        private httpClient: HttpClient, private http: HttpClient,
    ) {
        this.frameworkComponents = {
            //  linkRenderer: LinkRendererComponent,
            iconRenderer: IconRendererComponent
        }

    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.createDataGrid001();
        this.spareSettingForm = this.formBuilder.group({
            msslno: ['', Validators.required],
            spares: ['', Validators.required],
            sparescost: ['', Validators.required],
            mname: [''],
            sslno: ['', Validators.required],
            specification: ['', Validators.required],
            leadtime: ['', Validators.required],
            minimumstocklevel: ['', Validators.required],
            reorderlevel: ['', Validators.required],
        })

        this.statusSettingManager.allstatus().subscribe(response => {
            this.statussets = deserialize<Status001mb[]>(Status001mb, response);
        });

        this.machineSettingManager.findAllSlNoAndMcode().subscribe(response => {
            this.machineSettings = deserialize<Machine001mb[]>(Machine001mb, response);
        });
        this.loadData();
        this.onChange();
    }

    loadData() {
        this.sparesettingManager.allsparesetting().subscribe(response => {
            this.sparesSettings = deserialize<Spares001mb[]>(Spares001mb, response);
            if (this.sparesSettings.length > 0) {
                this.gridOptions?.api?.setRowData(this.sparesSettings);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }

        });
    }

    get f() { return this.spareSettingForm.controls; }

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
                headerName: 'Machine code',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setMachineCode.bind(this)
            },
            {
                headerName: 'Spares',
                field: 'spares',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Spares Cost',
                field: 'sparescost',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Specification',
                field: 'specification',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Lead Time',
                field: 'leadtime',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Minimum Stock Level',
                field: 'minimumstocklevel',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                cellStyle: (params: { data: { minimumstocklevel: number; }; }) => {
                    if (params.data.minimumstocklevel < 5) {
                        return { color: 'red' };
                    }
                    return null;
                }
            },
            {
                headerName: 'Re-Order Level',
                field: 'reorderlevel',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
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


    setStatusName(params: any): string {
        return params.data.sslno2 ? params.data.sslno2.name : null;
    }

    setMachineCode(params: any): string {
        return params.data.msslno2 ? params.data.msslno2.mcode : null;
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Spare Setting";
        modalRef.componentInstance.details = params.data
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.msslno = params.data.msslno;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.spareSettingForm.patchValue({
            'sslno': params.data.sslno,
            'msslno': params.data.msslno,
            'spares': params.data.spares,
            'sparescost': params.data.sparescost,
            'specification': params.data.specification,
            'leadtime': params.data.leadtime,
            'minimumstocklevel': params.data.minimumstocklevel,
            'reorderlevel': params.data.reorderlevel,
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Spare Setting";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.sparesettingManager.sparedelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.sparesSettings.length; i++) {
                        if (this.sparesSettings[i].slNo == params.data.slNo) {
                            this.sparesSettings?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Spares Details Removed Successfully");
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

    onListOfSparesClick(event: any, spareSettingForm: any) {
        this.markFormGroupTouched(this.spareSettingForm);
        this.submitted = true;
        if (this.spareSettingForm.invalid) {
            return;
        }
        let spares001mb = new Spares001mb();
        spares001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
        spares001mb.msslno = this.f.msslno.value ? this.f.msslno.value : "";
        spares001mb.spares = this.f.spares.value ? this.f.spares.value : "";
        spares001mb.sparescost = this.f.sparescost.value ? this.f.sparescost.value : 0,
            spares001mb.specification = this.f.specification.value ? this.f.specification.value : "";
        spares001mb.leadtime = this.f.leadtime.value ? this.f.leadtime.value : "";
        spares001mb.minimumstocklevel = this.f.minimumstocklevel.value ? this.f.minimumstocklevel.value : "";
        spares001mb.reorderlevel = this.f.reorderlevel.value ? this.f.reorderlevel.value : "";
        if (this.slNo) {
            spares001mb.slNo = this.slNo;
            spares001mb.unitdepartslNo = this.unitdepartslNo;
            spares001mb.insertUser = this.insertUser;
            spares001mb.insertDatetime = this.insertDatetime;
            spares001mb.updatedUser = this.authManager.getcurrentUser.username;
            spares001mb.updatedDatetime = new Date();
            this.sparesettingManager.spareupdate(spares001mb).subscribe((response) => {
                this.calloutService.showSuccess("Spares Details Updated Successfully");
                this.loadData();
                this.spareSettingForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            spares001mb.unitdepartslNo= this.user.unitdepartslNo;
            spares001mb.insertUser = this.authManager.getcurrentUser.username;
            spares001mb.insertDatetime = new Date();
            this.sparesettingManager.sparesave(spares001mb).subscribe((response) => {
                this.calloutService.showSuccess("Spares Details Saved Successfully");
                this.loadData();
                this.spareSettingForm.reset();
                this.submitted = false;
            });
        }
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    onReset() {
        this.submitted = false;
        this.spareSettingForm.reset();
    }

    onChange() {
        this.spareSettingForm.get('msslno').valueChanges.subscribe((value: any) => {
            for (let machineSetting of this.machineSettings) {
                if (machineSetting.slNo == value) {
                    this.spareSettingForm.patchValue({
                        'mname': machineSetting.mname
                    });
                    break;
                }
            }
        });
    }

    onViewClick() {
        this.sparesettingManager.sparePdf().subscribe((response) => {
          var blob = new Blob([response], { type: 'application/pdf' });
          var blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
        })
      }
    
      onGeneratePdfReport() {
        this.sparesettingManager.sparePdf().subscribe((response) => {
          saveAs(response, "Spares-Details");
        })
      }
    
      onGenerateExcelReport() {
        this.sparesettingManager.spareExcel().subscribe((response) => {
         saveAs(response, "Spares-Details");
          });
      }
    
}
