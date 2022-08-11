import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { saveAs } from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { OrderAddItemComponent } from 'src/app/shared/order-add-item/order-add-item.component';
import { PurchseSlipComponent } from 'src/app/shared/purchse-slip/purchse-slip.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Purchasereqitem001wb } from 'src/app/shared/services/restcontroller/entities/purchasereqitems001wb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { Spares001mb } from 'src/app/shared/services/restcontroller/entities/spares001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-purchase-req-slip',
  templateUrl: './purchase-req-slip.component.html',
  styleUrls: ['./purchase-req-slip.component.css']
})
export class PurchaseReqSlipComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  purchasereqForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  date: Date | any;
  prsNo: string = "";
  poDate: Date | any;
  reqDate: Date | any;
  poNo: string = "";
  remarks: string = "";
  status: string = "";
  getCount: any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  sparesSettings: Spares001mb[] = [];
  spares001mb?: Spares001mb;
  purchaseRegs: Purchasereqslip001wb[] = [];
  addPopup: any;
  count: number = 0;
  purchasereqitem: Purchasereqitem001wb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private formBuilder: FormBuilder,
    private sparesettingManager: SparesettingManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private purchaseregslipManager: PurchasereqslipManager,
    private router: Router) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.createDataGrid001();

    this.loadData();

    this.purchasereqForm = this.formBuilder.group({
      date: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      prsNo: ['',],
      poDate: ['', Validators.required],
      reqDate: ['', Validators.required],
      poNo: ['', Validators.required],
      remarks: ['', Validators.required],
    })

    this.sparesettingManager.allsparesetting().subscribe(response => {
      this.sparesSettings = deserialize<Spares001mb[]>(Spares001mb, response);
    });

  }




  loadData() {
    this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
      this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
      if (this.purchaseRegs.length > 0) {
        this.gridOptions?.api?.setRowData(this.purchaseRegs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.purchaseregslipManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.purchasereqForm.patchValue({
        prsNo: String("SE/PRS/22-23/") + String(this.count).padStart(4, '0')
      });
    });

  }

  get f() { return this.purchasereqForm.controls }

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
        headerName: 'Our P.O.No',
        field: 'poNo',
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
          return params.data.poDate ? this.datepipe.transform(params.data.poDate, 'dd-MM-yyyy') : '';
        }
      },

      {
        headerName: 'Requried Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.reqDate ? this.datepipe.transform(params.data.reqDate, 'dd-MM-yyyy') : '';
        }
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
    return;
}

  setSpares(params: any): string {
    return params.data.sparenameSlno2 ? params.data.sparenameSlno2.spares : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Purchase Requisition Slip";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.purchasereqForm.patchValue({
      'date': params.data.date,
      'poDate': new Date(params.data.poDate),
      'reqDate': new Date(params.data.reqDate),
      'prsNo': params.data.prsNo,
      'poNo': params.data.poNo,
      'remarks': params.data.remarks,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Purchase Requisition Slip";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.purchaseregslipManager.purchaseslipdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.purchaseRegs.length; i++) {
            if (this.purchaseRegs[i].slNo == params.data.slNo) {
              this.purchaseRegs?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Purchase Request Removed Successfully");
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
  onAddbuttonClick(object: any) {
    const modalRef = this.modalService.open(PurchseSlipComponent,  { windowClass: 'my-class' });
    modalRef.componentInstance.purchasereqitem = this.purchasereqitem;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.purchasereqitem = data.purchasereqitem;
        console.log("  this.purchasereqitem",  this.purchasereqitem);
        
      }
    })
  }
  onpurchasereqClick(event: any, purchasereqForm: any) {
    console.log("purchasereqForm",purchasereqForm);
    
    this.markFormGroupTouched(this.purchasereqForm);
    this.submitted = true;
    if (this.purchasereqForm.invalid) {
      return;
    }

    let purchasereqslip001wb = new Purchasereqslip001wb();
    purchasereqslip001wb.date = new Date(this.f.date.value);
    purchasereqslip001wb.poDate = this.f.poDate.value;
    purchasereqslip001wb.reqDate = this.f.reqDate.value;
    purchasereqslip001wb.prsNo = this.f.prsNo.value ? this.f.prsNo.value : "";
    purchasereqslip001wb.poNo = this.f.poNo.value ? this.f.poNo.value : "";
    purchasereqslip001wb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
    purchasereqslip001wb.purchasereqitem = this.purchasereqitem;
    purchasereqslip001wb.status = "Request For Approval";
    if (this.slNo) {
      purchasereqslip001wb.slNo = this.slNo;
      purchasereqslip001wb.unitdepartslNo = this.unitdepartslNo;
      purchasereqslip001wb.insertUser = this.insertUser;
      purchasereqslip001wb.insertDatetime = this.insertDatetime;
      purchasereqslip001wb.updatedUser = this.authManager.getcurrentUser.username;
      purchasereqslip001wb.updatedDatetime = new Date();
      this.purchaseregslipManager.purchaseslipupdate(purchasereqslip001wb).subscribe((response) => {
        this.calloutService.showSuccess("Purchase Request Updated Successfully");
        this.purchasereqForm.reset();
        this.purchasereqForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      purchasereqslip001wb.date = new Date();
      purchasereqslip001wb.unitdepartslNo= this.user.unitdepartslNo;
      purchasereqslip001wb.insertUser = this.authManager.getcurrentUser.username;
      purchasereqslip001wb.insertDatetime = new Date();
      this.purchaseregslipManager.purchaseslipsave(purchasereqslip001wb).subscribe((response) => {
        this.calloutService.showSuccess("Purchase Request Saved Successfully");
        this.purchasereqForm.reset();
        this.purchasereqForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.purchasereqForm.controls.sparenameSlno.reset();
    this.purchasereqForm.controls.department.reset();
    this.purchasereqForm.controls.prsNo.reset();
    this.purchasereqForm.controls.poDate.reset();
    this.purchasereqForm.controls.reqDate.reset();
    this.purchasereqForm.controls.poNo.reset();
    this.purchasereqForm.controls.description.reset();
    this.purchasereqForm.controls.quantity.reset();
    this.purchasereqForm.controls.remarks.reset();
  }

  onViewClick() {
    this.purchaseregslipManager.purchaslipPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.purchaseregslipManager.purchaslipPdf().subscribe((response) => {
      saveAs(response, " purchaseregslip");
    })
  }

  onGenerateExcelReport() {
    this.purchaseregslipManager.purchaslipExcel().subscribe((response) => {
      saveAs(response, "purchaseregslip");
    })
  }

  onViewButtonClick(params: any) {
    this.purchaseregslipManager.pdfId(params.data.slNo).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })

	}
	onPdfButtonClick(params: any) {
    this.purchaseregslipManager.pdfId(params.data.slNo).subscribe((response) => {
			saveAs(response, "purchaseregslip");
		})

	}
	onEXcelButtonClick(params: any) {
    this.purchaseregslipManager.ExcelId(params.data.slNo).subscribe((response) => {
      saveAs(response, "purchaseregslip");
    })

	}

  onSubmitClick() {
   
    this.purchaseregslipManager.approvalStatus().subscribe(response => {
      this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
    });

    this.router.navigate(["/app-dash-board/app-approval/app-approval-request"]);
  }
}
