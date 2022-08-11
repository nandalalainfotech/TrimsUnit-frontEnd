import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LegalDocumentsManager } from 'src/app/shared/services/restcontroller/bizservice/legaldocuments.service';
import { Legal001mb } from 'src/app/shared/services/restcontroller/entities/legaldocuments.mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-legal-documents',
  templateUrl: './legal-documents.component.html',
  styleUrls: ['./legal-documents.component.css']
})
export class LegalDocumentsComponent implements OnInit {
  frameworkComponents: any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  submitted = false;
  public gridOptions: GridOptions | any;
  slNo: number | any;
  dname: string | any;
  legalForm: FormGroup | any;
  legalSetting: Legal001mb[] = [];
  legal001mb?: Legal001mb;
  selectedFile: any;
  user?: Login001mb | any;
  unitdepartslNo: number | any;
  
  constructor(private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private dataSharedService: DataSharedService,
    private httpClient: HttpClient, private http: HttpClient,
    private authManager: AuthManager,
    private baseService: BaseService,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private legaldocumentsManager: LegalDocumentsManager) {
      this.frameworkComponents = {
        iconRenderer: IconRendererComponent
      }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();
    this.legalForm = this.formBuilder.group({

      dname: ['', Validators.required]


    })
    this.loadData();
  }

  onlegal(legalForm: any) {

    this.markFormGroupTouched(this.legalForm);
    this.submitted = true;
    if (this.legalForm.invalid) {
      return;
    }


  }
  loadData() {
    this.legaldocumentsManager.alllegal().subscribe((response: any) => {
      this.legalSetting = deserialize<Legal001mb[]>(Legal001mb, response);
      if (this.legalSetting.length > 0) {
        this.gridOptions?.api?.setRowData(this.legalSetting);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }
  get f() { return this.legalForm.controls }

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
        headerName: 'Document Name',
        field: 'dname',
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
        width: 80,
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
        width: 85,
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

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Legal Document";
    modalRef.componentInstance.details = params.data
  }
  

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.user = this.authManager.getcurrentUser;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.legalForm.patchValue({
      'dname': params.data.dname,
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



  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Legal Document Details";
    modalRef.result.then((data: string) => {
      if (data == "Yes") {
        this.legaldocumentsManager.legalDelete(params.data.slNo).subscribe((response: any) => {
          for (let i = 0; i < this.legalSetting.length; i++) {
            if (this.legalSetting[i].slNo == params.data.slNo) {
              this.legalSetting?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          // this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Legal Document Details Removed Successfully");
        });
      }
    })
  }
  

  onlegalClick(event: any, legalForm: any) {

    this.markFormGroupTouched(this.legalForm);
    this.submitted = true;
    if (this.legalForm.invalid) {
      return;
    }
    let legal001mb = new Legal001mb();
    legal001mb.dname = this.f.dname.value ? this.f.dname.value : "";
    if (this.slNo) {
      legal001mb.slNo = this.slNo;
      legal001mb.unitdepartslNo=this.unitdepartslNo;
      legal001mb.insertUser = this.insertUser;
      legal001mb.insertDatetime = this.insertDatetime;
      legal001mb.updatedUser = this.authManager.getcurrentUser.username;
      legal001mb.updatedDatetime = new Date();
      this.legaldocumentsManager.legalUpdate(legal001mb).subscribe((response: any) => {
        this.calloutService.showSuccess("Legal Documents Updated Successfully");
        this.legalForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      legal001mb.unitdepartslNo=this.user.unitdepartslNo;
      legal001mb.insertUser = this.authManager.getcurrentUser.username;
      legal001mb.insertDatetime = new Date();

      this.legaldocumentsManager.legalSave(legal001mb).subscribe((response: any) => {

        this.calloutService.showSuccess("Legal Documents Saved Successfully");
        this.legalForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.legalForm.reset();
    this.submitted = false;
  }


  onViewClick() {
    this.legaldocumentsManager.legaldocPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }


  onGeneratePdfReport() {
    this.legaldocumentsManager.legaldocPdf().subscribe((response) => {
      if (this.legal001mb) {
        saveAs(response);
      } else {
        saveAs(response, "Legal-Document");
      }
    })
  }

  onGenerateExcelReport() {
    this.legaldocumentsManager.legaldocExcel().subscribe((response) => {
     saveAs(response, "Legal-Document");
      });
  }
}