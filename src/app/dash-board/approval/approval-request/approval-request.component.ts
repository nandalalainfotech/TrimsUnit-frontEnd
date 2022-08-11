import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { saveAs } from 'file-saver';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OrderItemSettingManager } from 'src/app/shared/services/restcontroller/bizservice/orderItems.service';
import { PaymentManager } from 'src/app/shared/services/restcontroller/bizservice/Payment.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SalesOrderManager } from 'src/app/shared/services/restcontroller/bizservice/Salesorder.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Orderitem001mb } from 'src/app/shared/services/restcontroller/entities/Orderitem001mb';
import { Payment001wb } from 'src/app/shared/services/restcontroller/entities/Payment001wb';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { Salesorder001wb } from 'src/app/shared/services/restcontroller/entities/Salesorder001wb';
import { Spares001mb } from 'src/app/shared/services/restcontroller/entities/spares001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { Supplierquotation001wb } from 'src/app/shared/services/restcontroller/entities/supplierquotation001wb ';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { StatusBarComponent } from 'src/app/shared/status-bar/status-bar.component';

@Component({
    selector: 'app-approval-request',
    templateUrl: './approval-request.component.html',
    styleUrls: ['./approval-request.component.css'],
})
export class ApprovalRequestComponent implements OnInit {
    frameworkComponents: any;

    // GridOptions
    public gridOptions: GridOptions | any;
    public gridOptions1: GridOptions | any;
    public gridOptions2: GridOptions | any;
    public gridOptions3: GridOptions | any;
    public gridOptions4: GridOptions | any;

    // Data
    minDate = new Date();
    maxDate = new Date();
    sparesSettings: Spares001mb[] = [];
    spares001mb?: Spares001mb;
    purchaseRegs: Purchasereqslip001wb[] = [];
    addPopup: any;
    supplierquotations: Supplierquotation001wb[] = [];
    purchasereqs: Purchasereqslip001wb[] = [];
    supplierregs: Supplierregistration001mb[] = [];
    orderitem001mbs: Orderitem001mb[] = [];
    order: Purchaseorder001wb[] = [];
    sales: Salesorder001wb[] = [];
    payment: Payment001wb[] = [];
    statussets: Status001mb[] = [];
    user?: User001mb;

    constructor(
        private datepipe: DatePipe,
        private purchaseregslipManager: PurchasereqslipManager,
        private modalService: NgbModal,
        private calloutService: CalloutService,
        private supplierQuotationManager: SupplierQuotationManager,
        private supplierRegManager: SupplierRegManager,
        private purchaseorderManager: PurchaseorderManager,
        private orderItemSettingManager: OrderItemSettingManager,
        private salesOrderManager: SalesOrderManager,
        private paymentManager: PaymentManager,
        private authManager: AuthManager
    ) {
        this.frameworkComponents = { iconRenderer: IconRendererComponent };
    }

    ngOnInit(): void {
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.createDataGrid004();
        this.createDataGrid005();

        this.purchaseregslipManager.allpurchaseslip().subscribe((response) => {
            this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(
                Purchasereqslip001wb,
                response
            );
            if (this.purchaseRegs.length > 0) {
                this.gridOptions?.api?.setRowData(this.purchaseRegs);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
        this.supplierQuotationManager
            .allSupplierQuotation()
            .subscribe((response) => {
                this.supplierquotations = deserialize<Supplierquotation001wb[]>(
                    Supplierquotation001wb,
                    response
                );
                if (this.supplierquotations.length > 0) {
                    this.gridOptions1?.api?.setRowData(this.supplierquotations);
                } else {
                    this.gridOptions1?.api?.setRowData([]);
                }
            });
        this.purchaseorderManager.allpurchaseorder().subscribe((response) => {
            this.order = deserialize<Purchaseorder001wb[]>(
                Purchaseorder001wb,
                response
            );
            let statuspurchase: Purchaseorder001wb[] = [];

            for (let i = 0; i < this.order.length; i++) {
                if (this.order[i].status != 'Approval') {
                    statuspurchase.push(this.order[i]);
                }
            }
            if (this.order.length > 0) {
                this.gridOptions2?.api?.setRowData(statuspurchase);
            } else {
                this.gridOptions2?.api?.setRowData([]);
            }
        });
        this.authManager.currentUserSubject.subscribe((object: any) => {
            this.user = object;
        });

        let rep0 = this.supplierRegManager.allSupplier();
        let rep1 = this.orderItemSettingManager.allitem();

        forkJoin([rep0, rep1]).subscribe((data: any) => {
            this.supplierregs = deserialize<Supplierregistration001mb[]>(
                Supplierregistration001mb,
                data[0]
            );
            this.orderitem001mbs = deserialize<Orderitem001mb[]>(
                Orderitem001mb,
                data[1]
            );
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
                headerName: 'View',
                cellRenderer: 'iconRenderer',
                width: 60,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onViewPurReqParamsClick.bind(this),
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
                    onClick: this.onPdfPurReqParamsClick.bind(this),
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
                    onClick: this.onExcelPurReqParamsClick.bind(this),
                    label: 'Excel',
                },
            },
            {
                headerName: 'Approval Status',
                cellRenderer: 'iconRenderer',
                width: 60,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onApprovedParamsClick.bind(this),
                    label: 'Approval Status',
                },
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
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 80,
                // flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit',
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
                    onClick: this.onAuditButtonprsClick.bind(this),
                    label: 'Audit',
                },
            },
            {
                headerName: 'PRS No',
                field: 'prsNo',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'P.O Date',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.poDate
                        ? this.datepipe.transform(
                              params.data.poDate,
                              'dd-MM-yyyy'
                          )
                        : '';
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
                    onClick: this.onDeleteButtonprsClick.bind(this),
                    label: 'Delete',
                },
            },
        ];
    }

    rowClicked(params: any) {
        params.node.setData({
            ...params.data,
            status: true,
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
        return;
    }

    setSpares(params: any): string {
        return params.data.sparenameSlno2
            ? params.data.sparenameSlno2.spares
            : null;
    }

    onAuditButtonprsClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = 'Purchase Requisition Slip';
        modalRef.componentInstance.details = params.data;
    }

    onDeleteButtonprsClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = 'Purchase Requisition Slip';
        modalRef.result.then((data) => {
            if (data == 'Yes') {
                this.purchaseregslipManager
                    .purchaseslipdelete(params.data.slNo)
                    .subscribe((response) => {
                        for (let i = 0; i < this.purchaseRegs.length; i++) {
                            if (this.purchaseRegs[i].slNo == params.data.slNo) {
                                this.purchaseRegs?.splice(i, 1);
                                break;
                            }
                        }
                        const selectedRows = params.api.getSelectedRows();
                        params.api.applyTransaction({ remove: selectedRows });
                        this.gridOptions.api.deselectAll();
                        this.calloutService.showSuccess(
                            'Purchase Request Removed Successfully'
                        );
                    });
            }
        });
    }

    // Suplier quation

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
                headerName: 'View',
                cellRenderer: 'iconRenderer',
                width: 60,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onViewSupClick.bind(this),
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
                    onClick: this.onPdfSupClick.bind(this),
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
                    onClick: this.onExcelSupClick.bind(this),
                    label: 'Excel',
                },
            },
            {
                headerName: 'Approval Status',
                cellRenderer: 'iconRenderer',
                width: 60,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onSupplierParamsClick.bind(this),
                    label: 'Approval Status',
                },
                suppressSizeToFit: true,
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
                    label: 'Edit',
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
                    onClick: this.onAuditButtonsClick.bind(this),
                    label: 'Audit',
                },
            },
            {
                headerName: 'Supplier Name',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setSupplierName.bind(this),
            },
            {
                headerName: 'Quotation Date',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.quotationDate
                        ? this.datepipe.transform(
                              params.data.quotationDate,
                              'dd-MM-yyyy'
                          )
                        : '';
                },
            },
            {
                headerName: 'Validity',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.validity
                        ? this.datepipe.transform(
                              params.data.validity,
                              'dd-MM-yyyy'
                          )
                        : '';
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
                    onClick: this.onDeleteButtonsClick.bind(this),
                    label: 'Delete',
                },
            },
        ];
    }
    setSupplierName(params: any): string {
        return params.data.supplierSlno
            ? this.supplierregs.find((x) => x.slNo === params.data.supplierSlno)
                  ?.supplierName
            : null;
    }

    setProductName(params: any): string {
        return params.data.purchasereqSlno2
            ? params.data.purchasereqSlno2.sparenameSlno
            : null;
    }

    onAuditButtonsClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = 'Supplier Quotation';
        modalRef.componentInstance.details = params.data;
    }
    onDeleteButtonsClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = 'Supplier Quotation';
        modalRef.result.then((data) => {
            if (data == 'Yes') {
                this.supplierQuotationManager
                    .SupplierQuotationDelete(params.data.slNo)
                    .subscribe((response) => {
                        for (
                            let i = 0;
                            i < this.supplierquotations.length;
                            i++
                        ) {
                            if (
                                this.supplierquotations[i].slNo ==
                                params.data.slNo
                            ) {
                                this.supplierquotations?.splice(i, 1);
                                break;
                            }
                        }
                        const selectedRows = params.api.getSelectedRows();
                        params.api.applyTransaction({ remove: selectedRows });
                        this.gridOptions.api.deselectAll();
                        this.calloutService.showSuccess(
                            'Supplier Quotation Removed Successfully'
                        );
                    });
            }
        });
    }
    // purshase order---------------------------------------------------------
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
                headerName: 'View',
                cellRenderer: 'iconRenderer',
                width: 60,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onViewPurchaseClick.bind(this),
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
                    onClick: this.onPdfPurchaseClick.bind(this),
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
                    onClick: this.onExcelPurchaseClick.bind(this),
                    label: 'Excel',
                },
            },
            {
                headerName: 'Approval Status',
                cellRenderer: 'iconRenderer',
                width: 60,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onPurchaseOrderParamsClick.bind(this),
                    label: 'Approval Status',
                },
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
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 80,
                // flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit',
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
                    onClick: this.onAuditButtonPOClick.bind(this),
                    label: 'Audit',
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
                valueGetter: this.setInvoiceTo.bind(this),
            },
            {
                headerName: 'Consignee No',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setConsigneeNo.bind(this),
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
                    return params.data.date
                        ? this.datepipe.transform(
                              params.data.date,
                              'dd-MM-yyyy'
                          )
                        : '';
                },
            },
            {
                headerName: 'PO No',
                field: 'pono',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 85,
                // flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onDeleteButtonPOClick.bind(this),
                    label: 'Delete',
                },
            },
        ];
    }

    setInvoiceTo(params: any): string {
        return params.data.companySlno2
            ? params.data.companySlno2.company
            : null;
    }

    setConsigneeNo(params: any): string {
        return params.data.consigneeSlno2
            ? params.data.consigneeSlno2.consignee
            : null;
    }

    onAuditButtonPOClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = 'Purchase Order';
        modalRef.componentInstance.details = params.data;
    }

    onDeleteButtonPOClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = 'Purchase Order';
        modalRef.result.then((data) => {
            if (data == 'Yes') {
                this.purchaseorderManager
                    .purchaseorderdelete(params.data.slNo)
                    .subscribe((response) => {
                        for (let i = 0; i < this.order.length; i++) {
                            if (this.order[i].slNo == params.data.slNo) {
                                this.order?.splice(i, 1);
                                break;
                            }
                        }
                        const selectedRows = params.api.getSelectedRows();
                        params.api.applyTransaction({ remove: selectedRows });
                        this.gridOptions.api.deselectAll();
                        this.calloutService.showSuccess(
                            'Purchase Order Removed Successfully'
                        );
                    });
            }
        });
    }

    // Sales invoce
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
                headerName: 'View',
                cellRenderer: 'iconRenderer',
                width: 60,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
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
                    onClick: this.onEditButtonClick.bind(this),
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
                    onClick: this.onEditButtonClick.bind(this),
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
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Invoice To',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setInvoice.bind(this),
            },
            {
                headerName: 'Consignee No',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setConsignee.bind(this),
            },
            {
                headerName: 'Buyer',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setBuyer.bind(this),
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
                    return params.data.date
                        ? this.datepipe.transform(
                              params.data.date,
                              'dd-MM-yyyy'
                          )
                        : '';
                },
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
                field: 'buyerOrderNo',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Buyers Date',
                field: 'buyerDate',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: (params: any) => {
                    return params.data.date
                        ? this.datepipe.transform(
                              params.data.date,
                              'dd-MM-yyyy'
                          )
                        : '';
                },
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
                valueGetter: this.setDescription.bind(this),
            },
            {
                headerName: 'HSN/SAC',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setHsn.bind(this),
            },
            {
                headerName: 'Part No',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setPartno.bind(this),
            },
            {
                headerName: 'Quantity',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setQuantity.bind(this),
            },
            {
                headerName: 'Rate',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setRate.bind(this),
            },
            {
                headerName: 'Amount',
                field: 'amount',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setAmount.bind(this),
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
                    label: 'Edit',
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
                    label: 'Delete',
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
                    label: 'Audit',
                },
            },
        ];
    }

    setInvoice(params: any): string {
        return params.data.porderSlno2
            ? params.data.porderSlno2.supplierFrom
            : null;
    }

    setConsignee(params: any): string {
        return params.data.porderSlno2
            ? params.data.porderSlno2.consigneeSlno2?.consignee
            : null;
    }

    setBuyer(params: any): string {
        return params.data.porderSlno2
            ? params.data.porderSlno2.companySlno2?.company
            : null;
    }

    setDescription(params: any): string {
        return params.data.porderSlno2
            ? params.data.porderSlno2.suppquotSlno2?.description
            : null;
    }

    setHsn(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.hsn : null;
    }

    setPartno(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.partNo : null;
    }

    setQuantity(params: any): string {
        return params.data.porderSlno2
            ? params.data.porderSlno2.suppquotSlno2?.quantity
            : null;
    }

    setRate(params: any): string {
        return params.data.porderSlno2
            ? params.data.porderSlno2.suppquotSlno2?.price
            : null;
    }

    setAmount(params: any): string {
        return params.data.porderSlno2 ? params.data.porderSlno2.amount : null;
    }

    createDataGrid005(): void {
        this.gridOptions4 = {
            paginationPageSize: 10,
            rowSelection: 'single',
        };
        this.gridOptions4.editType = 'fullRow';
        this.gridOptions4.enableRangeSelection = true;
        this.gridOptions4.animateRows = true;
        this.gridOptions4.columnDefs = [
            {
                headerName: 'View',
                cellRenderer: 'iconRenderer',
                width: 60,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
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
                    onClick: this.onEditButtonClick.bind(this),
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
                    onClick: this.onEditButtonClick.bind(this),
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
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
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
                valueGetter: this.setInvoiceNo.bind(this),
            },
            {
                headerName: 'Invoice Amount',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setInvoiceAmount.bind(this),
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
                    return params.data.payDate
                        ? this.datepipe.transform(
                              params.data.payDate,
                              'dd-MM-yyyy'
                          )
                        : '';
                },
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
                    return params.data.dueDate
                        ? this.datepipe.transform(
                              params.data.dueDate,
                              'dd-MM-yyyy'
                          )
                        : '';
                },
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
                    label: 'Edit',
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
                    label: 'Delete',
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
                    label: 'Audit',
                },
            },
        ];
    }

    setInvoiceNo(params: any): string {
        return params.data.saleorderSlno2
            ? params.data.saleorderSlno2.invoiceNo
            : null;
    }

    setInvoiceAmount(params: any): string {
        return params.data.saleorderSlno2.porderSlno2
            ? params.data.saleorderSlno2.porderSlno2.amount
            : null;
    }

    onEditButtonClick() {}
    onDeleteButtonClick() {}
    onAuditButtonClick() {}

    onViewPurchaseReqClick() {
        this.purchaseregslipManager.purchaslipPdf().subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        });
    }
    onGeneratePurchaseReqPdfReport() {
        this.purchaseregslipManager.purchaslipPdf().subscribe((response) => {
            saveAs(response, 'Purchase Req');
        });
    }

    onGeneratePurchaseReqExcelReport() {
        this.purchaseregslipManager.purchaslipExcel().subscribe((response) => {
            saveAs(response, 'Purchase Req');
        });
    }
    onViewPurReqParamsClick(params: any) {
        this.purchaseregslipManager
            .pdfId(params.data.slNo)
            .subscribe((response) => {
                var blob = new Blob([response], { type: 'application/pdf' });
                var blobURL = URL.createObjectURL(blob);
                window.open(blobURL);
            });
    }
    onPdfPurReqParamsClick(params: any) {
        console.log('params', params.data.slNo);
        this.purchaseregslipManager
            .pdfId(params.data.slNo)
            .subscribe((response) => {
                saveAs(response, 'Purchase Req');
            });
    }
    onExcelPurReqParamsClick(params: any) {
        this.purchaseregslipManager
            .ExcelId(params.data.slNo)
            .subscribe((response) => {
                saveAs(response, 'Purchase Req');
            });
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    onViewSupplierQuoClick() {
        this.supplierQuotationManager
            .supplierQuotationPdf()
            .subscribe((response) => {
                var blob = new Blob([response], { type: 'application/pdf' });
                var blobURL = URL.createObjectURL(blob);
                window.open(blobURL);
            });
    }
    onGenerateSupplierQuoPdfReport() {
        this.supplierQuotationManager
            .supplierQuotationPdf()
            .subscribe((response) => {
                saveAs(response, 'supplierQuotation');
            });
    }

    onGenerateSupplierQuoExcelReport() {
        this.supplierQuotationManager
            .supplierQuotationExcel()
            .subscribe((response) => {
                saveAs(response, 'supplierQuotation');
            });
    }
    onViewSupClick(params: any) {
        this.supplierQuotationManager
            .paramsPdf(params.data.slNo)
            .subscribe((response) => {
                var blob = new Blob([response], { type: 'application/pdf' });
                var blobURL = URL.createObjectURL(blob);
                window.open(blobURL);
            });
    }
    onPdfSupClick(params: any) {
        console.log('params', params.data.slNo);
        this.supplierQuotationManager
            .paramsPdf(params.data.slNo)
            .subscribe((response) => {
                saveAs(response, 'supplierQuotation');
            });
    }
    onExcelSupClick(params: any) {
        this.supplierQuotationManager
            .supplierExcel(params.data.slNo)
            .subscribe((response) => {
                saveAs(response, 'supplierQuotation');
            });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    onViewPOrderClick() {
        this.purchaseorderManager.purchaseorderPdf().subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        });
    }

    onGeneratePOrderPdfReport() {
        this.purchaseorderManager.purchaseorderPdf().subscribe((response) => {
            saveAs(response, 'Purchase Order');
        });
    }

    onGeneratePOrderExcelReport() {
        this.purchaseorderManager.purchaseorderExcel().subscribe((response) => {
            saveAs(response, 'Purchase Order');
        });
    }
    onViewPurchaseClick(params: any) {
        this.purchaseorderManager
            .purchaseParamsPdf(params.data.slNo)
            .subscribe((response) => {
                var blob = new Blob([response], { type: 'application/pdf' });
                var blobURL = URL.createObjectURL(blob);
                window.open(blobURL);
            });
    }
    onPdfPurchaseClick(params: any) {
        this.purchaseorderManager
            .purchaseParamsPdf(params.data.slNo)
            .subscribe((response) => {
                saveAs(response, 'Purchase Order');
            });
    }
    onExcelPurchaseClick(params: any) {
        this.purchaseorderManager
            .purchaseordersingleExcel(params.data.slNo)
            .subscribe((response) => {
                saveAs(response, 'Purchase Order');
            });
    }

    onViewSalesClick() {
        this.salesOrderManager.onGeneratePdfReport().subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        });
    }

    onGenerateSalesPdfReport() {
        this.salesOrderManager.onGeneratePdfReport().subscribe((response) => {
            saveAs(response, 'Sales Invoice');
        });
    }

    onGenerateSalesExcelReport() {
        this.salesOrderManager.onGenerateExcelReport().subscribe((response) => {
            saveAs(response, 'Sales Invoice');
        });
    }

    onViewPaymentClick() {
        this.paymentManager.paymentPdf().subscribe((response) => {
            var blob = new Blob([response], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);
            window.open(blobURL);
        });
    }

    onGeneratePaymentPdfReport() {
        this.paymentManager.paymentPdf().subscribe((response) => {
            saveAs(response, 'payment');
        });
    }

    onGeneratePaymentExcelReport() {
        this.paymentManager.paymentExcel().subscribe((response) => {
            saveAs(response, 'payment');
        });
    }

    onApprovedParamsClick(params: any) {
        const modalRef = this.modalService.open(StatusBarComponent);
        modalRef.componentInstance.title = 'Approval Status';
        modalRef.componentInstance.details = params.data;
        modalRef.componentInstance.flag = 'PRS';
        modalRef.result.then((flag) => {
            if (flag == 'Yes') {
                this.purchaseregslipManager
                    .allpurchaseslip()
                    .subscribe((response) => {
                        this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(
                            Purchasereqslip001wb,
                            response
                        );
                        if (this.purchaseRegs.length > 0) {
                            this.gridOptions?.api?.setRowData(
                                this.purchaseRegs
                            );
                        } else {
                            this.gridOptions?.api?.setRowData([]);
                        }
                    });
            }
        });
    }
    onPurchaseOrderParamsClick(params: any) {
        const modalRef = this.modalService.open(StatusBarComponent);
        modalRef.componentInstance.title = 'Approval Status';
        modalRef.componentInstance.details = params.data;
        modalRef.componentInstance.flag = 'PO';
        modalRef.result.then((flag) => {
            if (flag == 'Yes') {
                this.purchaseorderManager
                    .allpurchaseorder()
                    .subscribe((response) => {
                        this.order = deserialize<Purchaseorder001wb[]>(
                            Purchaseorder001wb,
                            response
                        );
                        if (this.order.length > 0) {
                            this.gridOptions2?.api?.setRowData(this.order);
                        } else {
                            this.gridOptions2?.api?.setRowData([]);
                        }
                    });
            }
        });
    }

    onSupplierParamsClick(params: any) {
        const modalRef = this.modalService.open(StatusBarComponent);
        modalRef.componentInstance.title = 'Approval Status';
        modalRef.componentInstance.details = params.data;
        modalRef.componentInstance.flag = 'SQ';
        modalRef.result.then((flag) => {
            if (flag == 'Yes') {
                this.supplierQuotationManager
                    .allSupplierQuotation()
                    .subscribe((response) => {
                        this.supplierquotations = deserialize<
                            Supplierquotation001wb[]
                        >(Supplierquotation001wb, response);
                        if (this.supplierquotations.length > 0) {
                            this.gridOptions1?.api?.setRowData(
                                this.supplierquotations
                            );
                        } else {
                            this.gridOptions1?.api?.setRowData([]);
                        }
                    });
            }
        });
    }
}
