import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ConsigneeManager } from 'src/app/shared/services/restcontroller/bizservice/Consignee.service';
import { PurchaseableManager } from 'src/app/shared/services/restcontroller/bizservice/purchaseable.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Purchaseable001mb } from 'src/app/shared/services/restcontroller/entities/purchaseable001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
  selector: 'app-purchaseble-master',
  templateUrl: './purchaseble-master.component.html',
  styleUrls: ['./purchaseble-master.component.css']
})
export class PurchasebleMasterComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  PurchaseableForm: FormGroup | any;
  slNo: number | any;
  submitted = false;
  purscode:  string = "";
  pursname: string = "";
  descrip: string = "";;
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  purchaseableSetting: Purchaseable001mb[] = [];
  purchaseable001mb: Purchaseable001mb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private purchaseableManager: PurchaseableManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      //  linkRenderer: LinkRendererComponent,
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.createDataGrid001();
    this.PurchaseableForm = this.formBuilder.group({
      purscode: ['', Validators.required],
      pursname: ['', Validators.required],
      descrip: ['', Validators.required],
    })

    this.loadData();
  }
  loadData() {
    this.purchaseableManager.allpurchaseable().subscribe(response => {
      this.purchaseable001mb = deserialize<Purchaseable001mb[]>(Purchaseable001mb, response);
      if (this.purchaseable001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.purchaseable001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }
  get f() { return this.PurchaseableForm.controls; }

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
        headerName: 'purchaseable Code',
        field: 'purscode',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'purchaseable Name',
        field: 'pursname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Discription',
        field: 'descrip',
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
  onEditButtonClick(params: any) {
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.PurchaseableForm.patchValue({
      'purscode': params.data.purscode,
      'pursname': params.data.pursname,
      'descrip': params.data.descrip,
    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.purchaseableManager.purchaseableDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.purchaseable001mb.length; i++) {
            if (this.purchaseable001mb[i].slNo == params.data.slNo) {
              this.purchaseable001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Purchaseable Details Removed Successfully");
        });
      }
    })
  }
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Purchaseable  Audit Report";
    modalRef.componentInstance.details = params.data
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onPurchaseableClick(event: any, PurchaseableForm: any) {
    this.markFormGroupTouched(this.PurchaseableForm);
    this.submitted = true;
    if (this.PurchaseableForm.invalid) {
      return;
    }

    let purchaseable001mb = new Purchaseable001mb();

    purchaseable001mb.purscode = this.f.purscode.value ? this.f.purscode.value : "";
    purchaseable001mb.pursname = this.f.pursname.value ? this.f.pursname.value : "";
    purchaseable001mb.descrip = this.f.descrip.value ? this.f.descrip.value : "";


    if (this.slNo) {
      purchaseable001mb.slNo = this.slNo;
      purchaseable001mb.unitdepartslNo = this.unitdepartslNo;
      purchaseable001mb.insertUser = this.insertUser;
      purchaseable001mb.insertDatetime = this.insertDatetime;
      purchaseable001mb.updatedUser = this.authManager.getcurrentUser.username;
      purchaseable001mb.updatedDatetime = new Date();
     this.purchaseableManager.purchaseableUpdate(purchaseable001mb).subscribe((response) => {
        this.calloutService.showSuccess("Purchaseable Details Updated Successfully");
        this.loadData();
        this.PurchaseableForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      purchaseable001mb.unitdepartslNo= this.user.unitdepartslNo;
      purchaseable001mb.insertUser = this.authManager.getcurrentUser.username;
      purchaseable001mb.insertDatetime = new Date();
      this.purchaseableManager.purchaseableSave(purchaseable001mb).subscribe((response) => {
        this.calloutService.showSuccess("Purchaseable Details Saved Successfully");
        this.loadData();
        this.PurchaseableForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.PurchaseableForm.reset();
  }
}
