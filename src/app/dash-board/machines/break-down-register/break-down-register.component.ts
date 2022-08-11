import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { saveAs } from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BreakdownSettingManager } from 'src/app/shared/services/restcontroller/bizservice/breakdown.service';
import { BreakDownRegManager } from 'src/app/shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventiveactionSettingManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveaction-setting.service';
import { RootCauseSettingManager } from 'src/app/shared/services/restcontroller/bizservice/root-cause-setting.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { Breakdown001mb } from 'src/app/shared/services/restcontroller/entities/Breakdown001mb';
import { Breakdownreg001wb } from 'src/app/shared/services/restcontroller/entities/Breakdownreg001wb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventiveaction001mb } from 'src/app/shared/services/restcontroller/entities/preventiveaction001mb';
import { Rootcause001mb } from 'src/app/shared/services/restcontroller/entities/Rootcause001mb';
import { Spares001mb } from 'src/app/shared/services/restcontroller/entities/spares001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
// declare var $: any;

@Component({
    selector: 'app-break-down-register',
    templateUrl: './break-down-register.component.html',
    styleUrls: ['./break-down-register.component.css']
})

export class BreakDownRegisterComponent implements OnInit {
    // date = new Date();
    title = 'myJquery';
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    breakDownForm: FormGroup | any;
    submitted = false;
    slNo: number | any;
    mslno: number | any;
    date: Date | any;
    bdsl: number | any;
    rcsl: number | any;
    pasl: number | any;
    startTime: string | any;
    endTime: string | any;
    spareCost: number | any;
    sslno: number | any;
    sparesQty: number | any;
    attendby: string = "";
    remarks: string = "";
    filename: string = "";
    filepath: string = "";
    originalfilename: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string = "";
    updatedDatetime: Date | any;
    machineSettings: Machine001mb[] = [];
    machine001mb?: Machine001mb;
    breakdownSettings: Breakdown001mb[] = [];
    rootcauses: Rootcause001mb[] = [];
    preventiveactionSettings: Preventiveaction001mb[] = [];
    sparesSettings: Spares001mb[] = [];
    spares001mb?: Spares001mb;
    breakdownregs: Breakdownreg001wb[] = [];
    breakdownreg001wb?: Breakdownreg001wb;
    response: string | any;
    minDate = new Date();
    maxDate = new Date();
    selectedFile: any;
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private breakDownRegManager: BreakDownRegManager,
        private machineSettingManager: MachineSettingManager,
        private breakdownSettingManager: BreakdownSettingManager,
        private rootCauseSettingManager: RootCauseSettingManager,
        private preventiveactionSettingManager: PreventiveactionSettingManager,
        private sparesettingManager: SparesettingManager,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private modalService: NgbModal,
        private datepipe: DatePipe,
        private http: HttpClient) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
        // this.date=new Date();
        // this.date.setDate(this.date.getDate() + 3);    
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.minDate.setDate(this.minDate.getDate() - 6);
        this.route.queryParams.subscribe(params => {
            this.mslno = params.mslno;
            this.machineSettingManager.findOne(this.mslno).subscribe(response => {
                this.machine001mb = deserialize<Machine001mb>(Machine001mb, response);
            });
        });

        this.createDataGrid001();

        this.breakDownForm = this.formBuilder.group({
            mslno: [''],
            date: ['', Validators.required],
            bdsl: ['', Validators.required],
            rcsl: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            pasl: ['', Validators.required],
            sslno: ['', Validators.required],
            sparesQty: ['', Validators.required],
            spareCost: [''],
            attendby: ['', Validators.required],
            remarks: ['', Validators.required],
            filename: ['']
        })

        this.sparesettingManager.allsparesetting().subscribe(response => {
            this.sparesSettings = deserialize<Spares001mb[]>(Spares001mb, response);
        });

        this.machineSettingManager.findAllSlNoAndMcode().subscribe(response => {
            this.machineSettings = deserialize<Machine001mb[]>(Machine001mb, response);
        });

        this.breakdownSettingManager.allbreakdown().subscribe(response => {
            this.breakdownSettings = deserialize<Breakdown001mb[]>(Breakdown001mb, response);
        });

        this.rootCauseSettingManager.allrootcause().subscribe(response => {
            this.rootcauses = deserialize<Rootcause001mb[]>(Rootcause001mb, response);
        });
        this.preventiveactionSettingManager.allpreventiveaction().subscribe(response => {
            this.preventiveactionSettings = deserialize<Preventiveaction001mb[]>(Preventiveaction001mb, response);
        });

        this.loadData();
        this.onChange();
    }

    loadData() {
        this.breakDownRegManager.findAllByMachineId(this.mslno).subscribe(response => {
            this.breakdownregs = deserialize<Breakdownreg001wb[]>(Breakdownreg001wb, response);
            if (this.breakdownregs.length > 0) {
                this.gridOptions?.api?.setRowData(this.breakdownregs);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    get f() { return this.breakDownForm.controls }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            // onFirstDataRendered: this.onFirstDataRendered.bind(this),
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
                headerName: 'Date',
                // field: 'date',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
                }
            },
            {
                headerName: 'Break Down',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setBreakDown.bind(this)

            },
            {
                headerName: 'Root Cause',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setRootCause.bind(this)

            },
            {
                headerName: 'Preventive Action',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setPreventiveAction.bind(this)

            },
            {
                headerName: 'Start Time',
                field: 'startTime',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,

            },
            {
                headerName: 'End Time',
                field: 'endTime',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,

            },
            {
                headerName: 'Spares Used',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setSpares.bind(this)
            },
            {
                headerName: 'Total Spares Cost',
                field: 'spareCost',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                 valueGetter: this.setSparesCost.bind(this)
            },
            {
                headerName: 'Spares Qty',
                field: 'sparesQty',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
           
            {
                headerName: 'Attend By',
                field: 'attendby',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,

            },
            {
                headerName: 'Remarks',
                field: 'remarks',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,

            },
            {
                headerName: 'File Name',
                field: 'filename',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,

            },
            {
                headerName: "",
                headerComponentParams: { template: '<span><i class="fa fa-download"></i></span>' },
                cellRenderer: 'iconRenderer',
                // flex: 1,
                width: 100,
                suppressSizeToFit: true,
                cellRendererParams: {
                    label: 'File'

                },
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

    setMachineName(params: any): string {
        return params.data.mslno2 ? params.data.mslno2.mname : null;
    }

    setMachineCode(params: any): string {
        return params.data.mslno2 ? params.data.mslno2.mcode : null;
    }

    setBreakDown(params: any): string {
        return params.data.bdsl2 ? params.data.bdsl2.name : null;
    }

    setRootCause(params: any): string {
        return params.data.rcsl2 ? params.data.rcsl2.name : null;
    }

    setPreventiveAction(params: any): string {
        return params.data.pasl2 ? params.data.pasl2.name : null;
    }

    setSpares(params: any): string {
        return params.data.sslno2 ? params.data.sslno2.spares : null;
    }

    setSparesCost(params: any): string {
        return params.data.sslno2 ? params.data.sslno2.sparescost : null;
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent,);
        modalRef.componentInstance.title = "BreakDown Register";
        modalRef.componentInstance.details = params.data
    }

    onViewClick() {
        this.breakDownRegManager.breakDownPdf(this.mslno).subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }

    onFileSelected(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.selectedFile = fileList[0];
        }
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.mslno = params.data.mslno;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.breakDownForm.patchValue({
            'date': new Date(params.data.date),
            'bdsl': params.data.bdsl,
            'rcsl': params.data.rcsl,
            'pasl': params.data.pasl,
            'startTime': params.data.startTime,
            'endTime': params.data.endTime,
            'sslno': params.data.sslno,
            'spareCost': params.data.spareCost,
            'sparesQty': params.data.sparesQty,
            'attendby': params.data.attendby,
            'remarks': params.data.remarks,
            'filename': params.data.filename
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "BreakDown Register";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.breakDownRegManager.breakdownregDelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.breakdownregs.length; i++) {
                        if (this.breakdownregs[i].slNo == params.data.slNo) {
                            this.breakdownregs?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("BreakDown Register Removed Successfully");
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

    onBreakDownClick(event: any, breakDownForm: any) {
        this.markFormGroupTouched(this.breakDownForm);
        this.submitted = true;
        if (this.breakDownForm.invalid) {
            return;
        }

        let breakdownreg001wb = new Breakdownreg001wb();
        breakdownreg001wb.mslno = this.machine001mb?.slNo;
        breakdownreg001wb.date = new Date(this.f.date.value);
        breakdownreg001wb.bdsl = this.f.bdsl.value ? this.f.bdsl.value : "";
        breakdownreg001wb.rcsl = this.f.rcsl.value ? this.f.rcsl.value : "";
        breakdownreg001wb.pasl = this.f.pasl.value ? this.f.pasl.value : "";
        breakdownreg001wb.startTime = this.f.startTime.value ? this.f.startTime.value : "";
        breakdownreg001wb.endTime = this.f.endTime.value ? this.f.endTime.value : "";
        breakdownreg001wb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
        breakdownreg001wb.spareCost = this.f.spareCost.value ? this.f.spareCost.value : "";
        breakdownreg001wb.sparesQty = this.f.sparesQty.value ? this.f.sparesQty.value : "";
        breakdownreg001wb.attendby = this.f.attendby.value ? this.f.attendby.value : "";
        breakdownreg001wb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
        breakdownreg001wb.filename = this.f.filename.value ? this.f.filename.value : "";
        if (this.slNo) {
            breakdownreg001wb.slNo = this.slNo;
            breakdownreg001wb.unitdepartslNo = this.unitdepartslNo;
            breakdownreg001wb.insertUser = this.insertUser;
            breakdownreg001wb.insertDatetime = this.insertDatetime;
            breakdownreg001wb.updatedUser = this.authManager.getcurrentUser.username;
            breakdownreg001wb.updatedDatetime = new Date();
            if (this.f.startTime.value < this.f.endTime.value) {
                this.breakDownRegManager.breakdownregUpdate(breakdownreg001wb, this.selectedFile).subscribe((response) => {
                    this.calloutService.showSuccess("BreakDown Register Updated Successfully");
                    this.loadData();
                    this.breakDownForm.reset();
                    this.slNo = null;
                    this.submitted = false;
                });
            } else {
                this.calloutService.showWarning("End time should be greater than Start Time");
            }
        } else {
            if (this.f.startTime.value < this.f.endTime.value) {
                breakdownreg001wb.unitdepartslNo = this.user.unitdepartslNo;
                breakdownreg001wb.insertUser = this.authManager.getcurrentUser.username;
                breakdownreg001wb.insertDatetime = new Date();
                this.breakDownRegManager.breakwnregSave(breakdownreg001wb, this.selectedFile).subscribe((response) => {
                    this.calloutService.showSuccess("BreakDown Register Saved Successfully");
                    this.loadData();
                    this.breakDownForm.reset();
                    this.submitted = false;
                });
            } else {
                this.calloutService.showWarning("End time should be greater than Start Time");
            }
        }
    }

    onReset() {
        this.submitted = false;
        this.breakDownForm.reset();
    }

    onChange() {
        this.breakDownForm.get('sslno').valueChanges.subscribe((value: any) => {
            for (let sparessets of this.sparesSettings) {
                if (sparessets.slNo == value) {
                    this.breakDownForm.patchValue({
                        'spareCost': sparessets.sparescost
                    });
                    break;
                }
            }
        });
    }

    onBreakDownChange(event: any) {
        this.rootcauses = [];
        this.rootCauseSettingManager.findAllbyBreakDownId(event.target.value).subscribe(response => {
            this.rootcauses = deserialize<Rootcause001mb[]>(Rootcause001mb, response);
        });
    }

    onRootCauseChange(event: any) {
        this.preventiveactionSettings = [];
        this.preventiveactionSettingManager.findAllbyRootCauseId(event.target.value).subscribe(response => {
            this.preventiveactionSettings = deserialize<Preventiveaction001mb[]>(Preventiveaction001mb, response);
        });
    }

    onGeneratePdfReport() {
        this.breakDownRegManager.breakDownPdf(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }

    onGenerateExcelReport() {
        this.breakDownRegManager.breakDownExcel(this.mslno).subscribe((response) => {
            if (this.machine001mb) {
                saveAs(response, this.machine001mb.mname);
            } else {
                saveAs(response, "download");
            }
        })
    }
}
