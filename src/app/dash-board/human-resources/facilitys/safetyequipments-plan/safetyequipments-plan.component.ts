import { Component, OnInit } from '@angular/core';
// import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SafetyEquipmentsManager } from 'src/app/shared/services/restcontroller/bizservice/safetyequipments.service';
import { Safetyequwb001 } from 'src/app/shared/services/restcontroller/entities/safetyequipments.mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import * as saveAs from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
@Component({
  selector: 'app-safetyequipments-plan',
  templateUrl: './safetyequipments-plan.component.html',
  styleUrls: ['./safetyequipments-plan.component.css']
})
export class SafetyequipmentsPlanComponent implements OnInit {
  public gridOptions: GridOptions | any;
  frameworkComponents: any;
  safetyForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  seNo: string = "";
  pur: string = "";
  stock: string = "";
  remark: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  safety: Safetyequwb001[] = [];
  safetyequwb001?: Safetyequwb001;
  selectedFile: any;
  user?: Login001mb | any;
  unitdepartslNo: number | any;

 
  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private safetyequipmentsManager: SafetyEquipmentsManager
    ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.createDataGrid001();

    this.loadData();

    this.safetyForm = this.formBuilder.group({
      seNo: ['', Validators.required],
      pur: ['', Validators.required],
      stock: ['', Validators.required],
     remark: ['', Validators.required],
     
      
    })
  }
  loadData() {
    this.safetyequipmentsManager.allsafety().subscribe((response: any) => {
      this.safety = deserialize<Safetyequwb001[]>(Safetyequwb001, response);
      if (this.safety.length > 0) {
        this.gridOptions?.api?.setRowData(this.safety);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }



  get f() { return this.safetyForm.controls }
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
        headerName: 'Safety  Equip Name',
        field: 'seNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Purpose',
        field: 'pur',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Stock',
        field: "stock",
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

   // Audit Button
   onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Safety Equipments";
    modalRef.componentInstance.details = params.data
  }
  //Edit Button
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.safetyForm.patchValue({
      'seNo': params.data.seNo,
      'pur': params.data.pur,
      'stock': params.data.stock,
      'remark': params.data.remark,
     
    });
  }
  //Delete Button
onDeleteButtonClick(params: any) {
  const modalRef = this.modalService.open(ConformationComponent);
  modalRef.componentInstance.details = "SafetyEquipments";
  modalRef.result.then((data) => {
    if (data == "Yes") {
      this.safetyequipmentsManager.safetyDelete(params.data.slNo).subscribe((response) => {
        for (let i = 0; i < this.safety.length; i++) {
          if (this.safety[i].slNo == params.data.slNo) {
            this.safety?.splice(i, 1);
            break;
          }
        }
        const selectedRows = params.api.getSelectedRows();
        params.api.applyTransaction({ remove: selectedRows });
        this.gridOptions.api.deselectAll();
        this.calloutService.showSuccess("Safety Equipments Removed Successfully");
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

  onsafetyClick(event: any, safetyForm: any) {
    this.markFormGroupTouched(this.safetyForm);
    this.submitted = true;
    if (this.safetyForm.invalid) {
      return;
    }

    let safetyequwb001 = new Safetyequwb001();
    safetyequwb001.seNo = this.f.seNo.value ? this.f.seNo.value : "";
    safetyequwb001.pur = this.f.pur.value ? this.f.pur.value : "";
    safetyequwb001.stock = this.f.stock.value ? this.f.stock.value : "";
    safetyequwb001.remark = this.f.remark.value ? this.f.remark.value : "";
    if (this.slNo) {
      safetyequwb001.slNo = this.slNo;
      safetyequwb001.unitdepartslNo = this.unitdepartslNo;
      safetyequwb001.insertUser = this.insertUser;
      safetyequwb001.insertDatetime = this.insertDatetime;
      safetyequwb001.updatedUser = this.authManager.getcurrentUser.username;
      safetyequwb001.updatedDatetime = new Date();
      this.safetyequipmentsManager.safetyUpdate(safetyequwb001).subscribe((response) => {
        this.calloutService.showSuccess("Safety Equipments  Updated Successfully");
        this.safetyForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      safetyequwb001.unitdepartslNo = this.user.unitdepartslNo;
      safetyequwb001.insertUser = this.authManager.getcurrentUser.username;
      safetyequwb001.insertDatetime = new Date();
      this.safetyequipmentsManager.safetySave(safetyequwb001).subscribe((response) => {
        this.calloutService.showSuccess("Safety Equipments Saved Successfully");
        this.safetyForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
}
onReset() {
  this.submitted = false;
  this.safetyForm.reset();
}

onViewClick() {
  this.safetyequipmentsManager.saftyeqPdf().subscribe((response) => {
    var blob = new Blob([response], { type: 'application/pdf' });
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  })
}

onGeneratePdfReport() {
  this.safetyequipmentsManager.saftyeqPdf().subscribe((response) => {
    if (this.safetyequwb001) {
      saveAs(response);
    } else {
      saveAs(response, "Safety-Equipment Details");
    }
  })
}

onGenerateExcelReport() {
  this.safetyequipmentsManager.saftyeqExcel().subscribe((response) => {
   saveAs(response, "Safety-Equipment Details");
    });
}

}

