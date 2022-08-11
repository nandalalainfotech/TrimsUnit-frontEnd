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
import { FileDocumetManager } from 'src/app/shared/services/restcontroller/bizservice/file.service';
import { File001mb } from 'src/app/shared/services/restcontroller/entities/file001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
  selector: 'app-file-document',
  templateUrl: './file-document.component.html',
  styleUrls: ['./file-document.component.css']
})
export class FileDocumentComponent implements OnInit {

  FilemasterForm: FormGroup | any;
  frameworkComponents: any;

  public gridOptions: GridOptions | any;

  slNo: number | any;
  submitted = false;
  ftype: string = "";
  status: string = "";;
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  fileSetting: File001mb[] = [];
  file001mb: File001mb[] = [];
  user?: Login001mb | any;
  unitdepartslNo: number | any;




  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private fileDocumetManager: FileDocumetManager,
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
    this.FilemasterForm = this.formBuilder.group({
      ftype: ['', Validators.required],
      status: ['', Validators.required],
    })

    this.loadData();
  }

  loadData() {
    this.fileDocumetManager.allfile().subscribe(response => {
      this.file001mb = deserialize<File001mb[]>(File001mb, response);
      if (this.file001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.file001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.FilemasterForm.controls; }

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
        headerName: 'File Type',
        field: 'ftype',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'File Status',
        field: 'status',
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
    this.FilemasterForm.patchValue({
      'ftype': params.data.ftype,
      'status': params.data.status,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.fileDocumetManager.fileDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.file001mb.length; i++) {
            if (this.file001mb[i].slNo == params.data.slNo) {
              this.file001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("File Document Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "File Document Audit Report";
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

  onFileClick(event: any, FilemasterForm: any) {
    this.markFormGroupTouched(this.FilemasterForm);
    this.submitted = true;
    if (this.FilemasterForm.invalid) {
      return;
    }

    let file001mb = new File001mb();
    file001mb.ftype = this.f.ftype.value ? this.f.ftype.value : "";
    file001mb.status = this.f.status.value ? this.f.status.value : "";


    if (this.slNo) {
      file001mb.slNo = this.slNo;
      file001mb.unitdepartslNo=this.unitdepartslNo;
      file001mb.insertUser = this.insertUser;
      file001mb.insertDatetime = this.insertDatetime;
      file001mb.updatedUser = this.authManager.getcurrentUser.username;
      file001mb.updatedDatetime = new Date();
      this.fileDocumetManager.fileUpdate(file001mb).subscribe((response) => {
        this.calloutService.showSuccess("File document Updated Successfully");
        this.loadData();
        this.FilemasterForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      file001mb.unitdepartslNo=this.user.unitdepartslNo;
      file001mb.insertUser = this.authManager.getcurrentUser.username;
      file001mb.insertDatetime = new Date();
      this.fileDocumetManager.fileSave(file001mb).subscribe((response) => {
        this.calloutService.showSuccess("File document Saved Successfully");
        this.loadData();
        this.FilemasterForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.FilemasterForm.reset();
  }



  // onViewClick() {
  //   this.prodManager.prodPdf().subscribe((response) => {
  //     var blob = new Blob([response], { type: 'application/pdf' });
  //     var blobURL = URL.createObjectURL(blob);
  //     window.open(blobURL);
  //   })
  // }

  // onGeneratePdfReport() {
  //   this.prodManager.prodPdf().subscribe((response) => {
  //     saveAs(response, "Prod-Details");
  //   })
  // }

  // onGenerateExcelReport() {
  //   this.prodManager.prodExcel().subscribe((response) => {
  //    saveAs(response, "Prod-Details");
  //     });
  // }

}
