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
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  ItemForm: FormGroup | any;
  slNo: number | any;
  submitted = false;
  itemcode: string = "";
  itemname: string = "";
  descrip: string = "";
  qunty: string = "";
  hsn: string = "";
  unitamount: number | any;
  uom: string = "";
  gst: number | any;
  getCount: any;
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  ItemSetting: Orderitem001mb[] = [];
  orderitem001mbs: Orderitem001mb[] = [];
  count: number = 0;
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private orderItemSettingManager: OrderItemSettingManager,
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
    this.ItemForm = this.formBuilder.group({
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      descrip: ['', Validators.required],
      unitamount: ['', Validators.required],
      uom: ['', Validators.required],
      gst: ['', Validators.required],
      qunty: ['', Validators.required],
      hsn: ['', Validators.required],
    })
    this.loadData();
  }
  loadData() {
    this.orderItemSettingManager.allitem().subscribe(response => {
      this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);
      if (this.orderitem001mbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.orderitem001mbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.orderItemSettingManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.ItemForm.patchValue({
        itemcode: String("IC") + String(this.count).padStart(4, '0')
      });
    });
  }

  get f() { return this.ItemForm.controls; }

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
        headerName: 'Item Code',
        field: 'itemcode',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Item Name',
        field: 'itemname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Discription',
        field: 'descrip',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'UOM',
        field: 'uom',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quantity',
        field: 'qunty',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GST',
        field: 'gst',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Unit Rate',
        field: 'unitamount',
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
    this.ItemForm.patchValue({
      'itemcode': params.data.itemcode,
      'itemname': params.data.itemname,
      'descrip': params.data.descrip,
      'unitamount': params.data.unitamount,
      'qunty': params.data.qunty,
      'uom': params.data.uom,
      'gst': params.data.gst,
      'hsn': params.data.hsn,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.orderItemSettingManager.itemDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.orderitem001mbs.length; i++) {
            if (this.orderitem001mbs[i].slNo == params.data.slNo) {
              this.orderitem001mbs?.splice(i, 1);
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

  onPurchaseableClick(event: any, ItemForm: any) {
    this.markFormGroupTouched(this.ItemForm);
    this.submitted = true;
    if (this.ItemForm.invalid) {
      return;
    }

    let orderitem001mb = new Orderitem001mb();
    orderitem001mb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : "";
    orderitem001mb.itemname = this.f.itemname.value ? this.f.itemname.value : "";
    orderitem001mb.descrip = this.f.descrip.value ? this.f.descrip.value : "";
    orderitem001mb.unitamount = this.f.unitamount.value ? this.f.unitamount.value : "";
    orderitem001mb.qunty = this.f.qunty.value ? this.f.qunty.value : "";
    orderitem001mb.gst = this.f.gst.value ? this.f.gst.value : "";
    orderitem001mb.uom = this.f.uom.value ? this.f.uom.value : "";
    orderitem001mb.hsn = this.f.hsn.value ? this.f.hsn.value : "";


    if (this.slNo) {
      orderitem001mb.slNo = this.slNo;
      orderitem001mb.unitdepartslNo = this.unitdepartslNo;
      orderitem001mb.insertUser = this.insertUser;
      orderitem001mb.insertDatetime = this.insertDatetime;
      orderitem001mb.updatedUser = this.authManager.getcurrentUser.username;
      orderitem001mb.updatedDatetime = new Date();
      this.orderItemSettingManager.itemUpdate(orderitem001mb).subscribe((response) => {
        this.calloutService.showSuccess("OrderItem Details Updated Successfully");
        this.loadData();
        this.ItemForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      orderitem001mb.unitdepartslNo= this.user.unitdepartslNo;
      orderitem001mb.insertUser = this.authManager.getcurrentUser.username;
      orderitem001mb.insertDatetime = new Date();
      this.orderItemSettingManager.itemSave(orderitem001mb).subscribe((response) => {
        this.calloutService.showSuccess("OrderItem Details Saved Successfully");
        this.loadData();
        this.ItemForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.ItemForm.reset();
  }

  onViewClick() {
    this.orderItemSettingManager.itemPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.orderItemSettingManager.itemPdf().subscribe((response) => {
      saveAs(response, "Item-Details");
    })
  }

  onGenerateExcelReport() {
    this.orderItemSettingManager.itemExcel().subscribe((response) => {
      saveAs(response, "Item-Details");
    });
  }

}


