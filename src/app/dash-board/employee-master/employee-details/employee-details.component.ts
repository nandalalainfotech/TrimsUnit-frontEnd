import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GridOptions } from 'ag-grid-community';
import * as saveAs from 'file-saver';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/employeedetail.service';
import { Emp001mb } from 'src/app/shared/services/restcontroller/entities/employeedetails.mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  frameworkComponents: any;
  submitted = false;
  public gridOptions: GridOptions | any;

  employeedetailsForm:  FormGroup | any;
  slNo: number | any;
  empcode: string | any;
  empname: string = "";
  des: string = "";
  age: number | any;
  doj: Date | any;
  dob: Date | any;
  fname: string = "";
  bgroup: string = "";
  female: string = "";
  married: string = "";
  child: string = "";
  dep: string = "";
  add1: string = "";
  add2: string = "";
  edu: string = "";
  exp: number | any;
  det: string = "";
  filename: string = "";
  filepath: string = "";
  originalfilename: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  employeeSetting: Emp001mb[] = [];
  emp001mb?: Emp001mb;
  user?: Login001mb | any;
  unitdepartslNo: number | any;
 
  minDate = new Date();
  maxDate = new Date();
  companyManager: any;
  selectedFile: any;
 
 
  


  constructor(private datepipe: DatePipe,
    private formBuilder: FormBuilder, 
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private employeedetailsManager: EmployeeDetailsManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

 
    this.createDataGrid001();
    this.employeedetailsForm = this.formBuilder.group({
     
      empcode: ['', Validators.required],
      empname: ['', Validators.required],
      des: ['', Validators.required],
      age: ['', Validators.required],
      doj: ['', Validators.required],
      dob: ['', Validators.required],
      fname: ['', Validators.required],
      bgroup: ['', Validators.required],
      female: ['', Validators.required],
      married: ['', Validators.required],
      child: ['', Validators.required],
      dep: ['', Validators.required],
      add1: ['', Validators.required],
      add2: ['', Validators.required],
      edu: ['', Validators.required],
      exp: ['', Validators.required],
      det: ['', Validators.required],
      filename: ['']

    })
    this.loadData();
  }
  
  get f() { return this.employeedetailsForm.controls }


  loadData() {
    this.employeedetailsManager.allemployee().subscribe(response => {
        this.employeeSetting = deserialize<Emp001mb[]>(Emp001mb, response);
        if (this.employeeSetting.length > 0) {
            this.gridOptions?.api?.setRowData(this.employeeSetting);
        } else {
            this.gridOptions?.api?.setRowData([]);
        }
    });
}


  onEmployeedetails(employeedetailsForm: any) {

    this.markFormGroupTouched(this.employeedetailsForm);
    this.submitted = true;
    if (this.employeedetailsForm.invalid) {
      return;
    }


  }

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
        headerName: 'Sl_No',
        field: 'slNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'EmpCode',
        field: 'empcode',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'EmpName',
        field: 'empname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Designation',
        field: 'des',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'DateJoinig',
        field: 'doj',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.doj ? this.datepipe.transform(params.data.doj, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'DOB',
        field: 'dob',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.dob ? this.datepipe.transform(params.data.dob, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'Fname',
        field: 'fname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setSpares.bind(this)
      },
      {
        headerName: 'BGroup',
        field: 'bgroup',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Sex',
        field: 'female',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Marital',
        field: 'married',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'No of child',
        field: 'child',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onDeleteButtonClick.bind(this),
        //   label: 'Delete'
        // },
      },
      {
        headerName: 'Department',
        field: 'dep',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        sortable: true,
        filter: true,
        resizable: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: 'T-address',
        field: 'add1',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        sortable: true,
        filter: true,
        resizable: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: 'P-Address',
        field: 'add2',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        sortable: true,
        filter: true,
        resizable: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: 'Education',
        field: 'edu',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: 'Experience',
        field: 'exp',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: 'Details',
        field: 'det',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        sortable: true,
        filter: true,
        resizable: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: 'Filename',
        field: 'filename',
        // cellRenderer: 'iconRenderer',
        width: 200,
        // flex: 1,
        suppressSizeToFit: true,
        sortable: true,
        filter: true,
        resizable: true,
        // cellStyle: { textAlign: 'center' },
        // cellRendererParams: {
        //   // onClick: this.onAuditButtonClick.bind(this),
        //   label: 'Audit'
        // },
      },
      {
        headerName: "",
        headerComponentParams: { template: '<span><i class="fa fa-download"></i></span>' },
        cellRenderer: 'iconRenderer',
        // flex: 1,
        width: 200,
        suppressSizeToFit: true,
        cellRendererParams: {
            label: 'File2'

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
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Employee Details";
    modalRef.componentInstance.details = params.data
  }
  onFileSelected(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        this.selectedFile = fileList[0];
    }
}
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.employeedetailsForm.patchValue({
      'empcode': params.data.empcode,
      'empname': params.data.empname,
      'des': params.data.des,
      'age': params.data.age,
      'fname': params.data.fname,
     
      'doj': new Date(params.data.doj),
      'dob': new Date(params.data.dob),
      'bgroup': params.data.bgroup,
      'female': params.data.female,
      'married': params.data.married,
      'child': params.data.child,
      'dep': params.data.dep,
      'add1': params.data.add1,
      'add2': params.data.add2,
      'edu': params.data.edu,
      'exp': params.data.exp,
      'det': params.data.det,
      'filename': params.data.filename,

    });
    
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Employee Details";
    modalRef.result.then((data: string) => {
      if (data == "Yes") {
        this.employeedetailsManager.employeeDelete(params.data.slNo).subscribe((response: any) => {
          for (let i = 0; i < this.employeeSetting.length; i++) {
            if (this.employeeSetting[i].slNo == params.data.slNo) {
              this.employeeSetting?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          // this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Employee Details Removed Successfully");
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
  
  ondetailsClick(event: any, employeedetailsForm: any) {

    this.markFormGroupTouched(this.employeedetailsForm);
    this.submitted = true;
    if (this.employeedetailsForm.invalid) {
      return;
    }

    let emp001mb = new Emp001mb();
    emp001mb.empcode = this.f.empcode.value ? this.f.empcode.value : "";
    emp001mb.empname = this.f.empname.value ? this.f.empname.value : "";
    emp001mb.des = this.f.des.value ? this.f.des.value : "";
    emp001mb.age = this.f.age.value ? this.f.age.value : "";
    emp001mb.doj = this.f.doj.value ? this.f.doj.value : "";
    emp001mb.dob = this.f.dob.value ? this.f.dob.value : "";
    emp001mb.fname = this.f.fname.value ? this.f.fname.value : "";
    emp001mb.bgroup = this.f.bgroup.value ? this.f.bgroup.value : "";
    emp001mb.female = this.f.female.value ? this.f.female.value : "";
    emp001mb.married = this.f.married.value ? this.f.married.value : "";
    emp001mb.child = this.f.child.value ? this.f.child.value : "";
    emp001mb.dep = this.f.dep.value ? this.f.dep.value : "";
    emp001mb.add1 = this.f.add1.value ? this.f.add1.value : "";
    emp001mb.add2 = this.f.add2.value ? this.f.add2.value : "";
    emp001mb.edu = this.f.edu.value ? this.f.edu.value : "";
    emp001mb.exp = this.f.exp.value ? this.f.exp.value : "";
    emp001mb.det = this.f.det.value ? this.f.det.value : "";
    emp001mb.filename = this.f.filename.value ? this.f.filename.value : "";
    if (this.slNo) {
      emp001mb.slNo = this.slNo;
      emp001mb.unitdepartslNo = this.unitdepartslNo;
      emp001mb.insertUser = this.insertUser;
      emp001mb.insertDatetime = this.insertDatetime;
      emp001mb.updatedUser = this.authManager.getcurrentUser.username;
      emp001mb.updatedDatetime = new Date();
      this.employeedetailsManager.employeeUpdate(emp001mb, this.selectedFile).subscribe((response: any) => {
        this.calloutService.showSuccess("Employee Details Updated Successfully");
        this.employeedetailsForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      emp001mb.unitdepartslNo = this.user.unitdepartslNo;
      emp001mb.insertUser = this.authManager.getcurrentUser.username;
      emp001mb.insertDatetime = new Date();
      
      this.employeedetailsManager.employeeSave(emp001mb, this.selectedFile).subscribe((response: any) => {
     
        this.calloutService.showSuccess("Employee Details Saved Successfully");
        this.employeedetailsForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }
  onReset() {
    this.submitted = false;
    this.employeedetailsForm.reset();
  }

  onViewClick() {
    this.employeedetailsManager.empdetPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.employeedetailsManager.empdetPdf().subscribe((response) => {
      if (this.emp001mb) {
        saveAs(response);
      } else {
        saveAs(response, "Employee-Details");
      }
    })
  }

  onGenerateExcelReport() {
    this.employeedetailsManager.empdetExcel().subscribe((response) => {
     saveAs(response, "Employee-Details");
      });
  }
}