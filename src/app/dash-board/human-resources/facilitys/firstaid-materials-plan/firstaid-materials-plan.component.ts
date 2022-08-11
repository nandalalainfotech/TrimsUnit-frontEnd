
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeFecilityManager } from 'src/app/shared/services/restcontroller/bizservice/employef.service';
import { FirstaidMaterialsManager } from 'src/app/shared/services/restcontroller/bizservice/firstaid-materials.service';
import { Employef001mb } from 'src/app/shared/services/restcontroller/entities/employef001mb';
import { Firstaidwb001 } from 'src/app/shared/services/restcontroller/entities/firstaidmaterials.mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';


@Component({
  selector: 'app-firstaid-materials-plan',
  templateUrl: './firstaid-materials-plan.component.html',
  styleUrls: ['./firstaid-materials-plan.component.css']
})
export class FirstaidMaterialsPlanComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  firstaidForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  fabxno: number | any;
  mname: string = "";
  date: Date | any;
  app: string = "";
  loc: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  currentemployef001mb: Employef001mb[] = [];
  firstaiddetails: Firstaidwb001[] = [];
  minDate = new Date();
  maxDate = new Date();
  selectedFile: any;
  employef001mb?: Employef001mb;
  firstaidwb001?: Firstaidwb001;
  user?: Login001mb | any;
  unitdepartslNo: number | any;






  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private firstaidMaterialsManager: FirstaidMaterialsManager,
    private employeFecilityManager: EmployeFecilityManager,) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    
    this.employeFecilityManager.allemployef().subscribe(response => {
      this.currentemployef001mb = deserialize<Employef001mb[]>(Employef001mb, response);
      });

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.createDataGrid001();

    

    this.firstaidForm = this.formBuilder.group({
      fabxno: ['', Validators.required],
      mname: ['', Validators.required],
      date: ['', Validators.required],
      app: ['', Validators.required],
      loc: ['', Validators.required]

    })
    this.loadData();
    // this.route.queryParams.subscribe(params => {
      // this.eslno = params.eslno;
  }

  loadData() {
    this.firstaidMaterialsManager.allfirstaid().subscribe(response => {      
      this.firstaiddetails = deserialize<Firstaidwb001[]>(Firstaidwb001, response);
      if (this.firstaiddetails.length > 0) {
        this.gridOptions?.api?.setRowData(this.firstaiddetails);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.firstaidForm.controls }
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
        headerName: 'FirstAid Box No',
        field: 'fabxno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setEmployeCode.bind(this)
      },
      {
        headerName: 'Name of the Medicine',
        field: 'mname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        // field: 'date',
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
        headerName: 'Application',
        field: "app",
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Location',
        field: 'loc',
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
    modalRef.componentInstance.title = "Firstaid Materials";
    modalRef.componentInstance.details = params.data
  }
  //Edit Button
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitdepartslNo = params.data.unitdepartslNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.firstaidForm.patchValue({
      'fabxno': params.data.fabxno,
      'mname': params.data.mname,
      'date': new Date(params.data.date),
      'app': params.data.app,
      'loc': params.data.loc,

    });
  }
  // setEmployeCode(params: any): string {
  //   return params.data.eslno2 ? params.data.eslno2.faNo : null;
  // }
  //Delete Button
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Firstaid Materials";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.firstaidMaterialsManager.firstaidDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.firstaiddetails.length; i++) {
            if (this.firstaiddetails[i].slNo == params.data.slNo) {
              this.firstaiddetails?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Firstaid Materials Removed Successfully");
        });
      }
    })
  }

  //Validation
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onmaterialsClick(event: any, firstaidForm: any) {
    this.markFormGroupTouched(this.firstaidForm);
    this.submitted = true;
    if (this.firstaidForm.invalid) {
      return;
    }
    let firstaidwb001 = new Firstaidwb001();
    // firstaidwb001.eslno = this.f.eslno.value ? this.f.eslno.value : "";

    firstaidwb001.fabxno = this.f.fabxno.value ? this.f.fabxno.value : "";
    firstaidwb001.mname = this.f.mname.value ? this.f.mname.value : "";
    firstaidwb001.date = new Date(this.f.date.value);
    firstaidwb001.app = this.f.app.value ? this.f.app.value : "";
    firstaidwb001.loc = this.f.loc.value ? this.f.loc.value : "";
    if (this.slNo) {
      firstaidwb001.slNo = this.slNo;
      firstaidwb001.unitdepartslNo = this.unitdepartslNo;
      firstaidwb001.insertUser = this.insertUser;
      firstaidwb001.insertDatetime = this.insertDatetime;
      firstaidwb001.updatedUser = this.authManager.getcurrentUser.username;
      firstaidwb001.updatedDatetime = new Date();
      this.firstaidMaterialsManager.firstaidUpdate(firstaidwb001).subscribe((response: any) => {
        this.calloutService.showSuccess("Firstaid Materials Updated Successfully");
        this.firstaidForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      firstaidwb001.unitdepartslNo = this.user.unitdepartslNo;
      firstaidwb001.insertUser = this.authManager.getcurrentUser.username;
      firstaidwb001.insertDatetime = new Date();
      this.firstaidMaterialsManager.firstaidSave(firstaidwb001).subscribe((response: any) => {
        this.calloutService.showSuccess("Firstaid Materials Saved Successfully");
        this.firstaidForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.firstaidForm.reset();
  }

  onViewClick() {
    this.firstaidMaterialsManager.fstaidplanPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.firstaidMaterialsManager.fstaidplanPdf().subscribe((response) => {  
      if (this.employef001mb) {
        saveAs(response);
      } else {
        saveAs(response, "First_Aid_Plan-Details");
      }        
     
    })
  }

  onGenerateExcelReport() {
    this.firstaidMaterialsManager.fstaidplanExcel().subscribe((response) => {      
            saveAs(response, "First_Aid_Plan-Details");
    })
  }




  

}

