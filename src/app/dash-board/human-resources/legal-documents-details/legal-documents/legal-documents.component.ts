import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LegalManager } from 'src/app/shared/services/restcontroller/bizservice/legal.service';
import { LegalDocumentsManager } from 'src/app/shared/services/restcontroller/bizservice/legaldocuments.service';
import { Legal001wb } from 'src/app/shared/services/restcontroller/entities/legal.mb';
import { Legal001mb } from 'src/app/shared/services/restcontroller/entities/legaldocuments.mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { File001mb } from 'src/app/shared/services/restcontroller/entities/file001mb';
import { FileDocumetManager } from 'src/app/shared/services/restcontroller/bizservice/file.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-legal-documents',
  templateUrl: './legal-documents.component.html',
  styleUrls: ['./legal-documents.component.css']
})
export class LegalDocumentsComponent implements OnInit {
  slNo: any;
  dname: string = "";
  ftype: string = "";
  cslno: number | any;
  fslno: number | any;
  cno: number | any;
  date1: Date | any;
  date: Date | any;
  filename: string = "";
  filepath: string = "";
  originalfilename: string = "";
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  currentlegal001mb: Legal001mb[] = [];
  legalsetting: Legal001wb[]=[];
  legal001wb?:Legal001wb;
  legal001mb?:Legal001mb;
  legalsettings: Legal001mb[]=[];
  file001mb?:File001mb[] = [];
  currentfile001mb:File001mb[] = [];
  legalForm: FormGroup | any;
  submitted: any;
  selectedFile: any;
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(
    private httpClient: HttpClient,
    private http: HttpClient,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private fileDocumetManager: FileDocumetManager,
    private dataSharedService: DataSharedService,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private legalmanager: LegalManager,
    private legaldocumentsManager: LegalDocumentsManager,
    private datepipe: DatePipe) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.legaldocumentsManager.alllegal().subscribe(response => {
    this.currentlegal001mb = deserialize<Legal001mb[]>(Legal001mb, response);
    });
    this.fileDocumetManager.allfile().subscribe(response => {
      this.currentfile001mb = deserialize<File001mb[]>(File001mb, response);
      });
    this.createDataGrid001();
    this.legalForm = this.formBuilder.group({
  
      cslno: ['', Validators.required],
      fslno: ['', Validators.required],
      cno: ['', Validators.required],
      date: ['', Validators.required],
      date1: ['', Validators.required],
      filename: [''],
    })
    this.loadData();
  }

  loadData() {
    this.legalmanager.alllegal().subscribe((response: any) => {
      this.legalsetting = deserialize<Legal001wb[]>(Legal001wb, response);
      if (this.legalsetting.length > 0) {
        this.gridOptions?.api?.setRowData(this.legalsetting);
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
        headerName: 'Complain des',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setlegal.bind(this)

        // valueGetter: this.setlegaldocuments.bind(this),


      },
      {
        headerName: 'Certificate no',
        field: 'cno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Date',
        //  field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datePipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Date',
        // /field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date1 ? this.datePipe.transform(params.data.date1, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'File Document ',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setfile.bind(this)

        // valueGetter: this.setlegaldocuments.bind(this),


      },
      {
        headerName: 'File Name',
         field: 'filename',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: "",
         headerComponentParams: { template: '<span><i class="fa fa-download"></i></span>' },
        cellRenderer: 'iconRenderer',
        // flex: 1,
        width: 50,
        suppressSizeToFit: true,
        cellRendererParams: {
            label: 'File3'

        },
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


  setlegal(params: any): string {
    return params.data.cslno2 ? params.data.cslno2.dname : null;
  }
  setfile(params: any): string {
    return params.data.fslno2 ? params.data.fslno2.ftype : null;
  }


  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Legal Documents";
    modalRef.componentInstance.details = params.data
  }
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.legalForm.patchValue({
     
      'cno': params.data.cno,
      'cslno': params.data.cslno,
      'fslno': params.data.fslno,
      'date': new Date(params.data.date),
      'date1': new Date(params.data.date1),
      'filename': params.data.filename,
    });
  }
  onFileSelected(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        this.selectedFile = fileList[0];
    }
}
  //Delete Button
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Legal Document Details";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.legaldocumentsManager.legalDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.legalsettings.length; i++) {
            if (this.legalsettings[i].slNo == params.data.slNo) {
              this.legalsettings?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Legal Document Removed Successfully");
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

  onlegaldocumentclick(event: any, legalForm: any) {
  this.markFormGroupTouched(this.legalForm);
    this.submitted = true;
    if (this.legalForm.invalid) {
      return
    }
    let legal001wb = new Legal001wb();
    legal001wb.cslno = this.f.cslno.value ? this.f.cslno.value : "";
    legal001wb.fslno = this.f.fslno.value ? this.f.fslno.value : "";
    legal001wb.filename = this.f.filename.value ? this.f.filename.value : "";
    legal001wb.cno = this.f.cno.value ? this.f.cno.value : "";
    legal001wb.date = new Date(this.f.date.value);
    legal001wb.date1 = new Date(this.f.date1.value);
    if (this.slNo) {
      legal001wb.slNo = this.slNo;
      legal001wb.unitdepartslNo = this.unitdepartslNo;
      legal001wb.insertUser = this.insertUser;
      legal001wb.insertDatetime = this.insertDatetime;
      legal001wb.updatedUser = this.authManager.getcurrentUser.username;
      legal001wb.updatedDatetime = new Date();
      this.legalmanager.legUpdate(legal001wb, this.selectedFile).subscribe((response: any) => {
        this.calloutService.showSuccess("Legal Document Updated Successfully");
        this.legalForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      legal001wb.unitdepartslNo = this.user.unitdepartslNo;
      legal001wb.insertUser = this.authManager.getcurrentUser.username;
      legal001wb.insertDatetime = new Date();
      this.legalmanager.legSave(legal001wb, this.selectedFile).subscribe((response: any) => {
        this.calloutService.showSuccess("Legal Document Saved Successfully");
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
    this.legalmanager.legdetPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.legalmanager.legdetPdf().subscribe((response) => {
      if (this.legal001wb) {
        saveAs(response);
      } else {
        saveAs(response, "Legal Document Details-Details");
      }
    })
  }

  onGenerateExcelReport() {
    this.legalmanager.legdetExcel().subscribe((response) => {
      saveAs(response, "Legal Document Details-Details");
    });
  }





}
