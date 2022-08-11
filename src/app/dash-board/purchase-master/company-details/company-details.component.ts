import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CompanyDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/Companydetails.service';
import { Companydetails001mb } from 'src/app/shared/services/restcontroller/entities/Companydetails001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  detailForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  company: string = "";
  address1: string = "";
  address2: string = "";
  address3: string = "";
  gstIn: number | any;
  city: string = "";
  state: string = "";
  country: string = "";
  pinCode: number | any;
  emailId: string = "";
  contactNo: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  detail: Companydetails001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private companyManager: CompanyDetailsManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();

    this.loadData();

    this.detailForm = this.formBuilder.group({
      company: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      address3: ['', Validators.required],
      gstIn: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pinCode: ['', Validators.required],
      emailId: ['', Validators.required],
      contactNo: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
    })

  }

  loadData() {
    this.companyManager.allcompany().subscribe(response => {
      this.detail = deserialize<Companydetails001mb[]>(Companydetails001mb, response);
      if (this.detail.length > 0) {
        this.gridOptions?.api?.setRowData(this.detail);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  get f() { return this.detailForm.controls }

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
        headerName: 'Company Name',
        field: 'company',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Address 1',
        field: 'address1',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Address 2',
        field: "address2",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Address 2',
        field: 'address3',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GST IN',
        field: 'gstIn',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'City',
        field: 'city',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'State',
        field: 'state',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Pin Code',
        field: 'pinCode',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Email Id',
        field: "emailId",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Contact No',
        field: "contactNo",
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
    modalRef.componentInstance.title = "Company Details";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.detailForm.patchValue({
      'company': params.data.company,
      'address1': params.data.address1,
      'address2': params.data.address2,
      'address3': params.data.address3,
      'gstIn': params.data.gstIn,
      'city': params.data.city,
      'state': params.data.state,
      'country': params.data.country,
      'pinCode': params.data.pinCode,
      'emailId': params.data.emailId,
      'contactNo': params.data.contactNo,
    });
  }

 onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Company Details";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.companyManager.companyDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.detail.length; i++) {
            if (this.detail[i].slNo == params.data.slNo) {
              this.detail?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Company Details Removed Successfully");
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

  ondetailsClick(event: any, detailForm: any) {
    this.markFormGroupTouched(this.detailForm);
    this.submitted = true;
    if (this.detailForm.invalid) {
      return;
    }

    let companydetails001mb = new Companydetails001mb();
    companydetails001mb.company = this.f.company.value ? this.f.company.value : "";
    companydetails001mb.address1 = this.f.address1.value ? this.f.address1.value : "";
    companydetails001mb.address2 = this.f.address2.value ? this.f.address2.value : "";
    companydetails001mb.address3 = this.f.address3.value ? this.f.address3.value : "";
    companydetails001mb.gstIn = this.f.gstIn.value ? this.f.gstIn.value : "";
    companydetails001mb.city = this.f.city.value ? this.f.city.value : "";
    companydetails001mb.state = this.f.state.value ? this.f.state.value : "";
    companydetails001mb.country = this.f.country.value ? this.f.country.value : "";
    companydetails001mb.pinCode = this.f.pinCode.value ? this.f.pinCode.value : "";
    companydetails001mb.emailId = this.f.emailId.value ? this.f.emailId.value : "";
    companydetails001mb.contactNo = this.f.contactNo.value ? this.f.contactNo.value : "";
    if (this.slNo) {
      companydetails001mb.slNo = this.slNo;
      companydetails001mb.unitdepartslNo = this.unitdepartslNo;
      companydetails001mb.insertUser = this.insertUser;
      companydetails001mb.insertDatetime = this.insertDatetime;
      companydetails001mb.updatedUser = this.authManager.getcurrentUser.username;
      companydetails001mb.updatedDatetime = new Date();
      this.companyManager.companyUpdate(companydetails001mb).subscribe((response) => {
        this.calloutService.showSuccess("Company Details Updated Successfully");
        this.detailForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      companydetails001mb.unitdepartslNo= this.user.unitdepartslNo;
      companydetails001mb.insertUser = this.authManager.getcurrentUser.username;
      companydetails001mb.insertDatetime = new Date();
      this.companyManager.companySave(companydetails001mb).subscribe((response) => {
        this.calloutService.showSuccess("Company Details Saved Successfully");
        this.detailForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.detailForm.reset();
  }



  onViewClick() {
    this.companyManager.companydetPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.companyManager.companydetPdf().subscribe((response) => {
      saveAs(response, "Company_Details");
    })
  }

  onGenerateExcelReport() {
    this.companyManager.companydetExcel().subscribe((response) => {
     saveAs(response, "Company_Details");
      });
  }
}
