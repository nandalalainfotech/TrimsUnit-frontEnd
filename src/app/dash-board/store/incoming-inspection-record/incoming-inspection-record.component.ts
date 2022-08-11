import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import * as saveAs from 'file-saver';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { OrderAddItemComponent } from 'src/app/shared/order-add-item/order-add-item.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MaterialInspectionManager } from 'src/app/shared/services/restcontroller/bizservice/Materialinspection.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { Materialinspection001wb } from 'src/app/shared/services/restcontroller/entities/MaterialInspection001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { deserialize } from 'serializer.ts/Serializer';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-incoming-inspection-record',
  templateUrl: './incoming-inspection-record.component.html',
  styleUrls: ['./incoming-inspection-record.component.css']
})
export class IncomingInspectionRecordComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  materialInspectionForm: FormGroup | any;
  submitted = false;

  slNo: number | any;
  iirno: string = "";
  cdate: Date | any;
  scname: string = "";
  dcno: string = "";
  refno: string = "";
  pdate: Date | any;
  cponumber: string = "";
  sponumber: string = "";
  grnumber: string = "";
  remark: string = "";
  getCount: any;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  minDate = new Date();
  maxDate = new Date();
  count: number = 0;
  user?: Login001mb | any;
    unitdepartslNo: number | any;
 
  inspections: Materialinspection001wb[] = [];
  
  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private materialInspectionManager: MaterialInspectionManager,
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

    

    this.materialInspectionForm = this.formBuilder.group({
      iirno: ['', Validators.required],
      cdate: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      scname: ['', Validators.required],
      dcno: ['', Validators.required],
      refno: [''],
      pdate: ['', Validators.required],
      cponumber: ['', Validators.required],
      sponumber: ['', Validators.required],
      grnumber: ['', Validators.required],
      remark: ['']
    })

  

  }

  loadData() {
    this.materialInspectionManager.materialinspectionfindall().subscribe(response => {
      this.inspections = deserialize<Materialinspection001wb[]>(Materialinspection001wb, response);
      if (this.inspections.length > 0) {
        this.gridOptions?.api?.setRowData(this.inspections);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    this.materialInspectionManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.materialInspectionForm.patchValue({
        iirno: String("IIR/2207/") + String(this.count).padStart(4, '0')
      });
    });
   
  }


  get f() { return this.materialInspectionForm.controls }

 

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
        headerName: 'Incoming Inspection Report NO',
        field: 'iirno',
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
          return params.data.cdate ? this.datepipe.transform(params.data.cdate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Supplier/Customer Name',
        field: 'scname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'DC or Inv.No',
        field: 'dcno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Other Reference Number',
        field: 'refno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        field: 'pdate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Customer PO Number',
        field: 'cponumber',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Self PO Number',
        field: 'sponumber',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Goods Recieved No',
        field: 'grnumber',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Remark',
        field: 'remark',
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

  

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Material Inspection Record";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.materialInspectionForm.patchValue({
      'iirno': params.data.iirno,
      'cdate': new Date(params.data.date),
      'scname': params.data.scname,
      'dcno': params.data.dcno,
      'refno': params.data.refno,
      'pdate': new Date(params.data.pdate),
      'cponumber': params.data.cponumber,
      'sponumber': params.data.sponumber,
      'grnumber': params.data.grnumber,
      'remark': params.data.remark,
    }); 

  }
 

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Material Inspection Record";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.materialInspectionManager.materialinspectionDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.inspections.length; i++) {
            if (this.inspections[i].slNo == params.data.slNo) {
              this.inspections?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Material Inspection Record Removed Successfully");
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

  onMaterialInspectionClick(event: any, materialInspectionForm: any) {

    console.log("materialInspectionForm--->", materialInspectionForm);
    
    this.markFormGroupTouched(this.materialInspectionForm);
    this.submitted = true;
    if (this.materialInspectionForm.invalid) {
      return;
    }

    let materialinspection001wb = new Materialinspection001wb();
    materialinspection001wb.iirno = this.f.iirno.value ? this.f.iirno.value : "";
    materialinspection001wb.cdate = new Date(this.f.cdate.value);
    materialinspection001wb.scname = this.f.scname.value ? this.f.scname.value : "";
    materialinspection001wb.dcno = this.f.dcno.value ? this.f.dcno.value : "";
    materialinspection001wb.refno = this.f.refno.value ? this.f.refno.value : "";
    materialinspection001wb.pdate = new Date(this.f.pdate.value);
    materialinspection001wb.cponumber = this.f.cponumber.value ? this.f.cponumber.value : "";
    materialinspection001wb.sponumber = this.f.sponumber.value ? this.f.sponumber.value : "";
    materialinspection001wb.grnumber = this.f.grnumber.value ? this.f.grnumber.value : "";
    materialinspection001wb.remark = this.f.remark.value ? this.f.remark.value : "";
    if (this.slNo) {
      materialinspection001wb.slNo = this.slNo;
      materialinspection001wb.unitdepartslNo = this.unitdepartslNo;
      materialinspection001wb.insertUser = this.insertUser;
      materialinspection001wb.insertDatetime = this.insertDatetime;
      materialinspection001wb.updatedUser = this.authManager.getcurrentUser.username;
      materialinspection001wb.updatedDatetime = new Date();
      this.materialInspectionManager.materialinspectionUpdate(materialinspection001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Inspection Record Updated Successfully");
        this.materialInspectionForm.reset();
        this.materialInspectionForm.patchValue(
          { cdate: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      materialinspection001wb.unitdepartslNo= this.user.unitdepartslNo;
      materialinspection001wb.insertUser = this.authManager.getcurrentUser.username;
      materialinspection001wb.insertDatetime = new Date();
      
      this.materialInspectionManager.materialinspectionSave(materialinspection001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Inspection Record Saved Successfully");
        this.materialInspectionForm.patchValue(
          { cdate: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.materialInspectionForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }

   
  }

  onReset() {
    this.submitted = false;
    this.materialInspectionForm.reset();
  }

 

  onViewClick() {
    this.materialInspectionManager.materialinspectionPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.materialInspectionManager.materialinspectionPdf().subscribe((response) => {
      saveAs(response, "Material_Inward_Details");
    })
  }

  onGenerateExcelReport() {
    this.materialInspectionManager.materialinspectionExcel().subscribe((response) => {
      saveAs(response, "Material_Inward_Details");
    });
  }


}
