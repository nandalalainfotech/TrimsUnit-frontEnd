import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { OrderItemSettingManager } from 'src/app/shared/services/restcontroller/bizservice/orderItems.service';
import { Orderitem001mb } from 'src/app/shared/services/restcontroller/entities/Orderitem001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { deserialize } from 'serializer.ts/Serializer';
import { PartspecificationManager } from 'src/app/shared/services/restcontroller/bizservice/partspecification.service';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import * as saveAs from 'file-saver';
import { SpecificationComponent } from 'src/app/shared/specification/specification.component';
import { Partspecification001wb } from 'src/app/shared/services/restcontroller/entities/Partspecification001wb';
import { forkJoin } from 'rxjs';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-part-specification-master',
  templateUrl: './part-specification-master.component.html',
  styleUrls: ['./part-specification-master.component.css']
})
export class PartSpecificationMasterComponent implements OnInit {

  partSpecificationForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;

  slNo: number | any;
  pslno: number | any;
  itemname: string = "";
  splan: string = "";
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  addPopup: string = "";
  updatedDatetime?: Date | null;
  orderitem001mbs: Orderitem001mb[] = [];
  partspecification001wb: Partspecification001wb[] = [];
  itemcodes : Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  specifications:any;
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private orderItemSettingManager: OrderItemSettingManager,
    private partspecificationManager: PartspecificationManager,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private httpClient: HttpClient) {
    this.frameworkComponents = {
      //  linkRenderer: LinkRendererComponent,
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    
    this.loadData()

    this.partSpecificationForm = this.formBuilder.group({
      pslno: [''], 
      itemname: [''],
      splan: [''] 
    })

    this.orderItemSettingManager.allitem().subscribe(response => {
      this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);
      
    });

    let rep0 = this.orderItemSettingManager.allitem();
    forkJoin([rep0]).subscribe((data: any) => {
      this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, data[0]);
      this.loadData();
    });
  }

  loadData() {
    this.partspecificationManager.allPartspecification().subscribe(response => {
       this.partspecification001wb = deserialize<Partspecification001wb[]>(Partspecification001wb, response);
    
      if (this.partspecification001wb.length > 0) {
        this.gridOptions?.api?.setRowData(this.partspecification001wb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
     
    });
  }

  get f() { return this.partSpecificationForm.controls; }
  
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
        headerName: 'Item Code',
        field: 'pslno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setItemcode.bind(this)

      },
      {
        headerName: 'Item Name',
        field: 'itemname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Sampling Plan',
        field: 'splan',
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


  setItemcode(params: any): string {
    return params.data.pslno ? this.orderitem001mbs.find(x => x.slNo === params.data.pslno)?.itemcode : null;
  }
 

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.partSpecificationForm.patchValue({
      'pslno': params.data.pslno,
      'itemname': params.data.itemname,
      'splan': params.data.splan,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.partspecificationManager.PartspecificationDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.partspecification001wb.length; i++) {
            if (this.partspecification001wb[i].slNo == params.data.slNo) {
              this.partspecification001wb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Production Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Part Specification Report";
    modalRef.componentInstance.details = params.data
  }

  onAddbuttonClick(object: any) {
    const modalRef = this.modalService.open(SpecificationComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.specifications = this.specifications;
    modalRef.result.then((data) => {
      if (data.status == 'Yes') {
        this.specifications = data.specifications;
        console.log("this.specifications",this.specifications);
        


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

  onPartSpecification(event: any, partSpecificationForm: any) {
    this.markFormGroupTouched(this.partSpecificationForm);
    this.submitted = true;
    if (this.partSpecificationForm.invalid) {
      return;
    }

    let partspecification001wb = new Partspecification001wb();

    partspecification001wb.pslno = this.f.pslno.value ? this.f.pslno.value : "";
    partspecification001wb.itemname = this.f.itemname.value ? this.f.itemname.value : "";
    partspecification001wb.splan = this.f.splan.value ? this.f.splan.value : "";
    partspecification001wb.specification2 = this.specifications;

    if (this.slNo) {
      partspecification001wb.slNo = this.slNo;
      partspecification001wb.unitdepartslNo = this.unitdepartslNo;
      partspecification001wb.insertUser = this.insertUser;
      partspecification001wb.insertDatetime = this.insertDatetime;
      partspecification001wb.updatedUser = this.authManager.getcurrentUser.username;
      partspecification001wb.updatedDatetime = new Date();
      this.partspecificationManager.PartspecificationUpdate(partspecification001wb).subscribe((response) => {
        this.calloutService.showSuccess("Production Details Updated Successfully");
        this.loadData();
        this.partSpecificationForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      partspecification001wb.unitdepartslNo= this.user.unitdepartslNo;
      partspecification001wb.insertUser = this.authManager.getcurrentUser.username;
      partspecification001wb.insertDatetime = new Date();
      this.partspecificationManager.PartspecificationSave(partspecification001wb).subscribe((response) => {
        this.calloutService.showSuccess("Production Details Saved Successfully");
        this.loadData();
        this.partSpecificationForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.partSpecificationForm.reset();
  }

  onChange(event: any) {
    this.orderItemSettingManager.findOne(event.target.value).subscribe(response => {
      this.orderitem001mb = deserialize<Orderitem001mb>(Orderitem001mb, response);
      this.partSpecificationForm.patchValue({
        'itemname': this.orderitem001mb.itemname,
      })
    });
  }

  onViewClick() {
    this.partspecificationManager.PartspecificationPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.partspecificationManager.PartspecificationPdf().subscribe((response) => {
      saveAs(response, "Prod-Details");
    })
  }

  onGenerateExcelReport() {
    this.partspecificationManager.PartspecificationExcel().subscribe((response) => {
      saveAs(response, "Prod-Details");
    });
  }
}
