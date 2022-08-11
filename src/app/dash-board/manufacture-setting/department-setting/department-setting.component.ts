import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Departments001mb } from 'src/app/shared/services/restcontroller/entities/Departments001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';



@Component({
	selector: 'app-department-setting',
	templateUrl: './department-setting.component.html',
	styleUrls: ['./department-setting.component.css']
})
export class DepartmentSettingComponent implements OnInit {

	frameworkComponents: any;
	public gridOptions: GridOptions | any;
	departmentForm: FormGroup | any;
	submitted = false;
	slNo: number | any;
	sslno: number | any;
	department: string = "";
	insertUser: string = "";
	insertDatetime: Date | any;
	updateUser: string = "";
	updateDatetime: Date | any;
	departmentSettings: Departments001mb[] = [];
	statussets: Status001mb[] = [];
	department001mb?: Departments001mb;

	constructor(private router: Router,
		private departmentsManager: DepartmentsManager,
		private calloutService: CalloutService,
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private statusSettingManager: StatusSettingManager,
		private authManager: AuthManager,
		private httpClient: HttpClient, private http: HttpClient,
	) {
		this.frameworkComponents = {
			//  linkRenderer: LinkRendererComponent,
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit(): void {
		this.createDataGrid001();

		this.departmentForm = this.formBuilder.group({
			department: ['', Validators.required],
			sslno: ['', Validators.required],
		})

		this.statusSettingManager.allstatus().subscribe(response => {
			this.statussets = deserialize<Status001mb[]>(Status001mb, response);

		});

		this.loadData();
	}

	loadData() {
		this.departmentsManager.alldepartment().subscribe(response => {
			this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
			if (this.departmentSettings.length > 0) {
				this.gridOptions?.api?.setRowData(this.departmentSettings);
			} else {
				this.gridOptions?.api?.setRowData([]);
			}
		});
	}

	get f() { return this.departmentForm.controls; }

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
				headerName: 'Department Name',
				field: 'department',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true
			},
			{
				headerName: 'Status',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				suppressSizeToFit: true,
				valueGetter: this.setStatus.bind(this)
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

	setStatus(params: any): string {
		return params.data.sslno2 ? params.data.sslno2.name : null;
	}

	onEditButtonClick(params: any) {
		this.slNo = params.data.slNo;
		this.insertUser = params.data.insertUser;
		this.insertDatetime = params.data.insertDatetime;
		this.departmentForm.patchValue({
			'sslno': params.data.sslno,
			'department': params.data.department,
		});
	}

	onDeleteButtonClick(params: any) {
		const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Department Setting";
		modalRef.result.then((data) => {
			if (data == "Yes") {
				this.departmentsManager.departmentdelete(params.data.slNo).subscribe((response) => {
					for (let i = 0; i < this.departmentSettings.length; i++) {
						if (this.departmentSettings[i].slNo == params.data.slNo) {
							this.departmentSettings?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Department Details Removed Successfully");
				});
			}
		})
	}

	onAuditButtonClick(params: any) {
		const modalRef = this.modalService.open(AuditComponent);
		modalRef.componentInstance.title = "Department Setting";
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

	onDepartmentFormClick(event: any, departmentForm: any) {
		this.markFormGroupTouched(this.departmentForm);
		this.submitted = true;
		if (this.departmentForm.invalid) {
			return;
		}
		
		let departments001mb = new Departments001mb();
		departments001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
		departments001mb.department = this.f.department.value ? this.f.department.value : "";
		if (this.slNo) {
			departments001mb.slNo = this.slNo;
			departments001mb.insertUser = this.insertUser;
			departments001mb.insertDatetime = this.insertDatetime;
			departments001mb.updatedUser = this.authManager.getcurrentUser.username;
			departments001mb.updatedDatetime = new Date();
			this.departmentsManager.departmentupdate(departments001mb).subscribe((response) => {
				this.calloutService.showSuccess("Department Details Updated Successfully");
				this.loadData();
				this.departmentForm.reset();
				this.slNo = null;
				this.submitted = false;
			});

		}
		else {
			departments001mb.insertUser = this.authManager.getcurrentUser.username;
			departments001mb.insertDatetime = new Date();
			this.departmentsManager.departmentsave(departments001mb).subscribe((response) => {
				this.calloutService.showSuccess("Department Details Saved Successfully");
				this.loadData();
				this.departmentForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.departmentForm.reset();
	}


	onViewClick() {
		this.departmentsManager.departmentPdf().subscribe((response) => {
		  var blob = new Blob([response], { type: 'application/pdf' });
		  var blobURL = URL.createObjectURL(blob);
		  window.open(blobURL);
		})
	  }
	
	  onGeneratePdfReport() {
		this.departmentsManager.departmentPdf().subscribe((response) => {
		  saveAs(response, "Departmen-Details");
		})
	  }
	
	  onGenerateExcelReport() {
		this.departmentsManager.departmentExcel().subscribe((response) => {
		 saveAs(response, "Departmen-Details");
		
		});
	  }
	


}
