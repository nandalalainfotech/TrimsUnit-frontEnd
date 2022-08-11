import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BankNameManager } from 'src/app/shared/services/restcontroller/bizservice/bank.service';
import { Bank001mb } from 'src/app/shared/services/restcontroller/entities/bank001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
  selector: 'app-bank-master',
  templateUrl: './bank-master.component.html',
  styleUrls: ['./bank-master.component.css']
})
export class BankMasterComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  listOfBankForm: FormGroup | any;
  slNo: number | any;
  submitted = false;
  bankname: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  BankName: Bank001mb[] = [];
  bank001mb?: Bank001mb;
  user?: Login001mb | any;
    unitdepartslNo: number | any;
  


  constructor(
    private router: Router,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private bankNameManager: BankNameManager,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
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
    this.listOfBankForm = this.formBuilder.group({
      bankname: ['', Validators.required],
    })

    this.loadData();
  }

  loadData() {
    this.bankNameManager.allbank().subscribe(response => {
      this.BankName = deserialize<Bank001mb[]>(Bank001mb, response);
      if (this.BankName.length > 0) {
        this.gridOptions?.api?.setRowData(this.BankName);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }
  get f() { return this.listOfBankForm.controls; }

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
        headerName: 'FirstAid Box No',
        field: 'bankname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
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
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.listOfBankForm.patchValue({
      'bankname': params.data.bankname,
    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Bank Name";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.bankNameManager.bankdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.BankName.length; i++) {
            if (this.BankName[i].slNo == params.data.slNo) {
              this.BankName?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.calloutService.showSuccess("Bank Name Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Bank Name ";
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
  onBankClick(event: any, listOfBankForm: any) {
    this.markFormGroupTouched(this.listOfBankForm);
    this.submitted = true;
    if (this.listOfBankForm.invalid) {
      return;
    }
    let bank001mb = new Bank001mb();
    bank001mb.bankname = this.f.bankname.value ? this.f.bankname.value : "";
    if (this.slNo) {
      bank001mb.slNo = this.slNo;
      bank001mb.unitdepartslNo = this.unitdepartslNo;
      bank001mb.insertUser = this.insertUser;
      bank001mb.insertDatetime = this.insertDatetime;
      bank001mb.updatedUser = this.authManager.getcurrentUser.username;
      bank001mb.updatedDatetime = new Date();
      this.bankNameManager.bankupdate(bank001mb).subscribe((response) => {
        this.calloutService.showSuccess("Bank Name Updated Successfully");
        this.loadData();
        this.listOfBankForm.reset();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      bank001mb.unitdepartslNo = this.user.unitdepartslNo;
      bank001mb.insertUser = this.authManager.getcurrentUser.username;
      bank001mb.insertDatetime = new Date();
      this.bankNameManager.banksave(bank001mb).subscribe((response) => { 
        this.calloutService.showSuccess("Bank Name Saved Successfully");
        this.loadData();
        this.listOfBankForm.reset();
        this.submitted = false;
      });
    }

  }
  onReset() {
    this.submitted = false;
    this.listOfBankForm.reset();
  }

}
 