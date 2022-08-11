import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { saveAs } from 'file-saver';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PaymentManager } from 'src/app/shared/services/restcontroller/bizservice/Payment.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { SalesOrderManager } from 'src/app/shared/services/restcontroller/bizservice/Salesorder.service';
import { Payment001wb } from 'src/app/shared/services/restcontroller/entities/Payment001wb';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Salesorder001wb } from 'src/app/shared/services/restcontroller/entities/Salesorder001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  paymentForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  saleorderSlno: number | any;
  payDate: Date | any;
  payStatus: string = "";
  dueDate: Date | any;
  gstNo: number | any;
  gstPercent: string = "";
  gstAmount: number | any;
  totalAmount: number | any;
  remarks: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  sales: Salesorder001wb[] = [];
  payment: Payment001wb[] = [];
  orders: Purchaseorder001wb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;


  amount: number | any;

  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private salesOrderManager: SalesOrderManager,
    private paymentManager: PaymentManager,
    private purchaseorderManager: PurchaseorderManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.createDataGrid001();

    this.loadData();

    this.paymentForm = this.formBuilder.group({
      saleorderSlno: ['', Validators.required],
      payDate: ['', Validators.required],
      payStatus: ['', Validators.required],
      dueDate: ['', Validators.required],
      gstNo: ['', Validators.required],
      gstPercent: ['', Validators.required],
      gstAmount: ['', Validators.required],
      totalAmount: ['', Validators.required],
      remarks: ['', Validators.required],

      amount: [''],
    })

    this.salesOrderManager.allsale().subscribe(response => {
      this.sales = deserialize<Salesorder001wb[]>(Salesorder001wb, response);
    });

    this.purchaseorderManager.allpurchaseorder().subscribe(response => {
      this.orders = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
    });

  }

  loadData() {
    this.paymentManager.allpayment().subscribe(response => {
      this.payment = deserialize<Payment001wb[]>(Payment001wb, response);
      if (this.payment.length > 0) {
        this.gridOptions?.api?.setRowData(this.payment);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.paymentForm.controls }

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
        headerName: 'Invoice No',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setInvoice.bind(this)
      },
      {
        headerName: 'Invoice Amount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setAmount.bind(this)
      },
      {
        headerName: 'Payment Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.payDate ? this.datepipe.transform(params.data.payDate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Payment Status',
        field: 'payStatus',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Due Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.dueDate ? this.datepipe.transform(params.data.dueDate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'GST No',
        field: 'gstNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GST Percentage',
        field: 'gstPercent',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GST Amount',
        field: 'gstAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Total Amount',
        field: 'totalAmount',
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

  setInvoice(params: any): string {
    return params.data.saleorderSlno2 ? params.data.saleorderSlno2.invoiceNo : null;
  }

  setAmount(params: any): string {
    return params.data.saleorderSlno2.porderSlno2 ? params.data.saleorderSlno2.porderSlno2.amount : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Payment";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.paymentForm.patchValue({
      'saleorderSlno': params.data.saleorderSlno,
      'payDate': new Date(params.data.payDate),
      'payStatus': params.data.payStatus,
      'dueDate': new Date(params.data.dueDate),
      'gstNo': params.data.gstNo,
      'gstPercent': params.data.gstPercent,
      'gstAmount': params.data.gstAmount,
      'totalAmount': params.data.totalAmount,
      'remarks': params.data.remarks,

      'amount': params.data.saleorderSlno2.porderSlno2.amount,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Payment";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.paymentManager.paymentDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.payment.length; i++) {
            if (this.payment[i].slNo == params.data.slNo) {
              this.payment?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Payment Removed Successfully");
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

  onpaymentClick(event: any, paymentForm: any) {
    this.markFormGroupTouched(this.paymentForm);
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }

    let payment001wb = new Payment001wb();
    payment001wb.saleorderSlno = this.f.saleorderSlno.value ? this.f.saleorderSlno.value : "";
    payment001wb.payDate = new Date(this.f.payDate.value);
    payment001wb.payStatus = this.f.payStatus.value ? this.f.payStatus.value : "";
    payment001wb.dueDate = new Date(this.f.dueDate.value);
    payment001wb.gstNo = this.f.gstNo.value ? this.f.gstNo.value : "";
    payment001wb.gstPercent = this.f.gstPercent.value ? this.f.gstPercent.value : "";
    payment001wb.gstAmount = this.f.gstAmount.value ? this.f.gstAmount.value : "";
    payment001wb.totalAmount = this.f.totalAmount.value ? this.f.totalAmount.value : "";
    payment001wb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
    if (this.slNo) {
      payment001wb.slNo = this.slNo;
      payment001wb.unitdepartslNo = this.unitdepartslNo;
      payment001wb.insertUser = this.insertUser;
      payment001wb.insertDatetime = this.insertDatetime;
      payment001wb.updatedUser = this.authManager.getcurrentUser.username;
      payment001wb.updatedDatetime = new Date();
      this.paymentManager.paymentUpdate(payment001wb).subscribe((response) => {
        this.calloutService.showSuccess("Payment Updated Successfully");
        this.paymentForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      payment001wb.unitdepartslNo= this.user.unitdepartslNo;
      payment001wb.insertUser = this.authManager.getcurrentUser.username;
      payment001wb.insertDatetime = new Date();
      this.paymentManager.paymentSave(payment001wb).subscribe((response) => {
        this.calloutService.showSuccess("Payment Saved Successfully");
        this.paymentForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.paymentForm.reset();
  }

  onPayClick() {
    // this.paymentForm.get('saleorderSlno').valueChanges.subscribe((value: any) => {
    //   for (let order of this.sales) {
    //     if (order.slNo == value) {
    //       this.paymentForm.patchValue({
    //         'amount': order.porderSlno2?.amount,
    //       });
    //       break;
    //     }
    //   }
    // });
  }


  onBlurEvent(event: any) {
    let amount: number = this.f.amount.value ? this.f.amount.value : 0;
    let gstPercent: number = this.f.gstPercent.value ? this.f.gstPercent.value : 0;
    let gstAmount = amount * (gstPercent / 100);
    let totalAmount = gstAmount + amount;
    this.paymentForm.patchValue({
      'gstAmount': gstAmount,
      'totalAmount': totalAmount
    })
  }

  onViewClick() {
    this.paymentManager.paymentPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.paymentManager.paymentPdf().subscribe((response) => {
      saveAs(response, "payment");
    })
  }

  onGenerateExcelReport() {
    this.paymentManager.paymentExcel().subscribe((response) => {
      saveAs(response, "payment");
    })
  }

}