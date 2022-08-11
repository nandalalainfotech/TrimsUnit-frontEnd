import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { OrderAddItemComponent } from 'src/app/shared/order-add-item/order-add-item.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-material-moments',
  templateUrl: './material-moments.component.html',
  styleUrls: ['./material-moments.component.css']
})
export class MaterialMomentsComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  materialInwardForm: FormGroup | any;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  slNo: number | any;
  supfromSlno: number | any;
  date: Date | any;
  dcNo: string = "";
  dcDate: Date | any;
  description: string = "";
  advisedQty: number | any;
  receivedQty: number | any;
  acceptedQty: number | any;
  rejectedQty: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  orders: Purchaseorder001wb[] = [];
  material: Materialinward001wb[] = [];
  addPopup: any;
  count: any;
  user?: Login001mb | any;
    unitdepartslNo: number | any;
    
  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private purchaseorderManager: PurchaseorderManager,
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

    this.purchaseorderManager.allpurchaseorder().subscribe(response => {
      this.orders = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
    });

    this.materialInwardForm = this.formBuilder.group({
      supfromSlno: ['', Validators.required],
      date: ['', Validators.required],
      dcNo: ['', Validators.required],
      dcDate: ['', Validators.required],
      description: ['', Validators.required],
      advisedQty: ['', Validators.required],
      receivedQty: ['', Validators.required],
      acceptedQty: ['', Validators.required],
      rejectedQty: [''],
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
        headerName: 'Supplier Name',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSupplier.bind(this)
      },
      {
        headerName: 'RM Description',
        field: 'description',
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

  setSupplier(params: any): string {
    return params.data.supfromSlno2 ? params.data.supfromSlno2.supplierFrom : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Material Inward Record";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
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
    const modalRef = this.modalService.open(OrderAddItemComponent, { size: 'lg' });
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
    // materialinward001wb.supfromSlno = this.f.supfromSlno.value ? this.f.supfromSlno.value : "";
    materialinward001wb.date = new Date(this.f.date.value);
    materialinward001wb.dcNo = this.f.dcNo.value ? this.f.dcNo.value : "";
    materialinward001wb.dcDate = this.f.dcDate.value ? this.f.dcDate.value : "";
    // materialinward001wb.description = this.f.description.value ? this.f.description.value : "";
    // materialinward001wb.advisedQty = this.f.advisedQty.value ? this.f.advisedQty.value : "";
    // materialinward001wb.receivedQty = this.f.receivedQty.value ? this.f.receivedQty.value : "";
    // materialinward001wb.acceptedQty = this.f.acceptedQty.value ? this.f.acceptedQty.value : "";
    // materialinward001wb.rejectedQty = this.f.rejectedQty.value ? this.f.rejectedQty.value : "";
    materialinward001wb.grm = this.f.grm.value ? this.f.grm.value : "";
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

  onBlurEvent(event: any) {
    if (this.f.receivedQty.value && this.f.acceptedQty.value) {
      let receivedQty: number = this.f.receivedQty.value ? this.f.receivedQty.value : 0;
      let acceptedQty: number = this.f.acceptedQty.value ? this.f.acceptedQty.value : 0;
      let rejectedQty = receivedQty - acceptedQty;
      this.materialInwardForm.patchValue({
        'rejectedQty': rejectedQty
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
