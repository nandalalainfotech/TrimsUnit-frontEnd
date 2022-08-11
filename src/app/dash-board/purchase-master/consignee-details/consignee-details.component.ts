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
import { ConsigneeManager } from 'src/app/shared/services/restcontroller/bizservice/Consignee.service';
import { Companydetails001mb } from 'src/app/shared/services/restcontroller/entities/Companydetails001mb';
import { Consignee001mb } from 'src/app/shared/services/restcontroller/entities/Consignee001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-consignee-details',
  templateUrl: './consignee-details.component.html',
  styleUrls: ['./consignee-details.component.css']
})
export class ConsigneeDetailsComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  consigneeForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  companySlno: number | any;
  consignee: string = "";
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
  companydetails: Companydetails001mb[] = [];
  consignees: Consignee001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private companyManager: CompanyDetailsManager,
    private consigneeManager: ConsigneeManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();

    this.loadData();

    this.consigneeForm = this.formBuilder.group({
      companySlno: ['', Validators.required],
      consignee: ['', Validators.required],
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

    this.companyManager.allcompany().subscribe(response => {
      this.companydetails = deserialize<Companydetails001mb[]>(Companydetails001mb, response);
    });

  }

  loadData() {
    this.consigneeManager.allconsignee().subscribe(response => {
      this.consignees = deserialize<Consignee001mb[]>(Consignee001mb, response);
      if (this.consignees.length > 0) {
        this.gridOptions?.api?.setRowData(this.consignees);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.consigneeForm.controls }

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
        field: 'consignee',
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
        headerName: 'Address 3',
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

  setInvoiceTo(params: any): string {
    return params.data.companySlno2 ? params.data.companySlno2.company : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Consignee";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.consigneeForm.patchValue({
      'companySlno': params.data.companySlno,
      'consignee': params.data.consignee,
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
    modalRef.componentInstance.details = "Consignee";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.consigneeManager.consigneeDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.consignees.length; i++) {
            if (this.consignees[i].slNo == params.data.slNo) {
              this.consignees?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Consignee Removed Successfully");
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

  onconsigneeClick(event: any, consigneeForm: any) {
    this.markFormGroupTouched(this.consigneeForm);
    this.submitted = true;
    if (this.consigneeForm.invalid) {
      return;
    }

    let consignee001mb = new Consignee001mb();
    consignee001mb.companySlno = this.f.companySlno.value ? this.f.companySlno.value : "";
    consignee001mb.consignee = this.f.consignee.value ? this.f.consignee.value : "";
    consignee001mb.address1 = this.f.address1.value ? this.f.address1.value : "";
    consignee001mb.address2 = this.f.address2.value ? this.f.address2.value : "";
    consignee001mb.address3 = this.f.address3.value ? this.f.address3.value : "";
    consignee001mb.gstIn = this.f.gstIn.value ? this.f.gstIn.value : "";
    consignee001mb.city = this.f.city.value ? this.f.city.value : "";
    consignee001mb.state = this.f.state.value ? this.f.state.value : "";
    consignee001mb.country = this.f.country.value ? this.f.country.value : "";
    consignee001mb.pinCode = this.f.pinCode.value ? this.f.pinCode.value : "";
    consignee001mb.emailId = this.f.emailId.value ? this.f.emailId.value : "";
    consignee001mb.contactNo = this.f.contactNo.value ? this.f.contactNo.value : "";
    if (this.slNo) {
      consignee001mb.slNo = this.slNo;
      consignee001mb.unitdepartslNo = this.unitdepartslNo;
      consignee001mb.insertUser = this.insertUser;
      consignee001mb.insertDatetime = this.insertDatetime;
      consignee001mb.updatedUser = this.authManager.getcurrentUser.username;
      consignee001mb.updatedDatetime = new Date();
      this.consigneeManager.consigneeUpdate(consignee001mb).subscribe((response) => {
        this.calloutService.showSuccess("Consignee Updated Successfully");
        this.consigneeForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      consignee001mb.unitdepartslNo= this.user.unitdepartslNo;
      consignee001mb.insertUser = this.authManager.getcurrentUser.username;
      consignee001mb.insertDatetime = new Date();
      this.consigneeManager.consigneeSave(consignee001mb).subscribe((response) => {
        this.calloutService.showSuccess("Consignee Saved Successfully");
        this.consigneeForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.consigneeForm.reset();
  }

  onViewClick() {
    this.consigneeManager.consigneePdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.consigneeManager.consigneePdf().subscribe((response) => {
      saveAs(response, "consignee_Details");
    })
  }

  onGenerateExcelReport() {
    this.consigneeManager.consigneeExcel().subscribe((response) => {
     saveAs(response, "consignee_Details");
      });
  }
}
