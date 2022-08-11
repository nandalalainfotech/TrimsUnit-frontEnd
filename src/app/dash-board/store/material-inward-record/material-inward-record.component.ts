import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { param } from 'jquery';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MaterialInwardManager } from 'src/app/shared/services/restcontroller/bizservice/Materialinward.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { Materialinward001wb } from 'src/app/shared/services/restcontroller/entities/Materialinward001wb';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { forkJoin } from 'rxjs';
import { OrderAddItemComponent } from 'src/app/shared/order-add-item/order-add-item.component';
import { OrderItemManager } from 'src/app/shared/services/restcontroller/bizservice/orderitem-wb.service';
import { Orderitem001wb } from 'src/app/shared/services/restcontroller/entities/orderitem001wb';
import { MetriealinwardComponent } from 'src/app/shared/metriealinward/metriealinward.component';
import { Materialreceiveditem001wb } from 'src/app/shared/services/restcontroller/entities/Materialreceiveditem001wb';
import { CompanyDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/Companydetails.service';
import { Companydetails001mb } from 'src/app/shared/services/restcontroller/entities/Companydetails001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-material-inward-record',
  templateUrl: './material-inward-record.component.html',
  styleUrls: ['./material-inward-record.component.css']
})
export class MaterialInwardRecordComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  materialInwardForm: FormGroup | any;
  materialFormArray: FormArray | any;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  slNo: number | any;
  purchseSlno: number | any;
  quantySlno: number | any;
  date: Date | any;
  dcNo: string = "";
  supliername: string = "";
  invoiceno: string = "";
  grm: string = "";
  dcDate: Date | any;
  advisedQty: number | any;
  receivedQty: number | any;
  acceptedQty: number | any;
  rejectedQty: number | any;
  outstanding: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  purOrders: any = [];

  companydetails001mbs: Companydetails001mb[] = [];
  orderItem: Orderitem001wb[] = [];
  orderitem001wb?: Orderitem001wb;
  material: Materialinward001wb[] = [];
  poNumber: Purchaseorder001wb[] = [];
  purchaseorder001wbs: Purchaseorder001wb[] = [];
  purchaseorder001wb?: Purchaseorder001wb;
  materialreceiveditem: Materialreceiveditem001wb[] = [];
  addPopup: any;
  count: any;
  user?: Login001mb | any;
    unitdepartslNo: number | any;
    
  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private purchaseorderManager: PurchaseorderManager,
    private companyManager: CompanyDetailsManager,
    private orderItemManager: OrderItemManager,
    private materialInwardManager: MaterialInwardManager,
    private datepipe: DatePipe) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.createDataGrid001();
    this.loadData();

    let rep0 = this.purchaseorderManager.allpurchaseorder();
    // let rep1 = this.companyManager.allcompany();
    forkJoin([rep0,]).subscribe((data: any) => {
      this.purchaseorder001wbs = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, data[0]);
    });

    this.materialInwardForm = this.formBuilder.group({
      purchseSlno: [''],
      date: ['', Validators.required],
      dcNo: ['', Validators.required],
      invoiceno: ['', Validators.required],
      dcDate: ['', Validators.required],
      supliername: [''],
      grm: ['']
    })


  }


  get f() { return this.materialInwardForm.controls }

  loadData() {
    this.materialInwardManager.allinward().subscribe(response => {
      this.material = deserialize<Materialinward001wb[]>(Materialinward001wb, response);
      if (this.material.length > 0) {
        this.gridOptions?.api?.setRowData(this.material);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.materialInwardManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.materialInwardForm.patchValue({
        grm: String("GRN22JN") + String(this.count).padStart(4, '0')
      });
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
        headerName: 'D.C No',
        field: 'dcNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Invoice No',
        field: 'invoiceno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'D.C Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.dcDate ? this.datepipe.transform(params.data.dcDate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'P.O No',
        // field: 'purchseSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setPonocode.bind(this)
      },
      {
        headerName: 'Supplier Name',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSupplierName.bind(this)
      },
      {
        headerName: 'Goods Received Number',
        field: 'grm',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Advised Quantity',
        field: 'advisedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Received Quantity',
        field: 'receivedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Accepted Quantity',
        field: 'acceptedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Rejected Quantity',
        field: 'rejectedQty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Rejected Quantity',
        field: 'outstanding',
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

  // setPonocode(params: any): string {
  //   return params.data.purchseSlno ? this.purchaseorder001wbs.find(x => x.slNo === params.data.purchseSlno)?.pono : null;
  // }

  setSupplierName(params: any): string {
    console.log("this.purchaseorder001wbs", this.purchaseorder001wbs);
    return params.data.supliername ? this.purchaseorder001wbs.find(x => x.slNo === params.data.supliername)?.companySlno2?.company : null;

  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Material Inward Record";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    console.log("params====>>", params);

    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.materialInwardForm.patchValue({
      'date': new Date(params.data.date),
      'supfromSlno': params.data.supfromSlno,
      'dcNo': params.data.dcNo,
      'dcDate': new Date(params.data.dcDate),
      'description': params.data.description,
      'advisedQty': params.data.advisedQty,
      'receivedQty': params.data.receivedQty,
      'acceptedQty': params.data.acceptedQty,
      'rejectedQty': params.data.rejectedQty,
    });
  }
  onAddbuttonClick(object: any) {
    // const modalRef = this.modalService.open(OrderAddItemComponent, { size: 'lg' });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Material Inward Record";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.materialInwardManager.inwardDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.material.length; i++) {
            if (this.material[i].slNo == params.data.slNo) {
              this.material?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Material Inward Record Removed Successfully");
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

  onMaterialInwardClick(event: any, materialInwardForm: any) {
    this.markFormGroupTouched(this.materialInwardForm);
    this.submitted = true;
    if (this.materialInwardForm.invalid) {
      return;
    }

    let materialinward001wb = new Materialinward001wb();
    materialinward001wb.purchseSlno = this.f.purchseSlno.value ? this.f.purchseSlno.value : "";
    materialinward001wb.date = new Date(this.f.date.value);
    materialinward001wb.dcNo = this.f.dcNo.value ? this.f.dcNo.value : "";
    materialinward001wb.invoiceno = this.f.invoiceno.value ? this.f.invoiceno.value : "";
    materialinward001wb.supliername = this.f.supliername.value ? this.f.supliername.value : "";
    materialinward001wb.dcDate = this.f.dcDate.value ? this.f.dcDate.value : "";
    materialinward001wb.grm = this.f.grm.value ? this.f.grm.value : "";
    materialinward001wb.metriealitems = this.materialreceiveditem;
    if (this.slNo) {
      materialinward001wb.slNo = this.slNo;
      materialinward001wb.unitdepartslNo = this.unitdepartslNo;
      materialinward001wb.insertUser = this.insertUser;
      materialinward001wb.insertDatetime = this.insertDatetime;
      materialinward001wb.updatedUser = this.authManager.getcurrentUser.username;
      materialinward001wb.updatedDatetime = new Date();
      this.materialInwardManager.inwardUpdate(materialinward001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Inward Record Updated Successfully");
        this.materialInwardForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      // materialinward001wb.date = new Date();
      // materialinward001wb.dcDate = new Date();
      materialinward001wb.unitdepartslNo= this.user.unitdepartslNo;
      materialinward001wb.insertUser = this.authManager.getcurrentUser.username;
      materialinward001wb.insertDatetime = new Date();
      this.materialInwardManager.inwardSave(materialinward001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Inward Record Saved Successfully");
        this.materialInwardForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.materialInwardForm.reset();
  }

  onChangePONumber(event: any) {
    this.purchaseorderManager.findOne(event.target.value).subscribe(response => {
      this.purchaseorder001wb = deserialize<Purchaseorder001wb>(Purchaseorder001wb, response);
      this.materialInwardForm.patchValue({
        // 'supliername': this.purchaseorder001wb.companySlno
      })

    });
    const modalRef = this.modalService.open(MetriealinwardComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.poNumber = event.target.value;
    modalRef.componentInstance.materialreceiveditem = this.materialreceiveditem;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.materialreceiveditem = data.materialreceiveditem;
      }
    })




  }

  onChanges(event: any) {
    this.orderItemManager.findOne(event.target.value).subscribe(response => {
      this.orderitem001wb = deserialize<Orderitem001wb>(Orderitem001wb, response);
      console.log("this.orderItem", this.orderitem001wb);
      this.materialInwardForm.patchValue({
        'advisedQty': this.orderitem001wb.qunty
      })
    });
  }

  onBlurEvent(event: any) {
    if (this.f.receivedQty.value && this.f.acceptedQty.value && this.f.advisedQty.value) {
      let receivedQty: number = this.f.receivedQty.value ? this.f.receivedQty.value : 0;
      let acceptedQty: number = this.f.acceptedQty.value ? this.f.acceptedQty.value : 0;
      let advisedQty: number = this.f.advisedQty.value ? this.f.advisedQty.value : 0;
      let rejectedQty = receivedQty - acceptedQty;
      let outstanding = advisedQty - receivedQty;
      let outstanding1 = outstanding + rejectedQty
      this.materialInwardForm.patchValue({
        'rejectedQty': rejectedQty,
        'outstanding': outstanding1
      })
    }
  }

  onViewClick() {
    this.materialInwardManager.materialinwardPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.materialInwardManager.materialinwardPdf().subscribe((response) => {
      saveAs(response, "Material_Inward_Details");
    })
  }

  onGenerateExcelReport() {
    this.materialInwardManager.materialinwardExcel().subscribe((response) => {
      saveAs(response, "Material_Inward_Details");
    });
  }


}
