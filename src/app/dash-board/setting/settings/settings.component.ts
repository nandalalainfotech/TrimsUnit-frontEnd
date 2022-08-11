import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Person001mb } from 'src/app/shared/services/restcontroller/entities/person001mb';
import { Role001mb } from 'src/app/shared/services/restcontroller/entities/Role001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    frameworkComponents: any;
    id: number | any;
    personId: number | any;
    roleid: number | any;
    rolename: string = "";
    username: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    role001mb: Role001mb[] = [];
    roles: Role001mb[] = [];
    user001mbs: User001mb[] = [];
    public gridOptions: GridOptions | any;
    userRoleForm: FormGroup | any;
    submitted = false;


    constructor(private formBuilder: FormBuilder,
        private roleManager: RoleManager,
        private userManager: UserManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.userRoleForm = this.formBuilder.group({
            username: [null, Validators.required],
            rolename: [null, Validators.required],
        });

        this.createDataGrid001();

        this.loadData();
       

    }

    loadData() {
        this.roleManager.allrole().subscribe((response) => {
            this.roles = deserialize<Role001mb[]>(Role001mb, response);
        });

        this.userManager.alluser().subscribe((response) => {
            this.user001mbs = deserialize<User001mb[]>(User001mb, response);
            if (this.user001mbs.length > 0) {
                this.gridOptions?.api?.setRowData(this.user001mbs);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.userRoleForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this)
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#Id',
                field: 'personId',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'User Name',
                field: "username",
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Role Name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setRoleName.bind(this)
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit'
                }
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 55,
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

    setRoleName(params: any): string {
        return params.data.role ? params.data.role.rolename : null;
    }

    onEditButtonClick(params: any) {
        this.id = params.data.id;
        this.personId = params.data.personId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.userRoleForm.patchValue({
            'username': params.data.personId,
            'rolename': params.data.role.id,
        });
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "User Roll";
        modalRef.componentInstance.details = params.data;
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onUserRoleFormClick(event: any, userRoleForm: any) {
        this.markFormGroupTouched(this.userRoleForm);
        this.submitted = true;
        if (this.userRoleForm.invalid) {
            return;
        }
        let user001mb = new User001mb();
        user001mb.roleid = this.f.rolename.value ? this.f.rolename.value : "";
        user001mb.personId = this.f.username.value ? this.f.username.value : "";
        user001mb.insertUser = this.insertUser;
        user001mb.insertDatetime = this.insertDatetime;
        user001mb.updatedUser = this.authManager.getcurrentUser.username;
        user001mb.updatedDatetime = new Date();
        this.userManager.updateRole(user001mb).subscribe(response => {
            this.calloutService.showSuccess("User Updated Successfully");
            this.userRoleForm.reset();
            this.loadData();
            this.submitted = false;
            this.id = null;
        });
      
    }

    onReset() {
        this.userRoleForm.reset();
        this.submitted = false;

    }
}


