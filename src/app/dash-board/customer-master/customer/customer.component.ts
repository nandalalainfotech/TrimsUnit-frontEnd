import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';
import { Customer001mb } from 'src/app/shared/services/restcontroller/entities/Customer001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  CustomerForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;

  slNo: number | any;
  customerName: string = "";
  majorProduct: string = "";
  vendorCode: string = "";
  address: string = "";
  gstin: string = "";
  customerPhone: string="";
  customerEmail: string = "";
  contactPersonName: string = "";
  insertUser: string = "";
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  customers: Customer001mb[] = [];
  submitted: boolean = false;
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private customerManager: CustomerManager,
    private http: HttpClient) {
    this.frameworkComponents = {
      //  linkRenderer: LinkRendererComponent,
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    this.CustomerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      majorProduct: ['', Validators.required],
      vendorCode: ['', Validators.required],
      address: ['', Validators.required],
      gstin: ['', Validators.required],
      customerPhone: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      customerEmail: ['', Validators.required],
      contactPersonName: ['', Validators.required]
    })

    this.loadData();
  }

  loadData() {
    this.customerManager.allcustomer().subscribe(response => {
      this.customers = response;
      if (this.customers.length > 0) {
        this.gridOptions?.api?.setRowData(this.customers);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  createDataGrid001() {
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
        headerName: 'Customer Name',
        field: 'customerName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Address',
        field: 'address',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GSTIN',
        field: 'gstin',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Vendor Code',
        field: 'vendorCode',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Contact Person Name',
        field: 'contactPersonName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Customer Phone',
        field: 'customerPhone',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Customer Email',
        field: 'customerEmail',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Major Products',
        field: 'majorProduct',
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

  get f() { return this.CustomerForm.controls; }

  onCustomerClick(event: any, CustomerForm: any) {
    this.markFormGroupTouched(this.CustomerForm);
    this.submitted = true;
    if (this.CustomerForm.invalid) {
      return;
    }
    let customer001mb = new Customer001mb();
    customer001mb.address = this.f.address.value ? this.f.address.value : "";
    customer001mb.contactPersonName = this.f.contactPersonName.value ? this.f.contactPersonName.value : "";
    customer001mb.customerEmail = this.f.customerEmail.value ? this.f.customerEmail.value : "";
    customer001mb.customerName = this.f.customerName.value ? this.f.customerName.value : "";
    customer001mb.customerPhone = this.f.customerPhone.value ? this.f.customerPhone.value : null;
    customer001mb.gstin = this.f.gstin.value ? this.f.gstin.value : null;
    customer001mb.majorProduct = this.f.majorProduct.value ? this.f.majorProduct.value : "";
    customer001mb.vendorCode = this.f.vendorCode.value ? this.f.vendorCode.value : "";
    if (this.slNo) {
      customer001mb.slNo = this.slNo;
      customer001mb.unitdepartslNo = this.unitdepartslNo;
      customer001mb.insertUser = this.insertUser;
      customer001mb.insertDatetime = this.insertDatetime;
      customer001mb.updatedUser = this.authManager.getcurrentUser.username;
      customer001mb.updatedDatetime = new Date();

      this.customerManager.updateCustomer(customer001mb).subscribe((response) => {
        this.calloutService.showSuccess("Customer Details Updated Successfully");
        this.loadData();
        this.CustomerForm.reset();
        this.slNo = null;
        this.submitted = false;
      }
      )
    }
    else {
      customer001mb.unitdepartslNo = this.user.unitdepartslNo;
      customer001mb.insertUser = this.authManager.getcurrentUser.username;
      customer001mb.insertDatetime = new Date();
      this.customerManager.saveCustomer(customer001mb).subscribe((response) => {
        this.calloutService.showSuccess("Customer Details Saved Successfully");
        this.loadData();
        this.CustomerForm.reset();
        this.submitted = false;
      });
    }

  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.CustomerForm.patchValue({
      'customerName': params.data.customerName,
      'majorProduct': params.data.majorProduct,
      'vendorCode': params.data.vendorCode,
      'address': params.data.address,
      'gstin': params.data.gstin,
      'customerEmail': params.data.customerEmail,
      'customerPhone': params.data.customerPhone,
      'contactPersonName': params.data.contactPersonName
    });

  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.customerManager.deleteCustomer(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].slNo == params.data.slNo) {
              this.customers?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Customer Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Customer Audit Report";
    modalRef.componentInstance.details = params.data
  }

  onReset() {
    this.submitted = false;
    this.CustomerForm.reset();
  }

  onViewClick() {
    this.customerManager.customerPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.customerManager.customerPdf().subscribe((response) => {
      saveAs(response, "Customer-Details");
    })
  }

  onGenerateExcelReport() {
    this.customerManager.customerExcel().subscribe((response) => {
      saveAs(response, "Customer-Details");
    });
  }

}
