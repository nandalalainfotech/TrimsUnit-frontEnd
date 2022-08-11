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
import { MaterialRequisitionManager } from 'src/app/shared/services/restcontroller/bizservice/material-req-slip.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';
import { Materialreqslip001wb } from 'src/app/shared/services/restcontroller/entities/material-req-slip001wb';
import { Spares001mb } from 'src/app/shared/services/restcontroller/entities/spares001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-material-req-slip',
  templateUrl: './material-req-slip.component.html',
  styleUrls: ['./material-req-slip.component.css']
})
export class MaterialReqSlipComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  MaterialReqForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  spareSlno: number | any;
  mrsNo: string = "";
  date: Date | any;
  requestorName?: string;
  department: string = "";
  description: string = "";
  qty: number | any;
  remarks: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  sparesSettings: Spares001mb[] = [];
  spares001mb?: Spares001mb;
  materialrequisitions: Materialreqslip001wb[] = [];
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private formBuilder: FormBuilder,
    private sparesettingManager: SparesettingManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private materialReqManager: MaterialRequisitionManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.createDataGrid001();

    this.loadData();

    this.MaterialReqForm = this.formBuilder.group({
      date: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      mrsNo: ['', Validators.required],
      requestorName: ['', Validators.required],
      department: ['', Validators.required],
      description: ['', Validators.required],
      qty: ['', Validators.required],
      remarks: ['', Validators.required],
      spareSlno: ['', Validators.required],
    })

    this.sparesettingManager.allsparesetting().subscribe(response => {
      this.sparesSettings = deserialize<Spares001mb[]>(Spares001mb, response);
    });
  }


  loadData() {
    this.materialReqManager.allmaterialreq().subscribe(response => {
      this.materialrequisitions = deserialize<Materialreqslip001wb[]>(Materialreqslip001wb, response);
      if (this.materialrequisitions.length > 0) {
        this.gridOptions?.api?.setRowData(this.materialrequisitions);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.MaterialReqForm.controls }

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
        headerName: 'MRS No',
        field: 'mrsNo',
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
        headerName: 'Requestor Name',
        field: 'requestorName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Department',
        field: 'department',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Item Code',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSpares.bind(this)
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quantity/Wt',
        field: 'qty',
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

  setSpares(params: any): string {
    return params.data.spareSlno2 ? params.data.spareSlno2.spares : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Material Requisition Slip";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.MaterialReqForm.patchValue({
      'spareSlno': params.data.spareSlno,
      'mrsNo': params.data.mrsNo,
      'date': params.data.date,
      'requestorName': params.data.requestorName,
      'department': params.data.department,
      'description': params.data.description,
      'qty': params.data.qty,
      'remarks': params.data.remarks,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Material Requisition Slip";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.materialReqManager.materialreqDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.materialrequisitions.length; i++) {
            if (this.materialrequisitions[i].slNo == params.data.slNo) {
              this.materialrequisitions?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Material Request Removed Successfully");
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

  onMaterialReqClick(event: any, MaterialReqForm: any) {
    this.markFormGroupTouched(this.MaterialReqForm);
    this.submitted = true;
    if (this.MaterialReqForm.invalid) {
      return;
    }

    let materialreqslip001wb = new Materialreqslip001wb();
    materialreqslip001wb.spareSlno = this.f.spareSlno.value ? this.f.spareSlno.value : "";
    materialreqslip001wb.mrsNo = this.f.mrsNo.value ? this.f.mrsNo.value : "";
    materialreqslip001wb.date = new Date(this.f.date.value);
    materialreqslip001wb.requestorName = this.f.requestorName.value ? this.f.requestorName.value : "";
    materialreqslip001wb.department = this.f.department.value ? this.f.department.value : "";
    materialreqslip001wb.description = this.f.description.value ? this.f.description.value : "";
    materialreqslip001wb.qty = this.f.qty.value ? this.f.qty.value : "";
    materialreqslip001wb.remarks = this.f.remarks.value ? this.f.remarks.value : "";

    if (this.slNo) {
      materialreqslip001wb.slNo = this.slNo;
      materialreqslip001wb.unitdepartslNo = this.unitdepartslNo;
      materialreqslip001wb.insertUser = this.insertUser;
      materialreqslip001wb.insertDatetime = this.insertDatetime;
      materialreqslip001wb.updatedUser = this.authManager.getcurrentUser.username;
      materialreqslip001wb.updatedDatetime = new Date();
      this.materialReqManager.materialreqUpdate(materialreqslip001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Request Updated Successfully");
        this.MaterialReqForm.reset();
        this.MaterialReqForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      materialreqslip001wb.date = new Date();
      materialreqslip001wb.unitdepartslNo= this.user.unitdepartslNo;
      materialreqslip001wb.insertUser = this.authManager.getcurrentUser.username;
      materialreqslip001wb.insertDatetime = new Date();
      this.materialReqManager.materialreqSave(materialreqslip001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Request Saved Successfully");
        this.MaterialReqForm.reset();
        this.MaterialReqForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.MaterialReqForm.controls.spareSlno.reset();
    this.MaterialReqForm.controls.mrsNo.reset();
    this.MaterialReqForm.controls.requestorName.reset();
    this.MaterialReqForm.controls.department.reset();
    this.MaterialReqForm.controls.description.reset();
    this.MaterialReqForm.controls.qty.reset();
    this.MaterialReqForm.controls.description.reset();
    this.MaterialReqForm.controls.remarks.reset();
  }


  onViewClick() {
    this.materialReqManager.materialreqslipPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.materialReqManager.materialreqslipPdf().subscribe((response) => {
      saveAs(response, "Material_Req_Details");
    })
  }

  onGenerateExcelReport() {
    this.materialReqManager.materialreqslipExcel().subscribe((response) => {
     saveAs(response, "Material_Req_Details");
      });
  }


}