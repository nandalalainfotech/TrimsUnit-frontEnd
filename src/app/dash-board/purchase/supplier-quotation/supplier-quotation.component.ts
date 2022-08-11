import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { Supplierquotation001wb } from 'src/app/shared/services/restcontroller/entities/supplierquotation001wb ';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { OrderItemSettingManager } from 'src/app/shared/services/restcontroller/bizservice/orderItems.service';
import { Orderitem001mb } from 'src/app/shared/services/restcontroller/entities/Orderitem001mb';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AddQuotationComponent } from 'src/app/shared/add-quotation/add-quotation.component';
import { Supplierquotationitems001wb } from 'src/app/shared/services/restcontroller/entities/Supplierquotationitems001wb';
import { SupplierContactManager } from 'src/app/shared/services/restcontroller/bizservice/supplierContact.service';
import { SupplierContact001wb } from 'src/app/shared/services/restcontroller/entities/SupplierContact001wb';
import { event } from 'jquery';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-supplier-quotation',
  templateUrl: './supplier-quotation.component.html',
  styleUrls: ['./supplier-quotation.component.css']
})
export class SupplierQuotationComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  PurchaseQuotationForm: FormGroup | any;
  submitted = false;
  slNo?: number;
  supplierSlno?: number;
  supliername?: string;
  supliertype?: string;
  address?: string;
  quotationNo?: string;
  quotationDate?: Date;
  validity?: Date;
  personName?: string;
  desgnation?: string;
  mnumber?: number;
  mobile?: number;
  mailid?: string;
  department?: string;
  level?: string;
  termsCondition?: string;
  prsno: string = "";
  // filename: string = "";
  // filepath: string = "";
  // originalfilename: string = "";
  status?: string;
  remarks?: string;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  addPopup: string = "";
  minDate = new Date();
  maxDate = new Date();
  supplierquotations: Supplierquotation001wb[] = [];
  purchasereqs: Purchasereqslip001wb[] = [];
  supplierregs: Supplierregistration001mb[] = [];
  supplierregistration001mb?: Supplierregistration001mb;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  selectedFile: any;
  supplierItems?: Supplierquotationitems001wb[];
  supplierContact001wbs: SupplierContact001wb[] = [];
  supplierContact001wb?: SupplierContact001wb;
  purchasereqslip001wbs: Purchasereqslip001wb[] = [];
  purchasereqslip001wb?: Purchasereqslip001wb;
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private formBuilder: FormBuilder,
    private supplierQuotationManager: SupplierQuotationManager,
    private supplierRegManager: SupplierRegManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private orderItemSettingManager: OrderItemSettingManager,
    private supplierContactManager: SupplierContactManager,
    private router: Router,
    private purchaseregslipManager: PurchasereqslipManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.createDataGrid001();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    let rep0 = this.supplierRegManager.allSupplier();
    let rep1 = this.purchaseregslipManager.allpurchaseslip();

    forkJoin([rep0, rep1]).subscribe((data: any) => {
      this.supplierregs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, data[0]);
      this.purchasereqslip001wbs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, data[1]);
      this.loadData();
    });

    this.supplierContactManager.suppliercontactall().subscribe((response) => {
      this.supplierContact001wbs = deserialize<SupplierContact001wb[]>(SupplierContact001wb, response);
   console.log("this.supplierContact001wbs", this.supplierContact001wbs);
    });

    // this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
    //   this.purchasereqslip001wbs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
    // });
    this.loadData();

    // this.PurchaseQuotationForm.patchValue({
    //   'termsCondition': 'GST charges extra as per HSN/SAC  Code',
    // });

    this.PurchaseQuotationForm = this.formBuilder.group({
      supplierSlno: ['',],
      supliername: ['', Validators.required],
      supliertype: ['', Validators.required],
      address: ['', Validators.required],
      quotationNo: ['', Validators.required],
      quotationDate: ['', Validators.required],
      validity: ['', Validators.required],
      personName: ['', Validators.required],
      desgnation: ['', Validators.required],
      mnumber: ['', Validators.required],
      mobile: ['', Validators.required],
      mailid: ['', Validators.required],
      department: ['', Validators.required],
      level: ['', Validators.required],
      termsCondition: ['GST charges extra as per HSN/SAC  Code', Validators.required],
      // filename: [''],
      prsno: [''],
      status: ['',],
      remarks: ['',],
    })
    
  }


  loadData() {
    this.supplierQuotationManager.allSupplierQuotation().subscribe(response => {
      this.supplierquotations = deserialize<Supplierquotation001wb[]>(Supplierquotation001wb, response);
      if (this.supplierquotations.length > 0) {
        this.gridOptions?.api?.setRowData(this.supplierquotations);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.PurchaseQuotationForm.controls }

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
        headerName: 'PRS No',
        field: 'prsno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setPRS.bind(this)
      },
      {
        headerName: 'Supplier code',
        // field: 'add',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSupplierName.bind(this)
      },
      {
        headerName: 'Supplier Name',
        field: 'supliername',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setSupplierName.bind(this)
      },
      {
        headerName: 'Supplier type',
        field: 'supliertype',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setSupplierName.bind(this)
      },
      {
        headerName: 'Address',
        field: 'address',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quotation No',
        field: 'quotationNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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
          return params.data.quotationDate ? this.datepipe.transform(params.data.quotationDate, 'dd-MM-yyyy') : '';
        }
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
          return params.data.validity ? this.datepipe.transform(params.data.validity, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Terms and Conditions',
        field: 'termsCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Person Name',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setItemCode.bind(this)
      },
      {
        headerName: 'Designation',
        field: 'itemname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setItemName.bind(this)
      },
      {
        headerName: 'Department',
        field: 'description',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Level',
        field: 'quantity',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Mobile Number',
        field: 'mnumber',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Alter Mobile Number',
        field: 'monile',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Mail Id',
        field: 'mailid',
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

  setItemCode(params: any): string {
    return params.data.itemSlno ? this.orderitem001mbs.find(x => x.slNo === params.data.itemSlno)?.itemcode : null;
  }
  setPRS(params: any): string{
    console.log("this.purchasereqslip001wbs", params.data.prsno);
    
    return params.data.prsno ? this.purchasereqslip001wbs.find(x => x.slNo === params.data.prsno)?.prsNo : null;
  }
  setSupplierName(params: any): string {
    // return params.data.supplierSlno2 ? params.data.supplierSlno2.supplierCode : null;
    return params.data.supplierSlno ? this.supplierregs.find(x => x.slNo === params.data.supplierSlno)?.supplierCode : null;
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
    return true;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Supplier Quotation";
    modalRef.componentInstance.details = params.data
  }

  onChangeprsNo(event: any) {
    this.purchaseregslipManager.findOne(event.target.value).subscribe(response => {
      this.purchasereqslip001wb = deserialize<Purchasereqslip001wb>(Purchasereqslip001wb, response);
    });
    const modalRef = this.modalService.open(AddQuotationComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.prsNumber = event.target.value;
    modalRef.componentInstance.supplierItems = this.supplierItems;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.supplierItems = data.supplierItems;
      }
    })
  }


  onAddbuttonClick(object: any) {
    const modalRef = this.modalService.open(AddQuotationComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.supplierItems = this.supplierItems;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.supplierItems = data.supplierItems;

       
      }
    })
  }
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.PurchaseQuotationForm.patchValue({
      'itemSlno': params.data.itemSlno,
      'itemname': params.data.itemname,
      'supplierSlno': params.data.supplierSlno,
      'address': params.data.address,
      'quotationNo': params.data.quotationNo,
      'quotationDate': new Date(params.data.quotationDate),
      'validity': new Date(params.data.validity),
      'personName': params.data.personName,
      'description': params.data.description,
      'quantity': params.data.quantity,
      'price': params.data.price,
      'number': params.data.number,
      'mailId': params.data.mailId,
      'status': params.data.status,
      'remarks': params.data.remarks,
      'termsCondition': params.data.termsCondition,
    });
  }
  onFileSelected(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Supplier Quotation";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.supplierQuotationManager.SupplierQuotationDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.supplierquotations.length; i++) {
            if (this.supplierquotations[i].slNo == params.data.slNo) {
              this.supplierquotations?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Supplier Quotation Removed Successfully");
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

  onSupplierQuotationClick(event: any, PurchaseQuotationForm: any) {
console.log("PurchaseQuotationForm",PurchaseQuotationForm);

    this.markFormGroupTouched(this.PurchaseQuotationForm);
    this.submitted = true;
    if (this.PurchaseQuotationForm.invalid) {
      return;
    }

    let supplierquotation001wb = new Supplierquotation001wb();
    supplierquotation001wb.supliername = this.f.supliername.value ? this.f.supliername.value : "";
    supplierquotation001wb.supliertype = this.f.supliertype.value ? this.f.supliertype.value : "";
    supplierquotation001wb.supplierSlno = this.f.supplierSlno.value ? this.f.supplierSlno.value : "";
    supplierquotation001wb.address = this.f.address.value ? this.f.address.value : "";
    supplierquotation001wb.quotationNo = this.f.quotationNo.value ? this.f.quotationNo.value : "";
    supplierquotation001wb.quotationDate = new Date(this.f.quotationDate.value);
    supplierquotation001wb.validity = new Date(this.f.validity.value);
    supplierquotation001wb.personName = this.f.personName.value ? this.f.personName.value : "";
    supplierquotation001wb.desgnation = this.f.desgnation.value ? this.f.desgnation.value : "";
    supplierquotation001wb.mnumber = this.f.mnumber.value ? this.f.mnumber.value : "";
    supplierquotation001wb.mobile = this.f.mobile.value ? this.f.mobile.value : "";
    supplierquotation001wb.mailid = this.f.mailid.value ? this.f.mailid.value : "";
    supplierquotation001wb.prsno = this.f.prsno.value ? this.f.prsno.value : "";
    supplierquotation001wb.department = this.f.department.value ? this.f.department.value : "";
    supplierquotation001wb.termsCondition = this.f.termsCondition.value ? this.f.termsCondition.value : "";
    supplierquotation001wb.level = this.f.level.value ? this.f.level.value : "";
    // supplierquotation001wb.filename = this.f.filename.value ? this.f.filename.value : "";
    supplierquotation001wb.supplierItems = this.supplierItems;
console.log("supplierquotation001wb.supplierItems ",supplierquotation001wb.supplierItems );

    supplierquotation001wb.remarks = this.f.remarks.value ? this.f.remarks.value : "";
    supplierquotation001wb.status = "Request For Approval";
    if (this.slNo) {
      supplierquotation001wb.slNo = this.slNo;
      supplierquotation001wb.unitdepartslNo = this.unitdepartslNo;
      supplierquotation001wb.insertUser = this.insertUser;
      supplierquotation001wb.insertDatetime = this.insertDatetime;
      supplierquotation001wb.updatedUser = this.authManager.getcurrentUser.username;
      supplierquotation001wb.updatedDatetime = new Date();
      this.supplierQuotationManager.SupplierQuotationUpdate(supplierquotation001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Quotation Updated Successfully");
        this.PurchaseQuotationForm.reset();
        this.loadData();
        // this.slNo = null;
        this.submitted = false;
        this.PurchaseQuotationForm.patchValue({
          'termsCondition': 'GST charges extra as per HSN/SAC  Code',
        });
      });
    } else {
      supplierquotation001wb.unitdepartslNo= this.user.unitdepartslNo;
      supplierquotation001wb.insertUser = this.authManager.getcurrentUser.username;
      supplierquotation001wb.insertDatetime = new Date();
      this.supplierQuotationManager.SupplierQuotationSave(supplierquotation001wb).subscribe((response) => {
        console.log("response",response);
        
        this.calloutService.showSuccess("Supplier Quotation Saved Successfully");
        this.PurchaseQuotationForm.reset();
        this.loadData();
        this.submitted = false;
        this.PurchaseQuotationForm.patchValue({
          'termsCondition': 'GST charges extra as per HSN/SAC  Code',
        });
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.PurchaseQuotationForm.reset();
  }

  onChange(event: any) {

    this.supplierRegManager.findOne(event.target.value).subscribe(response => {
      this.supplierregistration001mb = deserialize<Supplierregistration001mb>(Supplierregistration001mb, response);
     console.log("this.supplierregistration001mb=====?>>>", this.supplierregistration001mb);
      this.PurchaseQuotationForm.patchValue({
        'supliername': this.supplierregistration001mb.supplierName,
        'supliertype': this.supplierregistration001mb.supcategory,
        'address': this.supplierregistration001mb.address,
      })
    });
    
  }

  onChangeper(event: any){
    this.supplierContactManager.findAllbysupplierId(event.target.value).subscribe((response) => {
      this.supplierContact001wbs = deserialize<SupplierContact001wb[]>(SupplierContact001wb, response);
      console.log("this.supplierContact001wbs=====?>>>", this.supplierContact001wbs);
    });
  }

  onChangePerson(event: any) {
    this.supplierContactManager.findOne(event.target.value).subscribe((response) => {
      this.supplierContact001wb = deserialize<SupplierContact001wb>(SupplierContact001wb, response);
      this.PurchaseQuotationForm.patchValue({
        'desgnation': this.supplierContact001wb.designation,
        'department': this.supplierContact001wb.department,
        'level': this.supplierContact001wb.level,
        'mnumber': this.supplierContact001wb.mnumber,
        'mobile': this.supplierContact001wb.altmnumber,
        'mailid': this.supplierContact001wb.mailid,
      })
    });
  }


  onViewClick() {
    this.supplierQuotationManager.supplierQuotationPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.supplierQuotationManager.supplierQuotationPdf().subscribe((response) => {
      saveAs(response, "supplierQuotation");
    })
  }

  onGenerateExcelReport() {
    this.supplierQuotationManager.supplierQuotationExcel().subscribe((response) => {
      saveAs(response, "supplierQuotation");
    })
  }


  onViewButtonClick(params: any) {
    this.supplierQuotationManager.paramsPdf(params.data.slNo).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })

  }
  onPdfButtonClick(params: any) {
    this.supplierQuotationManager.paramsPdf(params.data.slNo).subscribe((response) => {
      saveAs(response, "supplierQuotation");
    })

  }
  onEXcelButtonClick(params: any) {
    this.supplierQuotationManager.supplierExcel(params.data.slNo).subscribe((response) => {
      saveAs(response, "supplierQuotation");
    })

  }

  onStatusClick() {

    this.router.navigate(["/app-dash-board/app-approval/app-approval-request"]);
  }

}