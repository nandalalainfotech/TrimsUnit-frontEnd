import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { SupplierContactManager } from '../services/restcontroller/bizservice/supplierContact.service';
import { SupplierContact001wb } from '../services/restcontroller/entities/SupplierContact001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { deserialize } from 'serializer.ts/Serializer';

@Component({
    selector: 'app-add-leads',
    templateUrl: './add-leads.component.html',
    styleUrls: ['./add-leads.component.css'],
})
export class AddLeadsComponent implements OnInit {
    @Input() suppliercontacts: any;
    @Input() SupplierRegForm: any;
    contactForm: FormGroup | any;
    contactFormArray: FormArray | any;
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    submitted = false;
    slNo: number | any;
    supplierslNo: number | any;
    pname: string = '';
    designation: string = '';
    department?: string = '';
    level?: string = '';
    mnumber:number | any;
    altmnumber: number | any;
    mailid: string = '';
    insertUser: string = '';
    insertDatetime: Date | any;
    updatedUser: string | null = '';
    updatedDatetime: Date | any;

    supplierContact001wbs: SupplierContact001wb[] = [];
    supplierContact001wb?: SupplierContact001wb;

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private supplierContactManager: SupplierContactManager,
        private dataSharedService: DataSharedService,
        private modalService: NgbModal,
        private httpClient: HttpClient,
        private http: HttpClient
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        };
    }

    ngOnInit() {  
        
        this.contactForm = this.formBuilder.group({
            contactFormArray: this.formBuilder.array([this.createItem()]),
        });

        this.supplierContactManager
            .suppliercontactall()
            .subscribe((response) => {
                this.supplierContact001wbs = deserialize<
                    SupplierContact001wb[]
                >(SupplierContact001wb, response);
            });
    }

    get f() {
        return this.contactForm.controls;
    }
    get o() {
        return this.f.contactFormArray as FormArray;
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    createItem() {
        return this.formBuilder.group({
            supplierslNo: [this.SupplierRegForm.value.supplierCode],
            pname: ['', Validators.required],
            designation: ['', Validators.required],
            department: ['', Validators.required],
            level: ['', Validators.required],

            mnumber: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^[0-9]*$'),
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            altmnumber: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^[0-9]*$'),
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            mailid: ['', Validators.required],
        });
    }

    addItem() {
        this.contactFormArray = this.f['contactFormArray'] as FormArray;
        let status: boolean = false;
        for(let control of this.contactFormArray.controls) {
          if(control.status == 'INVALID'){
            this.calloutService.showError("An input field is missing!");
            status = true;
            break;
          }
        }
        if(status) {
          return;
        }
        this.contactFormArray.push(this.createItem());
    }

    removeItem(idx: number): void {
        (this.f['contactFormArray'] as FormArray).removeAt(idx);
    }

    onSubmit() {
        this.contactForm.markAllAsTouched();
        console.log(this.contactForm.value);
    }
    onOkClick(event: any, contactForm: any) {
        console.log('contactForm-->', contactForm);

        let supplierContact001wbs: SupplierContact001wb[] = [];
        for (
            let i = 0;
            i < this.contactForm.controls.contactFormArray.controls.length;
            i++
        ) {
            let supplierContact001wb = new SupplierContact001wb();
            supplierContact001wb.supplierslNo = this.f.contactFormArray.value[i]
                .supplierslNo
                ? this.f.contactFormArray.value[i].supplierslNo
                : '';
            supplierContact001wb.pname = this.f.contactFormArray.value[i].pname
                ? this.f.contactFormArray.value[i].pname
                : '';
            supplierContact001wb.designation = this.f.contactFormArray.value[i]
                .designation
                ? this.f.contactFormArray.value[i].designation
                : '';
            supplierContact001wb.department = this.f.contactFormArray.value[i]
                .department
                ? this.f.contactFormArray.value[i].department
                : '';
            supplierContact001wb.level = this.f.contactFormArray.value[i].level
                ? this.f.contactFormArray.value[i].level
                : '';
            supplierContact001wb.mnumber = this.f.contactFormArray.value[i]
                .mnumber
                ? this.f.contactFormArray.value[i].mnumber
                : '';
            supplierContact001wb.altmnumber = this.f.contactFormArray.value[i]
                .altmnumber
                ? this.f.contactFormArray.value[i].altmnumber
                : '';
            supplierContact001wb.mailid = this.f.contactFormArray.value[i]
                .mailid
                ? this.f.contactFormArray.value[i].mailid
                : '';
            supplierContact001wbs.push(supplierContact001wb);

            this.activeModal.close({
                status: 'Yes',
                suppliercontacts: supplierContact001wbs,
            });
        }
    }

    onCancelClick() {
        this.activeModal.close('No');
    }
}
