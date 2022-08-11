import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ProdManager } from 'src/app/shared/services/restcontroller/bizservice/prod.service';
import { Prod001mb } from 'src/app/shared/services/restcontroller/entities/prod001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-production-details',
  templateUrl: './production-details.component.html',
  styleUrls: ['./production-details.component.css']
})
export class ProductionDetailsComponent implements OnInit {

  ProdForm: FormGroup | any;
  frameworkComponents: any;

  public gridOptions: GridOptions | any;

  slNo: number | any;
  submitted = false;
  proddno: string = "";
  proddname: string = "";
  catno: string = "";
  drawingno: string = "";
  cusdetails: string = "";
  remarks: string = "";
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  prodSetting: Prod001mb[] = [];
  prod001mb: Prod001mb[] = [];
  user?: Login001mb | any;
  unitdepartslNo: number | any;




  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private prodManager: ProdManager,
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
    this.ProdForm = this.formBuilder.group({
      proddno: ['', Validators.required],
      proddname: ['', Validators.required],
      catno: ['',],
      drawingno: ['', Validators.required],
      cusdetails: ['', Validators.required],
      remarks: ['', Validators.required],
    })

    this.loadData();
  }

  loadData() {
    this.prodManager.allprod().subscribe(response => {
      this.prod001mb = deserialize<Prod001mb[]>(Prod001mb, response);
      if (this.prod001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.prod001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.ProdForm.controls; }

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
        headerName: 'Product Number',
        field: 'proddno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Product Name',
        field: 'proddname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Reference Number',
        field: 'catno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Drawing Number',
        field: 'drawingno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Customer Details',
        field: 'cusdetails',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Remarks',
        field: 'remarks',
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
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.ProdForm.patchValue({
      'proddno': params.data.proddno,
      'proddname': params.data.proddname,
      'catno': params.data.catno,
      'drawingno': params.data.drawingno,
      'cusdetails': params.data.cusdetails,
      'remarks': params.data.remarks,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.prodManager.prodDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.prod001mb.length; i++) {
            if (this.prod001mb[i].slNo == params.data.slNo) {
              this.prod001mb?.splice(i, 1);
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
    modalRef.componentInstance.title = "Production Audit Report";
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

  onProdClick(event: any, ProdForm: any) {
    this.markFormGroupTouched(this.ProdForm);
    this.submitted = true;
    if (this.ProdForm.invalid) {
      return;
    }

    let prod001mb = new Prod001mb();

    prod001mb.proddno = this.f.proddno.value ? this.f.proddno.value : "";
    prod001mb.proddname = this.f.proddname.value ? this.f.proddname.value : "";
    prod001mb.catno = this.f.catno.value ? this.f.catno.value : "";
    prod001mb.drawingno = this.f.drawingno.value ? this.f.drawingno.value : "";
    prod001mb.cusdetails = this.f.cusdetails.value ? this.f.cusdetails.value : "";
    prod001mb.remarks = this.f.remarks.value ? this.f.remarks.value : "";


    if (this.slNo) {
      prod001mb.slNo = this.slNo;
      prod001mb.unitdepartslNo = this.unitdepartslNo;
      prod001mb.insertUser = this.insertUser;
      prod001mb.insertDatetime = this.insertDatetime;
      prod001mb.updatedUser = this.authManager.getcurrentUser.username;
      prod001mb.updatedDatetime = new Date();
      this.prodManager.prodUpdate(prod001mb).subscribe((response) => {
        this.calloutService.showSuccess("Production Details Updated Successfully");
        this.loadData();
        this.ProdForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      prod001mb.unitdepartslNo= this.user.unitdepartslNo;
      prod001mb.insertUser = this.authManager.getcurrentUser.username;
      prod001mb.insertDatetime = new Date();
      this.prodManager.prodSave(prod001mb).subscribe((response) => {
        this.calloutService.showSuccess("Production Details Saved Successfully");
        this.loadData();
        this.ProdForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.ProdForm.reset();
  }



  onViewClick() {
    this.prodManager.prodPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.prodManager.prodPdf().subscribe((response) => {
      saveAs(response, "Prod-Details");
    })
  }

  onGenerateExcelReport() {
    this.prodManager.prodExcel().subscribe((response) => {
      saveAs(response, "Prod-Details");
    });
  }

}
