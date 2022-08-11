import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import * as saveAs from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MaterialStockManager } from 'src/app/shared/services/restcontroller/bizservice/materialStock.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Materialinward001wb } from 'src/app/shared/services/restcontroller/entities/Materialinward001wb';
import { MaterialStock001wb } from 'src/app/shared/services/restcontroller/entities/stock001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
  selector: 'app-material-stock',
  templateUrl: './material-stock.component.html',
  styleUrls: ['./material-stock.component.css']
})
export class MaterialStockComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  materialStockForm: FormGroup | any;
  submitted = false;
  slNo?: number | any;
  cname?: string;
  proname?: string;
  recdate?: Date;
  outdate?: string;
  loc?: string;
  minDate = new Date();
  maxDate = new Date();
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;

  stocks: MaterialStock001wb [] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;


  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private materialStockManager: MaterialStockManager,
    private datepipe: DatePipe) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.createDataGrid001();

    this.loadData();


    this.materialStockForm = this.formBuilder.group({
      cname: ['', Validators.required],
      proname: ['', Validators.required],
      recdate: ['', Validators.required],
      outdate: ['', Validators.required],
      loc: ['', Validators.required],   
    })


  }


  get f() { return this.materialStockForm.controls }

  loadData() {
    this.materialStockManager.materialstockfindall().subscribe(response => {
      this.stocks = deserialize<Materialinward001wb[]>(Materialinward001wb, response);
      if (this.stocks.length > 0) {
        this.gridOptions?.api?.setRowData(this.stocks);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });


  }

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
        headerName: 'Sl No',
        field: 'slNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'D.C No',
        field: 'dcNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'D.C Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Supplier Name',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'RM Description',
        field: 'description',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Advised Quantity',
        field: 'advisedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Received Quantity',
        field: 'receivedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Accepted Quantity',
        field: 'acceptedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Rejected Quantity',
        field: 'rejectedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Goods Received Number',
        field: 'grm',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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

 

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Material Stock Record";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.materialStockForm.patchValue({
      'cname': params.data.cname,
      'proname': params.data.proname,
      'recdate': new Date(params.data.recdate),
      'outdate': new Date(params.data.outdate),
      'loc': params.data.loc,
    });
  }


 

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Material Inward Record";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.materialStockManager.materialstockDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.stocks.length; i++) {
            if (this.stocks[i].slNo == params.data.slNo) {
              this.stocks?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Material Stock Record Removed Successfully");
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

  onMaterialStockClick(event: any, materialStockForm: any) {
    this.markFormGroupTouched(this.materialStockForm);
    this.submitted = true;
    if (this.materialStockForm.invalid) {
      return;
    }

    let materialStock001wb = new MaterialStock001wb();
    materialStock001wb.cname = this.f.cname.value ? this.f.cname.value : "";
    materialStock001wb.recdate = new Date(this.f.recdate.value);
    materialStock001wb.proname = this.f.proname.value ? this.f.proname.value : "";
    materialStock001wb.outdate = this.f.outdate.value ? this.f.outdate.value : "";
    materialStock001wb.loc = this.f.loc.value ? this.f.loc.value : "";   
    if (this.slNo) {
      materialStock001wb.slNo = this.slNo;
      materialStock001wb.unitdepartslNo = this.unitdepartslNo;
      materialStock001wb.insertUser = this.insertUser;
      materialStock001wb.insertDatetime = this.insertDatetime;
      materialStock001wb.updatedUser = this.authManager.getcurrentUser.username;
      materialStock001wb.updatedDatetime = new Date();
      this.materialStockManager.materialstockUpdate(materialStock001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Inward Record Updated Successfully");
        this.materialStockForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      // materialinward001wb.date = new Date();
      // materialinward001wb.dcDate = new Date();
      materialStock001wb.unitdepartslNo= this.user.unitdepartslNo;
      materialStock001wb.insertUser = this.authManager.getcurrentUser.username;
      materialStock001wb.insertDatetime = new Date();
      this.materialStockManager.materialstockSave(materialStock001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Inward Record Saved Successfully");
        this.materialStockForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.materialStockForm.reset();
  }

 

  onViewClick() {
    this.materialStockManager.materialstockPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.materialStockManager.materialstockPdf().subscribe((response) => {
      saveAs(response, "Material_Inward_Details");
    })
  }

  onGenerateExcelReport() {
    this.materialStockManager.materialstockExcel().subscribe((response) => {
      saveAs(response, "Material_Inward_Details");
    });
  }


}
