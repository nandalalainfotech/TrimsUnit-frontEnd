import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { SalesOrderManager } from 'src/app/shared/services/restcontroller/bizservice/Salesorder.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Salesorder001wb } from 'src/app/shared/services/restcontroller/entities/Salesorder001wb';
import { Supplierquotation001wb } from 'src/app/shared/services/restcontroller/entities/supplierquotation001wb ';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { CustemerAddComponent } from 'src/app/shared/custemer-add/custemer-add.component';
import { Salesinvoice001wb } from 'src/app/shared/services/restcontroller/entities/Salesinvoice001wb';
import { Custemerregistration001mb } from 'src/app/shared/services/restcontroller/entities/Custemerregistration001mb';
import { SalesInvoiceManager } from 'src/app/shared/services/restcontroller/bizservice/salesinvoice.service';
import { CustmerRegManager } from 'src/app/shared/services/restcontroller/bizservice/CustemerRegistration.service';
import { Custemer001wb } from 'src/app/shared/services/restcontroller/entities/Custemer001wb';
import { OrderAddItemComponent } from 'src/app/shared/order-add-item/order-add-item.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {


  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slaesInvocieForm: FormGroup | any;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  slNo: number | any;
  custmrSlno: number | any;
  consignee: string = "";
  date: Date | any;
  purreqSlno: number | any;
  addPopup: string = "";
  pono: string = "";
  refno: string = "";
  otherRef: string = "";
  dispatchThrough: string = "";
  destination: string = "";
  termsDelivery: string = "";
  supplierFrom: string = "";
  hsn: string = "";
  partNo: string = "";
  remarks?: string | null;
  statusSlno?: number | null;
  status: string = "";
  getCount: any;
  dueOn: Date | any;
  amount: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  salesinvoice: Salesinvoice001wb[] = [];
  Custemerregs: Custemerregistration001mb[] = [];
  Custemerreg?:Custemerregistration001mb;
  Custemer001wbs: Custemer001wb[] = [];
  Custemer001wb?: Custemer001wb;
  custemeregs: any
  count: number = 0;
  custemeradds: any;
  user?: Login001mb | any;
  unitdepartslNo: number | any;



  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private salesInvoiceManager: SalesInvoiceManager,
    private custmerRegManager: CustmerRegManager,
    private router: Router) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }


  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.createDataGrid001();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.loadData();
    this.slaesInvocieForm = this.formBuilder.group({
      custmrSlno: ['',],
      consignee: ['',],
      date: ['', Validators.required],
      otherRef: ['', Validators.required],
      pono: ['', Validators.required],
      refno: ['',],
      remarks: ['',],
      statusSlno: ['',],
      dispatchThrough: ['', Validators.required],
      destination: ['', Validators.required],
      termsDelivery: ['', Validators.required],
      supplierFrom: ['', Validators.required],
      hsn: ['', Validators.required],
      dueOn: ['', Validators.required],



    })

    this.custmerRegManager.allCustmerreg().subscribe(response => {
      this.Custemerregs = deserialize<Custemerregistration001mb[]>(Custemerregistration001mb, response);
    });


  }

  loadData() {

    this.salesInvoiceManager.allsalesinvoice().subscribe(response => {
      this.salesinvoice = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
      if (this.salesinvoice.length > 0) {
        this.gridOptions?.api?.setRowData(this.salesinvoice);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    this.salesInvoiceManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.slaesInvocieForm.patchValue({
        pono: String("GST/2708/22-23/") + String(this.count).padStart(4, '0')
      });
    });
  }



  get f() { return this.slaesInvocieForm.controls }

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
        headerName: 'Invoice To',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setInvoiceTo.bind(this)
      },
      {
        headerName: 'Consignee No',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setConsigneeNo.bind(this)
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
        headerName: 'Reference No',
        field: "refno",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setRefNo.bind(this)
      },
      {
        headerName: 'Other Reference',
        field: "otherRef",
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
        headerName: 'HSN/SAC',
        field: 'hsn',
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

  setInvoiceTo(params: any): string {
    return params.data.custmrSlno2 ? params.data.custmrSlno2.custemername : null;
  }

  setConsigneeNo(params: any): string {
    return params.data.custmrSlno2 ? params.data.custmrSlno2.consignee : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Purchase Order";
    modalRef.componentInstance.details = params.data
  }

  onAddbuttonClick(object: any) {
    const modalRef = this.modalService.open(CustemerAddComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.custemeradds = this.custemeradds;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        console.log("data",data);
        
        this.custemeradds = data.custemeradds;
        console.log(" this.orderitems", this.custemeradds);
        
      }
    })
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.slaesInvocieForm.patchValue({
      'custmrSlno': params.data.custmrSlno,
      'consignee': params.data.consignee,
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



    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Purchase Order";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.salesInvoiceManager.salesinvoicedelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.salesinvoice.length; i++) {
            if (this.salesinvoice[i].slNo == params.data.slNo) {
              this.salesinvoice?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Sales Invoices Removed Successfully");
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

  onPurchaseOrderClick(event: any, slaesInvocieForm: any) {
    this.markFormGroupTouched(this.slaesInvocieForm);
    this.submitted = true;
    if (this.slaesInvocieForm.invalid) {
      return;
    }

    let salesinvoice001wb = new Salesinvoice001wb();
    salesinvoice001wb.custmrSlno = this.f.custmrSlno.value ? this.f.custmrSlno.value : "";
    salesinvoice001wb.consignee = this.f.consignee.value ? this.f.consignee.value : "";
    salesinvoice001wb.date = new Date(this.f.date.value);
    salesinvoice001wb.pono = this.f.pono.value ? this.f.pono.value : "";
    salesinvoice001wb.refno = this.f.refno.value ? this.f.refno.value : "Na";
    salesinvoice001wb.otherRef = this.f.otherRef.value ? this.f.otherRef.value : "";
    salesinvoice001wb.dispatchThrough = this.f.dispatchThrough.value ? this.f.dispatchThrough.value : "";
    salesinvoice001wb.destination = this.f.destination.value ? this.f.destination.value : "";
    salesinvoice001wb.termsDelivery = this.f.termsDelivery.value ? this.f.termsDelivery.value : "";
    salesinvoice001wb.supplierFrom = this.f.supplierFrom.value ? this.f.supplierFrom.value : "";
    salesinvoice001wb.hsn = this.f.hsn.value ? this.f.hsn.value : "";
    salesinvoice001wb.remarks = this.f.remarks.value ? this.f.remarks.value : null;
    salesinvoice001wb.statusSlno = this.f.statusSlno.value ? this.f.statusSlno.value : null;
    salesinvoice001wb.dueOn = new Date(this.f.dueOn.value);
    salesinvoice001wb.custemerSlno2 = this.custemeradds;
    if (this.slNo) {
      salesinvoice001wb.slNo = this.slNo;
      salesinvoice001wb.unitdepartslNo = this.unitdepartslNo;
      salesinvoice001wb.insertUser = this.insertUser;
      salesinvoice001wb.insertDatetime = this.insertDatetime;
      salesinvoice001wb.updatedUser = this.authManager.getcurrentUser.username;
      salesinvoice001wb.updatedDatetime = new Date();
      this.salesInvoiceManager.salesinvoiceupdate(salesinvoice001wb).subscribe((response) => {
        this.calloutService.showSuccess("Sales Invoices Updated Successfully");
        this.slaesInvocieForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      salesinvoice001wb.date = new Date();
      salesinvoice001wb.dueOn = new Date();
      salesinvoice001wb.unitdepartslNo= this.user.unitdepartslNo;
      salesinvoice001wb.insertUser = this.authManager.getcurrentUser.username;
      salesinvoice001wb.insertDatetime = new Date();
      console.log("salesinvoice001wb===========>>>",salesinvoice001wb);
      
      this.salesInvoiceManager.salesinvoicesave(salesinvoice001wb).subscribe((response) => {
        this.calloutService.showSuccess("Sales Invoices Saved Successfully");
        this.slaesInvocieForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.slaesInvocieForm.reset();
  }




  // onPurchaseOrderChange(event: any) {
  //     this.consignees = [];
  //     this.consigneeManager.findAllbyPurchaseOrderId(event.target.value).subscribe(response => {
  //       this.consignees = deserialize<Consignee001mb[]>(Consignee001mb, response);
  //     });
  // }

  onViewClick() {
    this.salesInvoiceManager.salesinvoicePdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.salesInvoiceManager.salesinvoicePdf().subscribe((response) => {

      saveAs(response, "Sales Invoice.Pdf");
    })
  }


  onGenerateExcelReport() {
    this.salesInvoiceManager.salesinvoiceExcel().subscribe((response) => {
      saveAs(response, "Sales Invoice");
    })
  }

  onViewButtonClick(params: any) {
    this.salesInvoiceManager.salesinvoiceParamsPdf(params.data.slNo).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })

  }
  onPdfButtonClick(params: any) {
    this.salesInvoiceManager.salesinvoiceParamsPdf(params.data.slNo).subscribe((response) => {
      saveAs(response, "Sales Invoice.Pdf");
    })

  }
  onEXcelButtonClick(params: any) {
    this.salesInvoiceManager.salesinvoicesingleExcel(params.data.slNo).subscribe((response) => {
      saveAs(response, "Sales Invoice");
    })

  }

  onStatusClick() {

    this.router.navigate(["/app-dash-board/app-approval/app-approval-request"]);
  }

}