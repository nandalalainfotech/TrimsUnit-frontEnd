import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { FirePlanManager } from 'src/app/shared/services/restcontroller/bizservice/fireplan.service';
import { Fireplan001wb } from 'src/app/shared/services/restcontroller/entities/fireplan.mb';
import { Firstaidwb001 } from 'src/app/shared/services/restcontroller/entities/firstaidmaterials.mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-fire-plan',
  templateUrl: './fire-plan.component.html',
  styleUrls: ['./fire-plan.component.css']
})
export class FirePlanComponent implements OnInit {
  public gridOptions: GridOptions | any;
  frameworkComponents: any;
  fireplanForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  fire: string = "";
  app: string = "";
  loc: string = "";
  date: Date | any;
  date1: Date | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  fireplan: Fireplan001wb[] = [];
  fireplan001wb?: Fireplan001wb;
  selectedFile: any;
  user?: Login001mb | any;
  unitdepartslNo: number | any;

  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private fireplanManager: FirePlanManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    this.createDataGrid001();
    this.loadData();
    this.fireplanForm = this.formBuilder.group({
      fire: ['', Validators.required],
      app: ['', Validators.required],
      loc: ['', Validators.required],
      date: ['', Validators.required],
      date1: ['', Validators.required],



    })
  }
  loadData() {
    this.fireplanManager.allfireplan().subscribe((response: any) => {
      this.fireplan = deserialize<Fireplan001wb[]>(Fireplan001wb, response);
      if (this.fireplan.length > 0) {
        this.gridOptions?.api?.setRowData(this.fireplan);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.fireplanForm.controls }
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
        headerName: 'Fire Extinguisters',
        field: 'fire',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Application',
        field: 'app',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Location',
        field: "loc",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Filling Date',
        field: 'date1',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date1 ? this.datepipe.transform(params.data.date1, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Closing Date',
        field: 'date',
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
  // Audit Button
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Fire Plan";
    modalRef.componentInstance.details = params.data
  }
  //Edit Button
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.fireplanForm.patchValue({
      'fire': params.data.fire,
      'app': params.data.app,
      'loc': params.data.loc,
      'date': new Date(params.data.date),
      'date1': new Date(params.data.date1),

    });
  }
  //Delete Button
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Fire Plan";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.fireplanManager.fireplanDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.fireplan.length; i++) {
            if (this.fireplan[i].slNo == params.data.slNo) {
              this.fireplan?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Fire Plan Removed Successfully");
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

  onfireplanClick(event: any, fireplanForm: any) {
    this.markFormGroupTouched(this.fireplanForm);
    this.submitted = true;
    if (this.fireplanForm.invalid) {
      return;
    }
    let fireplan001wb = new Fireplan001wb();
    fireplan001wb.fire = this.f.fire.value ? this.f.fire.value : "";
    fireplan001wb.app = this.f.app.value ? this.f.app.value : "";
    fireplan001wb.loc = this.f.loc.value ? this.f.loc.value : "";
    fireplan001wb.date = new Date(this.f.date.value);
    fireplan001wb.date1 = new Date(this.f.date1.value);
    if (this.slNo) {
      fireplan001wb.slNo = this.slNo;
      fireplan001wb.unitdepartslNo = this.unitdepartslNo;
      fireplan001wb.insertUser = this.insertUser;
      fireplan001wb.insertDatetime = this.insertDatetime;
      fireplan001wb.updatedUser = this.authManager.getcurrentUser.username;
      fireplan001wb.updatedDatetime = new Date();
      this.fireplanManager.fireplanUpdate(fireplan001wb).subscribe((response) => {
        this.calloutService.showSuccess("Fire Plan Updated Successfully");
        this.fireplanForm.reset();
        this.loadData();
        this.submitted = false;
      });
    } else {
      fireplan001wb.unitdepartslNo = this.user.unitdepartslNo;
      fireplan001wb.insertUser = this.authManager.getcurrentUser.username;
      fireplan001wb.insertDatetime = new Date();
      this.fireplanManager.fireplanSave(fireplan001wb).subscribe((response) => {
        this.calloutService.showSuccess("Fire Plan Saved Successfully");
        this.fireplanForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.fireplanForm.reset();
  }

  onViewClick() {
    this.fireplanManager.fireplPdf().subscribe((response) => {
      
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
        this.fireplanManager.fireplPdf().subscribe((response) => {          
      if (this.fireplan001wb) {
        saveAs(response);
      } else {
        saveAs(response, "Fire Plan Details");
      }
    })
  }

  onGenerateExcelReport() {
    this.fireplanManager.fireplExcel().subscribe((response) => {      
     saveAs(response, "Fire Plan Details");
      });
  }


}