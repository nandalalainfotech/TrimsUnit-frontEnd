import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { BreakDownRegManager } from 'src/app/shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { DailyChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/Dailycecklist.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventiveChecklistManager } from 'src/app/shared/services/restcontroller/bizservice/preventivechecklist.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { Breakdownreg001wb } from 'src/app/shared/services/restcontroller/entities/Breakdownreg001wb';
import { Dailychecklist001wb } from 'src/app/shared/services/restcontroller/entities/Dailychecklist001wb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventivechecklist001wb } from 'src/app/shared/services/restcontroller/entities/preventivechecklist001wb';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { saveAs } from 'file-saver';
import { MachineReportsManager } from 'src/app/shared/services/restcontroller/bizservice/machine-reports.service';

@Component({
  selector: 'app-machine-reports',
  templateUrl: './machine-reports.component.html',
  styleUrls: ['./machine-reports.component.css']
})
export class MachineReportsComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  public gridOptions1: GridOptions | any;
  public gridOptions2: GridOptions | any;
  public gridOptions3: GridOptions | any;
  machineSettings: Machine001mb[] = [];
  machine001mb?: Machine001mb;
  preventiveplans: Preventiveplan001wb[] = [];
  preventiveplan001wb?: Preventiveplan001wb;
  preventchecks: Preventivechecklist001wb[] = [];
  dailychecks: Dailychecklist001wb[] = [];
  breakdownregs: Breakdownreg001wb[] = [];
  breakdownreg001wb?: Breakdownreg001wb;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private preventivePlanManager: PreventivePlanManager,
    private preventiveChecklistManager: PreventiveChecklistManager,
    private machineSettingManager: MachineSettingManager,
    private dailyChecklistManager: DailyChecklistManager,
    private machineReportsManager: MachineReportsManager,
    private breakDownRegManager: BreakDownRegManager,
    private datepipe: DatePipe,
    private http: HttpClient,

  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();
    this.createDataGrid002();
    this.createDataGrid003();
    this.createDataGrid004();

    this.route.queryParams.subscribe(params => {
      this.mslno = params.mslno;
      this.machineSettingManager.findOne(this.mslno).subscribe(response => {
        this.machine001mb = deserialize<Machine001mb>(Machine001mb, response);
      });
    });

    this.preventivePlanManager.findAllByMachineId(this.mslno).subscribe(response => {
      this.preventiveplans = deserialize<Preventiveplan001wb[]>(Preventiveplan001wb, response);
      if (this.preventiveplans.length > 0) {
        this.gridOptions?.api?.setRowData(this.preventiveplans);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.preventiveChecklistManager.findAllByMachineId(this.mslno).subscribe(response => {
      this.preventchecks = deserialize<Preventivechecklist001wb[]>(Preventivechecklist001wb, response);
      if (this.preventchecks.length > 0) {
        this.gridOptions1?.api?.setRowData(this.preventchecks);
      } else {
        this.gridOptions1?.api?.setRowData([]);
      }
    });

    this.dailyChecklistManager.findAllByMachineId(this.mslno).subscribe(response => {
      this.dailychecks = deserialize<Dailychecklist001wb[]>(Dailychecklist001wb, response);
      if (this.dailychecks.length > 0) {
        this.gridOptions2?.api?.setRowData(this.dailychecks);
      } else {
        this.gridOptions2?.api?.setRowData([]);
      }
    });


    this.breakDownRegManager.findAllByMachineId(this.mslno).subscribe(response => {
      this.breakdownregs = deserialize<Breakdownreg001wb[]>(Breakdownreg001wb, response);
      if (this.breakdownregs.length > 0) {
        this.gridOptions3?.api?.setRowData(this.breakdownregs);
      } else {
        this.gridOptions3?.api?.setRowData([]);
      }
    });
  }
  mslno(mslno: any) {
    throw new Error('Method not implemented.');
  }


  // ---------------preventive-plan-grid---------------------

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
        field: 'date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
    ];
  }

  setMachineCode(params: any): string {
    return params.data.mslno2 ? params.data.mslno2.mcode : null;
  }

  setMachineName(params: any): string {
    return params.data.mslno2 ? params.data.mslno2.mname : null;
  }

  // -------------preventive-checklist-grid-----------------------

  createDataGrid002(): void {

    this.gridOptions1 = {
      paginationPageSize: 10,
      rowSelection: 'single',
    };
    this.gridOptions1.editType = 'fullRow';
    this.gridOptions1.enableRangeSelection = true;
    this.gridOptions1.animateRows = true;
    this.gridOptions1.columnDefs = [
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
        headerName: 'Check Points Date',
        field: 'checkpointdate',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Observation',
        field: 'observation',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
    ];
  }

  setCheckPoints(params: any): string {
    return params.data.cpslno2 ? params.data.cpslno2.checkpoints : "fails";
  }


  // --------------daily-check-grid-------------------

  createDataGrid003(): void {
    this.gridOptions2 = {
      paginationPageSize: 10,
      rowSelection: 'single',
    };
    this.gridOptions2.editType = 'fullRow';
    this.gridOptions2.enableRangeSelection = true;
    this.gridOptions2.animateRows = true;
    this.gridOptions2.columnDefs = [

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
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datepipe.transform(params.data.date, 'MM-dd-yyyy') : '';
        }
      },
    ];
  }


  // ---------------breakdown-reg-grid-------------------

  createDataGrid004(): void {
    this.gridOptions3 = {
      paginationPageSize: 10,
      rowSelection: 'single',
    };
    this.gridOptions3.editType = 'fullRow';
    this.gridOptions3.enableRangeSelection = true;
    this.gridOptions3.animateRows = true;
    this.gridOptions3.columnDefs = [
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
        field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

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
        headerName: 'Total Spares Cost',
        field: 'spareCost',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setSparesCost.bind(this)
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
    ];
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

  onViewClick() {
    // const modalReference = this.modalService.open(PreventiveplanViewComponent, {size: "lg"});
    // modalReference.componentInstance.title = "List Of Machines";
    // modalReference.componentInstance.preventiveplans= this.preventiveplan001wb;
    this.machineReportsManager.machineReportsPdf(this.mslno).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })

  }


  //  ------PDF FILE --------//

  onGeneratePdfReport() {
    this.machineReportsManager.machineReportsPdf(this.mslno).subscribe((response) => {
      if (this.machine001mb) {
        saveAs(response, this.machine001mb.mname);
      } else {
        saveAs(response, "download");
      }
    })
  }

  //  ------EXCEL FILE --------//

  onGenerateExcelReport() {
    this.machineReportsManager.machineReportsExcel(this.mslno).subscribe((response) => {
      if (this.machine001mb) {
        saveAs(response, this.machine001mb.mname);
      } else {
        saveAs(response, "download");
      }
    })
  }
}  