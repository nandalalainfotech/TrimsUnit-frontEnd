import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from 'src/app/shared/services/restcontroller/bizservice/ChildPart.service';
import { ChildPart001mb } from 'src/app/shared/services/restcontroller/entities/ChildPart001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-child-part',
  templateUrl: './child-part.component.html',
  styleUrls: ['./child-part.component.css']
})
export class ChildPartComponent implements OnInit {


  childPartForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;

  slNo: number | any;
  cpartno: string = "";
  cpartname: string = "";
  splan: string = "";
  descrip: string = "";
  qunty: string = "";
  hsn: string = "";
  unitamount: number | any;
  uom: string = "";
  gst: number | any;
  insertUser: string = "";;
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  count: number = 0;
  getCount: any;
  user?: Login001mb | any;
    unitdepartslNo: number | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private authManager: AuthManager,
    private childPartManager: ChildPartManager,
    private modalService: NgbModal,
    private httpClient: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    
    this.createDataGrid001();

    this.loadData()

    this.childPartForm = this.formBuilder.group({
      cpartno: ['', Validators.required],
      cpartname: ['', Validators.required],
      splan: ['', Validators.required],
      descrip: ['', Validators.required],
      unitamount: ['', Validators.required],
      uom: ['', Validators.required],
      gst: ['', Validators.required],
      qunty: ['', Validators.required],
      hsn: ['', Validators.required],
    })

  }

  loadData() {
    this.childPartManager.allChildpart().subscribe(response => {
       this.childPart001mbs = deserialize<ChildPart001mb[]>(ChildPart001mb, response);
    
      if (this.childPart001mbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.childPart001mbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
     
    });
    this.childPartManager.getCount().subscribe(response => {
      this.count = response[0].row;
      this.childPartForm.patchValue({
        cpartno: String("CPT") + String(this.count).padStart(4, '0')
      });
    });
  }

  get f() { return this.childPartForm.controls; }

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
        headerName: 'C Part Number',
        field: 'cpartno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Child Part Name',
        field: 'cpartname',
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
        headerName: 'Item Description',
        field: 'descrip',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'UOM',
        field: 'uom',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quantity',
        field: 'qunty',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'GST',
        field: 'gst',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Unit Rate',
        field: 'unitamount',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'HSN/SAC',
        field: 'hsn',
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
    this.childPartForm.patchValue({
      'cpartno': params.data.cpartno,
      'cpartname': params.data.cpartname,
      'splan': params.data.splan,
      'qunty': params.data.qunty,
      'descrip': params.data.descrip,
      'uom': params.data.uom,
      'unitamount': params.data.unitamount,
      'gst': params.data.gst,
      'hsn': params.data.hsn,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Audit Report";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.childPartManager.ChildpartUpdate(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.childPart001mbs.length; i++) {
            if (this.childPart001mbs[i].slNo == params.data.slNo) {
              this.childPart001mbs?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Child Part Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Child Part Details Report";
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

  onchildPartClick(event: any, childPartForm: any) {
    this.markFormGroupTouched(this.childPartForm);
    this.submitted = true;
    if (this.childPartForm.invalid) {
      return;
    }

    let childPart001mb = new ChildPart001mb();

    childPart001mb.cpartno = this.f.cpartno.value ? this.f.cpartno.value : "";
    childPart001mb.cpartname = this.f.cpartname.value ? this.f.cpartname.value : "";
    childPart001mb.splan = this.f.splan.value ? this.f.splan.value : "";
    childPart001mb.descrip = this.f.descrip.value ? this.f.descrip.value : "";
    childPart001mb.unitamount = this.f.unitamount.value ? this.f.unitamount.value : "";
    childPart001mb.qunty = this.f.qunty.value ? this.f.qunty.value : "";
    childPart001mb.gst = this.f.gst.value ? this.f.gst.value : "";
    childPart001mb.uom = this.f.uom.value ? this.f.uom.value : "";
    childPart001mb.hsn = this.f.hsn.value ? this.f.hsn.value : "";


    if (this.slNo) {
      childPart001mb.slNo = this.slNo;
      childPart001mb.unitdepartslNo = this.unitdepartslNo;
      childPart001mb.insertUser = this.insertUser;
      childPart001mb.insertDatetime = this.insertDatetime;
      childPart001mb.updatedUser = this.authManager.getcurrentUser.username;
      childPart001mb.updatedDatetime = new Date();
      this.childPartManager.ChildpartUpdate(childPart001mb).subscribe((response) => {
        this.calloutService.showSuccess("Production Details Updated Successfully");
        this.loadData();
        this.childPartForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      childPart001mb.unitdepartslNo= this.user.unitdepartslNo;
      childPart001mb.insertUser = this.authManager.getcurrentUser.username;
      childPart001mb.insertDatetime = new Date();
      this.childPartManager.ChildpartSave(childPart001mb).subscribe((response) => {
        this.calloutService.showSuccess("Production Details Saved Successfully");
        this.loadData();
        this.childPartForm.reset();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.childPartForm.reset();
  }

  onViewClick() {
    this.childPartManager.ChildpartPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.childPartManager.ChildpartPdf().subscribe((response) => {
      saveAs(response, "Prod-Details");
    })
  }

  onGenerateExcelReport() {
    this.childPartManager.ChildpartExcel().subscribe((response) => {
      saveAs(response, "Prod-Details");
    });
  }

}
