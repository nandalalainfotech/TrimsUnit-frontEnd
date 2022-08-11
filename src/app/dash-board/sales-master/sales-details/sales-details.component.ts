import { getNumberOfCurrencyDigits } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LayoutGapDirective } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { count, select } from 'd3';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OrderItemSettingManager } from 'src/app/shared/services/restcontroller/bizservice/orderItems.service';
import { Orderitem001mb } from 'src/app/shared/services/restcontroller/entities/Orderitem001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { SalesMasterManager } from 'src/app/shared/services/restcontroller/bizservice/salesmaster.service';
import { Salesitem001mb } from 'src/app/shared/services/restcontroller/entities/Salesitemmb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  salesItemForm: FormGroup | any;
  slNo: number | any;
  submitted = false;
  procode: string = "";
  proname: string = "";
  prodescrip: string = "";
  proqunty: string = "";
  prounitamount: number | any;
  prouom: string = "";
  progst: number | any;
  getCount: any;
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  ItemSetting: Salesitem001mb[] = [];
  salesitem001mbs: Salesitem001mb[] = [];
  count: number = 0;
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private salesMasterManager: SalesMasterManager,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.createDataGrid001();
    this.salesItemForm = this.formBuilder.group({
      procode: ['', Validators.required],
      proname: ['', Validators.required],
      prodescrip: ['', Validators.required],
      prounitamount: ['', Validators.required],
      prouom: ['', Validators.required],
      progst: ['', Validators.required],
      proqunty: ['', Validators.required],
    })
    this.loadData();
  }
  loadData() {
    this.salesMasterManager.allproduct().subscribe(response => {  
      this.salesitem001mbs = deserialize<Salesitem001mb[]>(Salesitem001mb, response);
      if (this.salesitem001mbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.salesitem001mbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.salesMasterManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.salesItemForm.patchValue({
        procode: String("IC") + String(this.count).padStart(4, '0')
      });
    });
  }

  get f() { return this.salesItemForm.controls; }

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
        headerName: 'Pro Code',
        field: 'procode',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Pro Name',
        field: 'proname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Discription',
        field: 'prodescrip',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'UOM',
        field: 'prouom',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quantity',
        field: 'proqunty',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GST',
        field: 'progst',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Unit Rate',
        field: 'prounitamount',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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
    this.salesItemForm.patchValue({
      'procode': params.data.procode,
      'proname': params.data.proname,
      'prodescrip': params.data.prodescrip,
      'prounitamount': params.data.prounitamount,
      'proqunty': params.data.proqunty,
      'prouom': params.data.prouom,
      'progst': params.data.gst,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.salesMasterManager.productDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.salesitem001mbs.length; i++) {
            if (this.salesitem001mbs[i].slNo == params.data.slNo) {
              this.salesitem001mbs?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Item Details Removed Successfully");
        });
      }
    })
  }
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Item  Audit Report";
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

  onSlaseClick(event: any, salesItemForm: any) {
    this.markFormGroupTouched(this.salesItemForm);
    this.submitted = true;
    if (this.salesItemForm.invalid) {
      return;
    }

    let salesitem001mb = new Salesitem001mb();
    salesitem001mb.procode = this.f.procode.value ? this.f.procode.value : "";
    salesitem001mb.proname = this.f.proname.value ? this.f.proname.value : "";
    salesitem001mb.prodescrip = this.f.prodescrip.value ? this.f.prodescrip.value : "";
    salesitem001mb.prounitamount = this.f.prounitamount.value ? this.f.prounitamount.value : "";
    salesitem001mb.proqunty = this.f.proqunty.value ? this.f.proqunty.value : "";
    salesitem001mb.progst = this.f.progst.value ? this.f.progst.value : "";
    salesitem001mb.prouom = this.f.prouom.value ? this.f.prouom.value : "";


    if (this.slNo) {
      salesitem001mb.slNo = this.slNo;
      salesitem001mb.unitdepartslNo = this.unitdepartslNo;
      salesitem001mb.insertUser = this.insertUser;
      salesitem001mb.insertDatetime = this.insertDatetime;
      salesitem001mb.updatedUser = this.authManager.getcurrentUser.username;
      salesitem001mb.updatedDatetime = new Date();
      this.salesMasterManager.productUpdate(salesitem001mb).subscribe((response) => {
        this.calloutService.showSuccess("Sales products Details Updated Successfully");
        this.loadData();
        this.salesItemForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      salesitem001mb.unitdepartslNo= this.user.unitdepartslNo;
      salesitem001mb.insertUser = this.authManager.getcurrentUser.username;
      salesitem001mb.insertDatetime = new Date();
      this.salesMasterManager.productSave(salesitem001mb).subscribe((response) => {
        this.calloutService.showSuccess("Sales Product Details Saved Successfully");
        this.loadData();
        this.salesItemForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.salesItemForm.reset();
  }

  onViewClick() {
    this.salesMasterManager.productPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.salesMasterManager.productPdf().subscribe((response) => {
      saveAs(response, "Item-Details");
    })
  }

  onGenerateExcelReport() {
    this.salesMasterManager.productExcel().subscribe((response) => {
      saveAs(response, "Item-Details");
    });
  }

}

