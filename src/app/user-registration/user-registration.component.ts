import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DepartmentsManager } from '../shared/services/restcontroller/bizservice/Departments.service';
import { PersonManager } from '../shared/services/restcontroller/bizservice/person.service';
import { RoleManager } from '../shared/services/restcontroller/bizservice/role.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { Departments001mb } from '../shared/services/restcontroller/entities/Departments001mb';
import { Person001mb } from '../shared/services/restcontroller/entities/person001mb';
import { Role001mb } from '../shared/services/restcontroller/entities/Role001mb';
import { User001mb } from '../shared/services/restcontroller/entities/User001mb';


@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent implements OnInit {
    emailValidation: boolean = true;
    frameworkComponents: any;
    personId: number | any;
    dpslno: number | any;
    username: string = "";
    roleid: number | any;
    password: string = "";
    status: string = "";
    email: string = "";
    securityquestion: string = "";
    securityanswer: string = "";
    theme: string | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "Registration.SecurityQuestion";
    type: string = "SecurityQuestion";
    // dname: string = "Login.Domain";
    // dtype: string = "Domain";
    // cname: string = "Register.status";
    // ctype: string = "register";
    users: User001mb[] = [];
    persons: Person001mb[] = [];
    roles: Role001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    dsystemproperties?: Systemproperties001mb[] = [];
    csystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    userRegisterForm: FormGroup | any;
    submitted = false;
    departmentSettings: Departments001mb[] = [];

    constructor(private systemPropertiesService: SystemPropertiesService, private router: Router,
        private departmentsManager: DepartmentsManager,
        private personManager: PersonManager,
        private formBuilder: FormBuilder,
        private userManager: UserManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private roleManager: RoleManager,) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.userRegisterForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            dpslno: [null, Validators.required],
            securityquestion: ['', Validators.required],
            securityanswer: ['', Validators.required],
            email: ['', Validators.required],
        });
        this.loaddata();

        this.departmentsManager.loginDeptFindAll().subscribe(response => {
            this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
        });
        this.systemPropertiesService.registerSystem(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        // this.systemPropertiesService.system(this.dname, this.dtype).subscribe(response => {
        //     this.dsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        // });
        // this.systemPropertiesService.system(this.cname, this.ctype).subscribe(response => {
        //     this.csystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        // });
    }

    get f() { return this.userRegisterForm.controls; }

    loaddata() {

        this.personManager.allpersonRegister().subscribe((response) => {
            this.persons = deserialize<User001mb[]>(User001mb, response);
        })

        this.userManager.alluserRegister().subscribe((response) => {
            this.users = deserialize<User001mb[]>(User001mb, response);
            if (this.users.length > 0) {
                this.gridOptions?.api?.setRowData(this.users);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }


    onUserRegistrationClick(event: any, userRegisterForm: any) {
        this.markFormGroupTouched(this.userRegisterForm);
        this.submitted = true;
        if (this.userRegisterForm.invalid) {
            return;
        }

        let user001mb = new User001mb();
        user001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
        user001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
        user001mb.dpslno = this.f.dpslno.value ? this.f.dpslno.value : "";
        user001mb.username = this.f.username.value ? this.f.username.value : "";
        user001mb.status = "A";
        user001mb.roleid = 4;
        user001mb.securityquestion = this.f.securityquestion.value ? this.f.securityquestion.value : "";
        user001mb.securityanswer = this.f.securityanswer.value ? this.f.securityanswer.value : "";
        user001mb.email = this.f.email.value ? this.f.email.value : "";
        user001mb.insertUser = "siva";
        user001mb.insertDatetime = new Date();
        console.log("user001mb", user001mb);
        this.userManager.registerUser(user001mb).subscribe((response) => {
            this.calloutService.showSuccess("User Registered Successfully");
            this.loaddata();
            this.userRegisterForm.reset();
            this.submitted = false;
        })
    }

    onBack() {
        this.router.navigate(['/app-login']);
    }
}