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
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
    selector: 'app-sales-order',
    templateUrl: './sales-order.component.html',
    styleUrls: ['./sales-order.component.css']
})

export class SalesOrderComponent implements OnInit {

    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    salesOrderForm: FormGroup | any;
    submitted = false;
    minDate = new Date();
    maxDate = new Date();
    slNo: number | any;
    porderSlno: number | any;
    invoiceNo: string = "";
    date: Date | any;
    deliveryNote: string = "";
    modePay: string = "";
    refNoDate: string = "";
    otherRef: string = "";
    buyerOrderNo: string = "";
    buyerDate: string = "";
    dispatchDocNo: string = "";
    deliveryNoteDate: string = "";
    dispatchThrough: string = "";
    destination: string = "";
    billOfLading: string = "";
    motorvehicleNo: string = "";
    termsDelivery: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    supplierquots: Supplierquotation001wb[] = [];
    sales: Salesorder001wb[] = [];
    purchaseOrders: Purchaseorder001wb[] = [];

    consignee: string = "";
    buyer_billto: string = "";
    description: string = "";
    hsn: string = "";
    partno: string = "";
    quantity: number | any;
    rate: number | any;
    amount: number | any;
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(private formBuilder: FormBuilder,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private modalService: NgbModal,
        private datepipe: DatePipe,
        private supplierQuotationManager: SupplierQuotationManager,
        private salesOrderManager: SalesOrderManager,
        private purchaseorderManager: PurchaseorderManager) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    get f() { return this.salesOrderForm.controls }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

        this.supplierQuotationManager.allSupplierQuotation().subscribe(response => {
            this.supplierquots = deserialize<Supplierquotation001wb[]>(Supplierquotation001wb, response);
        });

        this.purchaseorderManager.allpurchaseorder().subscribe(response => {

            this.purchaseOrders = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
        });

        this.createDataGrid001();

        this.loadData();
        // this.onChange();

        this.salesOrderForm = this.formBuilder.group({
            porderSlno: ['', Validators.required],
            invoiceNo: ['', Validators.required],
            date: ['', Validators.required],
            deliveryNote: ['', Validators.required],
            modePay: ['', Validators.required],
            refNoDate: ['', Validators.required],
            otherRef: ['', Validators.required],
            buyerOrderNo: ['', Validators.required],
            buyerDate: ['', Validators.required],
            dispatchDocNo: ['', Validators.required],
            deliveryNoteDate: ['', Validators.required],
            dispatchThrough: ['', Validators.required],
            destination: ['', Validators.required],
            billOfLading: ['', Validators.required],
            motorvehicleNo: ['', Validators.required],
            termsDelivery: ['', Validators.required],

            consignee: [''],
            buyer_billto: [''],
            description: [''],
            hsn: [''],
            partno: [''],
            quantity: [''],
            rate: [''],
            amount: [''],
        })


    }

    loadData() {
        this.salesOrderManager.allsale().subscribe(response => {
            this.sales = deserialize<Salesorder001wb[]>(Salesorder001wb, response);
            if (this.sales.length > 0) {
                this.gridOptions?.api?.setRowData(this.sales);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }



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
                headerName: 'Invoice To',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setInvoice.bind(this)
            },
            {
                headerName: 'Consignee No',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setConsignee.bind(this)
            },
            {
                headerName: 'Buyer',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setBuyer.bind(this)
            },
            {
                headerName: 'Invoice No',
                field: 'invoiceNo',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
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
                valueGetter: (params: any) => {
                    return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
                }
            },
            {
                headerName: 'Delivery Note',
                field: 'deliveryNote',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Mode of terms',
                field: 'modePay',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Reference No',
                field: 'refNoDate',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Other Reference',
                field: 'otherRef',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Buyers Order No',
                field: "buyerOrderNo",
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Buyers Date',
                field: "buyerDate",
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
                headerName: 'Dispatch Doc No',
                field: 'dispatchDocNo',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Delivery Note Date',
                field: 'deliveryNoteDate',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Dispatched Through',
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
                headerName: 'Billing Of Landing',
                field: 'billOfLading',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Motor Vehicle No',
                field: 'motorvehicleNo',
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
                headerName: 'Description Of Goods',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setDescription.bind(this)
            },
            {
                headerName: 'HSN/SAC',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setHsn.bind(this)
            },
            {
                headerName: 'Part No',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setPartno.bind(this)
            },
            {
                headerName: 'Quantity',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setQuantity.bind(this)
            },
            {
                headerName: 'Rate',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setRate.bind(this)
            },
            {
                headerName: 'Amount',
                field: "amount",
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setAmount.bind(this)
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
        return params.data.porderSlno2 ? params.data.porderSlno2.supplierFrom : null;
    }

    setConsignee(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.consigneeSlno2?.consignee : null;
    }

    setBuyer(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.companySlno2?.company : null;
    }

    setDescription(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.suppquotSlno2?.description : null;
    }

    setHsn(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.hsn : null;
    }

    setPartno(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.partNo : null;
    }

    setQuantity(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.suppquotSlno2?.quantity : null;
    }

    setRate(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.suppquotSlno2?.price : null;
    }

    setAmount(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.amount : null;
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Sales Order";
        modalRef.componentInstance.details = params.data
    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.salesOrderForm.patchValue({
            'porderSlno': params.data.porderSlno,
            'invoiceNo': params.data.invoiceNo,
            'date': new Date(params.data.date),
            'deliveryNote': params.data.deliveryNote,
            'modePay': params.data.modePay,
            'refNoDate': params.data.refNoDate,
            'otherRef': params.data.otherRef,
            'buyerOrderNo': params.data.buyerOrderNo,
            'buyerDate': new Date(params.data.buyerDate),
            'dispatchDocNo': params.data.dispatchDocNo,
            'deliveryNoteDate': params.data.deliveryNoteDate,
            'dispatchThrough': params.data.dispatchThrough,
            'destination': params.data.destination,
            'billOfLading': params.data.billOfLading,
            'motorvehicleNo': params.data.motorvehicleNo,
            'termsDelivery': params.data.termsDelivery,

            'consignee': params.data.porderSlno2.consigneeSlno2?.consignee,
            'buyer_billto': params.data.porderSlno2.companySlno2?.company,
            'description': params.data.porderSlno2.suppquotSlno2?.description,
            'hsn': params.data.porderSlno2.hsn,
            'partno': params.data.porderSlno2.partNo,
            'quantity': params.data.porderSlno2.suppquotSlno2?.quantity,
            'rate': params.data.porderSlno2.suppquotSlno2?.price,
            'amount': params.data.porderSlno2.amount,
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Sales Order";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.salesOrderManager.saledelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.sales.length; i++) {
                        if (this.sales[i].slNo == params.data.slNo) {
                            this.sales?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Sales Order Removed Successfully");
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

    onSalesOrderClick(event: any, salesOrderForm: any) {
        this.markFormGroupTouched(this.salesOrderForm);
        this.submitted = true;
        if (this.salesOrderForm.invalid) {
            return;
        }
        let salesorder001wb = new Salesorder001wb();
        salesorder001wb.porderSlno = this.f.porderSlno.value ? this.f.porderSlno.value : "";
        salesorder001wb.invoiceNo = this.f.invoiceNo.value ? this.f.invoiceNo.value : "";
        salesorder001wb.date = new Date(this.f.date.value);
        salesorder001wb.deliveryNote = this.f.deliveryNote.value ? this.f.deliveryNote.value : "";
        salesorder001wb.modePay = this.f.modePay.value ? this.f.modePay.value : "";
        salesorder001wb.refNoDate = this.f.refNoDate.value ? this.f.refNoDate.value : "";
        salesorder001wb.otherRef = this.f.otherRef.value ? this.f.otherRef.value : "";
        salesorder001wb.termsDelivery = this.f.termsDelivery.value ? this.f.termsDelivery.value : "";
        salesorder001wb.buyerOrderNo = this.f.buyerOrderNo.value ? this.f.buyerOrderNo.value : "";
        salesorder001wb.buyerDate = new Date(this.f.buyerDate.value);

        salesorder001wb.dispatchDocNo = this.f.dispatchDocNo.value ? this.f.dispatchDocNo.value : "";
        salesorder001wb.deliveryNoteDate = this.f.deliveryNoteDate.value ? this.f.deliveryNoteDate.value : "";
        salesorder001wb.dispatchThrough = this.f.dispatchThrough.value ? this.f.dispatchThrough.value : "";
        salesorder001wb.destination = this.f.destination.value ? this.f.destination.value : "";
        salesorder001wb.billOfLading = this.f.billOfLading.value ? this.f.billOfLading.value : "";
        salesorder001wb.motorvehicleNo = this.f.motorvehicleNo.value ? this.f.motorvehicleNo.value : "";
        if (this.slNo) {
            salesorder001wb.slNo = this.slNo;
            salesorder001wb.unitdepartslNo = this.unitdepartslNo;
            salesorder001wb.insertUser = this.insertUser;
            salesorder001wb.insertDatetime = this.insertDatetime;
            salesorder001wb.updatedUser = this.authManager.getcurrentUser.username;
            salesorder001wb.updatedDatetime = new Date();
            this.salesOrderManager.saleupdate(salesorder001wb).subscribe((response) => {
                this.calloutService.showSuccess("Sales Order Updated Successfully");
                this.salesOrderForm.reset();
                this.loadData();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            salesorder001wb.unitdepartslNo= this.user.unitdepartslNo;
            salesorder001wb.insertUser = this.authManager.getcurrentUser.username;
            salesorder001wb.insertDatetime = new Date();

            this.salesOrderManager.salesave(salesorder001wb).subscribe((response) => {
                this.calloutService.showSuccess("Sales Order Saved Successfully");
                this.salesOrderForm.reset();
                this.loadData();
                this.submitted = false;
            });
        }
    }

    onReset() {
        this.submitted = false;
        this.salesOrderForm.reset();
    }

    onPurchaseClick() {
        // this.salesOrderForm.get('porderSlno').valueChanges.subscribe((value: any) => {
        //     for (let purchaseOrder of this.purchaseOrders) {
        //         if (purchaseOrder.slNo == value) {
        //             this.salesOrderForm.patchValue({
        //                 'consignee': purchaseOrder.consigneeSlno2?.consignee,
        //                 'buyer_billto': purchaseOrder.companySlno2?.company,
        //                 'description': purchaseOrder.suppquotSlno2?.description,
        //                 'hsn': purchaseOrder.hsn,
        //                 'partno': purchaseOrder.partNo,
        //                 'quantity': purchaseOrder.suppquotSlno2?.quantity,
        //                 'rate': purchaseOrder.suppquotSlno2?.price,
        //                 'amount': purchaseOrder.amount,
        //             });
        //             break;
        //         }
        //     }
        // });
    }

    onViewClick() {
        this.salesOrderManager.onGeneratePdfReport().subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        })
    }

    onGeneratePdfReport() {
        this.salesOrderManager.onGeneratePdfReport().subscribe((response) => {
            saveAs(response, "Sales Invoice");
        })
    }

    onGenerateExcelReport() {
        this.salesOrderManager.onGenerateExcelReport().subscribe((response) => {
            saveAs(response, "Sales Invoice");
        })
    }

}
