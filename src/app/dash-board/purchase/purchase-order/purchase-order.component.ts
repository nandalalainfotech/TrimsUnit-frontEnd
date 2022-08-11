import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
import { Supplierquotation001wb } from 'src/app/shared/services/restcontroller/entities/supplierquotation001wb ';
import { Companydetails001mb } from 'src/app/shared/services/restcontroller/entities/Companydetails001mb';
import { CompanyDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/Companydetails.service';
import { Consignee001mb } from 'src/app/shared/services/restcontroller/entities/Consignee001mb';
import { ConsigneeManager } from 'src/app/shared/services/restcontroller/bizservice/Consignee.service';
import { SearchFindComponent } from 'src/app/shared/search-find/search-find.component';
import { OrderAddItemComponent } from 'src/app/shared/order-add-item/order-add-item.component';
import { Orderitem001wb } from 'src/app/shared/services/restcontroller/entities/orderitem001wb';
import { OrderItemSettingManager } from 'src/app/shared/services/restcontroller/bizservice/orderItems.service';
import { OrderItemManager } from 'src/app/shared/services/restcontroller/bizservice/orderitem-wb.service';
import { data } from 'jquery';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { locales } from 'moment';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  purchaseOrderForm: FormGroup | any;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  slNo: number | any;
  suplierSlno?: number;
  suplierName: string = "";
  date?: Date;
  prsno: string = "";
  pono: string = "";
  remarks?: string | null;
  statusSlno?: number | null;
  qno?: string = "";
  dispatchThrough?: string = "";
  destination?: string = "";
  termsDelivery?: string = "";
  supplierFrom?: string = "";
  suplieraddress?: string = "";
  addPopup: string = "";
  partNo: string = "";
  status: string = "";
  getCount: any;
  dueOn: Date | any;
  amount: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;

  quantity: number | any;
  rate: number | any;
  order: Purchaseorder001wb[] = [];
  purchasereqs: Purchasereqslip001wb[] = [];
  supplierquotation001wbs: Supplierquotation001wb[] = [];
  supplierquotation001wb?: Supplierquotation001wb;
  companydetails: Companydetails001mb[] = [];
  consignees: Consignee001mb[] = [];
  orderitem001wbs: Orderitem001wb[] = [];
  orderitem001wb?: Orderitem001wb;
  orderitems: Orderitem001wb[] = [];
  supplierregs: Supplierregistration001mb[] = [];
  supplierregistration001mb?: Supplierregistration001mb;
  count: number = 0;
  suppliercodes: Supplierquotation001wb[] = [];
  supplierId: any = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private purchaseorderManager: PurchaseorderManager,
    private supplierRegManager: SupplierRegManager,
    private purchaseregslipManager: PurchasereqslipManager,
    private supplierQuotationManager: SupplierQuotationManager,
    private orderItemManager: OrderItemManager,
    private companyManager: CompanyDetailsManager,
    private consigneeManager: ConsigneeManager,
    private router: Router) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }


  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.supplierRegManager.allSupplier().subscribe(response => {
      this.supplierregs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
    });
    this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
      this.purchasereqs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
    });

    this.supplierQuotationManager.allSupplierQuotation().subscribe(response => {
      this.supplierquotation001wbs = deserialize<Supplierquotation001wb[]>(Supplierquotation001wb, response);
      for (let i = 0; i < this.supplierquotation001wbs.length; i++) {
        if (this.supplierquotation001wbs[i].status == "Approved") {
          this.suppliercodes.push(this.supplierquotation001wbs[i])

          // if (this.supplierregs[i].slNo == this.supplierquotation001wbs[i].supplierSlno) {
          //   let code = this.supplierregs[i].supplierCode
          //   this.supplierId.push(code);
          // }


        }
      }
    });

    this.companyManager.allcompany().subscribe(response => {
      this.companydetails = deserialize<Companydetails001mb[]>(Companydetails001mb, response);

    });

    this.consigneeManager.allconsignee().subscribe(response => {
      this.consignees = deserialize<Consignee001mb[]>(Consignee001mb, response);
    });

    this.createDataGrid001();

    this.loadData();

    this.purchaseOrderForm = this.formBuilder.group({
      suplierSlno: ['', Validators.required],
      suplierName: ['', Validators.required],
      suplieraddress: ['', Validators.required],
      date: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      prsno: ['', Validators.required],
      pono: ['', Validators.required],
      qno: ['',],
      remarks: ['',],
      statusSlno: ['',],
      dispatchThrough: ['', Validators.required],
      destination: ['', Validators.required],
      termsDelivery: ['', Validators.required],
      supplierFrom: ['', Validators.required],
      dueOn: ['', Validators.required],
      status: ['',],

    })

  }

  loadData() {
    this.purchaseorderManager.allpurchaseorder().subscribe(response => {
      this.order = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
      if (this.order.length > 0) {
        this.gridOptions?.api?.setRowData(this.order);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    this.purchaseorderManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.purchaseOrderForm.patchValue({
        pono: String("SE/PO/22-23/") + String(this.count).padStart(4, '0')
      });
    });
  }


  get f() { return this.purchaseOrderForm.controls }

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
        headerName: 'View',
        cellRenderer: 'iconRenderer',
        width: 60,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onViewButtonClick.bind(this),
          label: 'View',
        },

      },
      {
        headerName: 'Pdf',
        cellRenderer: 'iconRenderer',
        width: 60,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onPdfButtonClick.bind(this),
          label: 'Pdf',
        },

      },
      {
        headerName: 'Excel',
        cellRenderer: 'iconRenderer',
        width: 60,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEXcelButtonClick.bind(this),
          label: 'Excel',
        },

      },
      {
        headerName: 'Status',
        field: 'status',
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
      {
        headerName: 'supplier Code',
        field: "suplierSlno",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setConsigneeNo.bind(this)
      },
      {
        headerName: 'Supplier Name',
        field: "suplierName",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setConsigneeNo.bind(this)
      },
      {
        headerName: 'Consignee No',
        field: "suplieraddress",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setConsigneeNo.bind(this)
      },
      {
        headerName: 'PO No',
        field: "pono",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setVoucherNo.bind(this)
      },
      {
        headerName: 'Date',
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
        headerName: 'PRS No',
        field: "prsno",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setRefNo.bind(this)
      },
      
      {
        headerName: 'Quotation No',
        field: "qno",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Dispatch Through',
        field: 'dispatchThrough',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Destination',
        field: 'destination',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Terms Of Delivery',
        field: 'termsDelivery',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'supplier From',
        field: 'supplierFrom',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Due On',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.dueOn ? this.datepipe.transform(params.data.dueOn, 'dd-MM-yyyy') : '';
        }
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


    ];
  }

  // setInvoiceTo(params: any): string {
  //   return params.data.companySlno2 ? params.data.companySlno2.company : null;
  // }

  // setConsigneeNo(params: any): string {
  //   return params.data.consigneeSlno2 ? params.data.consigneeSlno2.consignee : null;
  // }
  rowClicked(params: any) {
    params.node.setData({
      ...params.data,
      name: true,
    });
  }

  getRowStyle(params) {
    if (params.data.status == 'Approved') {
      return { 'background-color': 'lightgreen' };
    } else if (params.data.status == 'Partially Approved') {
      return { 'background-color': '#FFFF00' };
    } else if (params.data.status == 'Hold') {
      return { 'background-color': 'lightblue' };
    } else if (params.data.status == 'Reject') {
      return { 'background-color': '#ff8080' };
    }
    return true;
  }



  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Purchase Order";
    modalRef.componentInstance.details = params.data
  }

  onChangeprsNo(event: any) {
    this.supplierQuotationManager.findOne(event.target.value).subscribe(response => {
      this.supplierquotation001wb = deserialize<Supplierquotation001wb>(Supplierquotation001wb, response);
    });
    const modalRef = this.modalService.open(OrderAddItemComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.prsNumber = event.target.value;
    modalRef.componentInstance.orderItems = this.orderitems;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.orderitems = data.orderItems;


      }
    })
  }

  onAddbuttonClick(object: any) {
    const modalRef = this.modalService.open(OrderAddItemComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.orderItems = this.orderitems;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.orderitems = data.orderItems;


      }
    })
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.purchaseOrderForm.patchValue({
      'companySlno': params.data.companySlno,
      'consigneeSlno': params.data.consigneeSlno,
      'date': new Date(params.data.date),
      'pono': params.data.pono,
      'refno': params.data.refno,
      'otherRef': params.data.otherRef,
      'dispatchThrough': params.data.dispatchThrough,
      'destination': params.data.destination,
      'termsDelivery': params.data.termsDelivery,
      'supplierFrom': params.data.supplierFrom,
      'hsn': params.data.hsn,
      'dueOn': new Date(params.data.dueOn),
      'status': params.data.status,


    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Purchase Order";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.purchaseorderManager.purchaseorderdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.order.length; i++) {
            if (this.order[i].slNo == params.data.slNo) {
              this.order?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Purchase Order Removed Successfully");
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

  onPurchaseOrderClick(event: any, purchaseOrderForm: any) {
    console.log("purchaseOrderForm",purchaseOrderForm);
    
    this.markFormGroupTouched(this.purchaseOrderForm);
    this.submitted = true;
    if (this.purchaseOrderForm.invalid) {
      return;
    }

    let purchaseorder001wb = new Purchaseorder001wb();
    purchaseorder001wb.suplierSlno = this.f.suplierSlno.value ? this.f.suplierSlno.value : "";
    purchaseorder001wb.suplierName = this.f.suplierName.value ? this.f.suplierName.value : "";
    purchaseorder001wb.date = new Date(this.f.date.value);
    purchaseorder001wb.pono = this.f.pono.value ? this.f.pono.value : "";
    purchaseorder001wb.suplieraddress = this.f.suplieraddress.value ? this.f.suplieraddress.value : "";
    purchaseorder001wb.prsno = this.f.prsno.value ? this.f.prsno.value : "Na";
    purchaseorder001wb.qno = this.f.qno.value ? this.f.qno.value : "";
    purchaseorder001wb.dispatchThrough = this.f.dispatchThrough.value ? this.f.dispatchThrough.value : "";
    purchaseorder001wb.destination = this.f.destination.value ? this.f.destination.value : "";
    purchaseorder001wb.termsDelivery = this.f.termsDelivery.value ? this.f.termsDelivery.value : "";
    purchaseorder001wb.supplierFrom = this.f.supplierFrom.value ? this.f.supplierFrom.value : "";
    purchaseorder001wb.remarks = this.f.remarks.value ? this.f.remarks.value : null;
    purchaseorder001wb.statusSlno = this.f.statusSlno.value ? this.f.statusSlno.value : null;
    purchaseorder001wb.dueOn = new Date(this.f.dueOn.value);
    purchaseorder001wb.orderitemSlno2 = this.orderitems;
    console.log("this.orderitems",this.orderitems);
    
    // for (let i = 0; i < this.orderitems.length; i++) {
    //   if (this.orderitems[i].totalamount > 1000) {
    //     purchaseorder001wb.status = "Request For Approval";
    //   }
    //   else {
    //     purchaseorder001wb.status = "Approval";
    //   }
    // }

    if (this.slNo) {
      purchaseorder001wb.slNo = this.slNo;
      purchaseorder001wb.unitdepartslNo = this.unitdepartslNo;
      purchaseorder001wb.insertUser = this.insertUser;
      purchaseorder001wb.insertDatetime = this.insertDatetime;
      purchaseorder001wb.updatedUser = this.authManager.getcurrentUser.username;
      purchaseorder001wb.updatedDatetime = new Date();
      this.purchaseorderManager.purchaseorderupdate(purchaseorder001wb).subscribe((response) => {
        this.calloutService.showSuccess("Purchase Order Updated Successfully");
        this.purchaseOrderForm.reset();
        this.purchaseOrderForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      purchaseorder001wb.date = new Date();
      purchaseorder001wb.dueOn = new Date();
      purchaseorder001wb.unitdepartslNo= this.user.unitdepartslNo;
      purchaseorder001wb.insertUser = this.authManager.getcurrentUser.username;
      purchaseorder001wb.insertDatetime = new Date();
      this.purchaseorderManager.purchaseordersave(purchaseorder001wb).subscribe((response) => {
        this.calloutService.showSuccess("Purchase Order Saved Successfully");
        this.purchaseOrderForm.reset();
        this.purchaseOrderForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.purchaseOrderForm.reset();
  }


  onChange(event: any) {

    this.supplierQuotationManager.findOne(event.target.value).subscribe(response => {
      this.supplierquotation001wb = deserialize<Supplierquotation001wb>(Supplierquotation001wb, response);
      this.purchaseOrderForm.patchValue({
        'suplierName': this.supplierquotation001wb.supliername,
        'suplieraddress': this.supplierquotation001wb.address,
         'termsDelivery': this.supplierquotation001wb.termsCondition,
        'qno': this.supplierquotation001wb.quotationNo,
      })
    });
  }

  onPurchaseOrderChange(event: any) {
    this.consignees = [];
    this.consigneeManager.findAllbyPurchaseOrderId(event.target.value).subscribe(response => {
      this.consignees = deserialize<Consignee001mb[]>(Consignee001mb, response);
    });
  }

  onViewClick() {
    this.purchaseorderManager.purchaseorderPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.purchaseorderManager.purchaseorderPdf().subscribe((response) => {

      saveAs(response, "Purchase Order");
    })
  }


  onGenerateExcelReport() {
    this.purchaseorderManager.purchaseorderExcel().subscribe((response) => {
      saveAs(response, "Purchase Order");
    })
  }

  onViewButtonClick(params: any) {
    this.purchaseorderManager.purchaseParamsPdf(params.data.slNo).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })

  }
  onPdfButtonClick(params: any) {
    this.purchaseorderManager.purchaseParamsPdf(params.data.slNo).subscribe((response) => {
      saveAs(response, "Purchase Order");
    })

  }
  onEXcelButtonClick(params: any) {
    this.purchaseorderManager.purchaseordersingleExcel(params.data.slNo).subscribe((response) => {
      saveAs(response, "Purchase Order");
    })

  }

  onStatusClick() {

    this.router.navigate(["/app-dash-board/app-approval/app-approval-request"]);
  }

}


