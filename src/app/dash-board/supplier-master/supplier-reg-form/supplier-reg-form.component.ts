import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import * as saveAs from 'file-saver';
import { AddLeadsComponent } from 'src/app/shared/add-leads/add-leads.component';
import { SupplierContact001wb } from 'src/app/shared/services/restcontroller/entities/SupplierContact001wb';

@Component({
    selector: 'app-supplier-reg-form',
    templateUrl: './supplier-reg-form.component.html',
    styleUrls: ['./supplier-reg-form.component.css']
})

export class SupplierRegFormComponent implements OnInit {
    SupplierRegForm: FormGroup | any;
    frameworkComponents: any;
    submitted = false;
    public gridOptions: GridOptions | any;
    slNo: number | any;
    supplierName: string = "";
    supplierCode: string = "";
    website: string = "";
    address: string = "";
    contact: string = "";
    gstin: string = "";
    certification: string = "";
    nature: string = "";
    productDesc: string = "";
    reputedCust: string = "";
    concern?: string = "";
    otherInfo: string = "";
    insertUser: string = "";
    insertDatetime?: Date;
    updatedUser: string = "";
    updatedDatetime?: Date | null;
    isOpen: boolean = false;
    parentMenuString: string = '';
    childMenuString: string = '';
    isActive: boolean | undefined;
    themes: any;
    color: any;
    addPopup: string = "";
    supplierReg: Supplierregistration001mb[] = [];

    suppliercontacts: SupplierContact001wb[] = [];

    getCount: any;
    count: number = 0;
    user?: Login001mb | any;
    unitdepartslNo: number | any;

    constructor(
        private formBuilder: FormBuilder,
        private supplierRegManager: SupplierRegManager,
        private calloutService: CalloutService,
        private http: HttpClient,
        private authManger: AuthManager,
        private dataSharedService: DataSharedService,
        private authManager: AuthManager,
        private modalService: NgbModal,
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;
        this.createDataGrid001();
        this.SupplierRegForm = this.formBuilder.group({
            supplierName: ['', Validators.required],
            supplierCode: ['', Validators.required],
            address: ['', Validators.required],
            contact: ['', Validators.required],
            gstin: ['', Validators.required],
            certification: ['', Validators.required],
            nature: ['', Validators.required],
            supcategory: ['', Validators.required],
            productDesc: ['', Validators.required],
            reputedCust: ['', Validators.required],
            concern: ['', Validators.required],
            otherInfo: ['', Validators.required],
            website: ['', Validators.required],
        })

        this.loadData();
        this.user = this.authManger.getcurrentUser;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
    }

    loadData() {
        this.supplierRegManager.allSupplier().subscribe(response => {
            this.supplierReg = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
            if (this.supplierReg.length > 0) {
                this.gridOptions?.api?.setRowData(this.supplierReg);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });

        this.supplierRegManager.getCount().subscribe(response => {
            this.count = response[0].row;
            this.SupplierRegForm.patchValue({
                supplierCode: String("SE/SC") + String(this.count).padStart(4, '0')
            });
          });
    }

    get f() { return this.SupplierRegForm.controls; }

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
                headerName: 'Supplier Code',
                field: 'supplierCode',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                // valueGetter: this.setMachineCode.bind(this)
            },
            {
                headerName: 'Supplier Name',
                field: 'supplierName',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                // valueGetter: this.setMachineCode.bind(this)
            },
            {
                headerName: 'Address',
                field: 'address',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                // valueGetter: this.setMachineName.bind(this)
            },
            {
                headerName: 'Contact',
                field: 'contact',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'GSTIN',
                field: 'gstin',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Certifications',
                field: 'certification',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Supplier Category',
                field: 'supcategory',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Nature Of Supplier',
                field: 'nature',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Product Description',
                field: 'productDesc',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Reputed Customers',
                field: 'reputedCust',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Concerns',
                field: 'concern',
                // field: 'date',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Other Info',
                field: 'otherInfo',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Web Site',
                field: 'website',
                width: 200,
                // flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 100,
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
                width: 105,
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

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.unitdepartslNo = params.data.unitdepartslNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.SupplierRegForm.patchValue({
            'supplierName': params.data.supplierName,
            'supplierCode': params.data.supplierCode,
            'address': params.data.address,
            'contact': params.data.contact,
            'gstin': params.data.gstin,
            'certification': params.data.certification,
            'nature': params.data.nature,
            'supcategory': params.data.supcategory,
            'productDesc': params.data.productDesc,
            'reputedCust': params.data.reputedCust,
            'concern': params.data.concern,
            'otherInfo': params.data.otherInfo,
            'website': params.data.website,
        });
    }

    onAddbuttonClick(object: any) {
        const modalRef = this.modalService.open(AddLeadsComponent, { windowClass: 'my-class' });
        modalRef.componentInstance.suppliercontacts = this.suppliercontacts;

        modalRef.componentInstance.SupplierRegForm = this.SupplierRegForm;
        modalRef.result.then((data) => {
          if (data.status == 'Yes') {
            this.suppliercontacts = data.suppliercontacts;
    
    
          }
        })
      }
    
    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
        modalRef.componentInstance.details = "Supplier Registration Form";
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.supplierRegManager.supplierDelete(params.data.slNo).subscribe((response) => {
                    for (let i = 0; i < this.supplierReg.length; i++) {
                        if (this.supplierReg[i].slNo == params.data.slNo) {
                            this.supplierReg?.splice(i, 1);
                            break;
                        }
                    }
                    const selectedRows = params.api.getSelectedRows();
                    params.api.applyTransaction({ remove: selectedRows });
                    this.gridOptions.api.deselectAll();
                    this.calloutService.showSuccess("Supplier Registration Details Removed Successfully");
                });
            }
        })
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Supplier Registration Form";
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

    onSupplierRegClick(event: any, SupplierRegForm: any) {
        this.markFormGroupTouched(this.SupplierRegForm);
        this.submitted = true;
        if (this.SupplierRegForm.invalid) {
            return;
        }

        let supplierreg001mb = new Supplierregistration001mb();
        supplierreg001mb.supplierName = this.f.supplierName.value ? this.f.supplierName.value : "";
        supplierreg001mb.supplierCode = this.f.supplierCode.value ? this.f.supplierCode.value : "";
        supplierreg001mb.address = this.f.address.value ? this.f.address.value : "";
        supplierreg001mb.contact = this.f.contact.value ? this.f.contact.value : "";
        supplierreg001mb.gstin = this.f.gstin.value ? this.f.gstin.value : "";
        supplierreg001mb.certification = this.f.certification.value ? this.f.certification.value : "";
        supplierreg001mb.nature = this.f.nature.value ? this.f.nature.value : "";
        supplierreg001mb.supcategory = this.f.supcategory.value ? this.f.supcategory.value : "";
        supplierreg001mb.productDesc = this.f.productDesc.value ? this.f.productDesc.value : "";
        supplierreg001mb.reputedCust = this.f.reputedCust.value ? this.f.reputedCust.value : "";
        supplierreg001mb.concern = this.f.concern.value ? this.f.concern.value : "";
        supplierreg001mb.otherInfo = this.f.otherInfo.value ? this.f.otherInfo.value : "";
        supplierreg001mb.website = this.f.website.value ? this.f.website.value : "";
        supplierreg001mb.suppliercontacts2 = this.suppliercontacts;

        if (this.slNo) {
            supplierreg001mb.slNo = this.slNo;
            supplierreg001mb.unitdepartslNo = this.unitdepartslNo;
            supplierreg001mb.insertUser = this.insertUser;
            supplierreg001mb.insertDatetime = this.insertDatetime;
            supplierreg001mb.updatedUser = this.authManager.getcurrentUser.username;
            supplierreg001mb.updatedDatetime = new Date();
            this.supplierRegManager.supplierUpdate(supplierreg001mb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Registration Details Updated Successfully");
                this.loadData();
                this.SupplierRegForm.reset();
                this.slNo = null;
                this.submitted = false;
            });
        } else {
            supplierreg001mb.unitdepartslNo= this.user.unitdepartslNo;
            supplierreg001mb.insertUser = this.authManager.getcurrentUser.username;
            supplierreg001mb.insertDatetime = new Date();
            this.supplierRegManager.supplierSave(supplierreg001mb).subscribe((response) => {
                this.calloutService.showSuccess("Supplier Registration Details Approved Successfully");
                this.loadData();
                this.SupplierRegForm.reset();
                this.submitted = false;
            });
        }
    }


    onReset() {
        this.submitted = false;
        this.SupplierRegForm.reset();
    }


    onViewClick() {
        this.supplierRegManager.suplregPdf().subscribe((response) => {
          var blob = new Blob([response], { type: 'application/pdf' });
          var blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
        })
      }
    
      onGeneratePdfReport() {
        this.supplierRegManager.suplregPdf().subscribe((response) => {
           saveAs(response, "Supllier_Reg_Details");
        })
      }
    
      onGenerateExcelReport() {
        this.supplierRegManager.suplregExcel().subscribe((response) => {
         saveAs(response, "Supllier_Reg_Details");
          });
      }


}
