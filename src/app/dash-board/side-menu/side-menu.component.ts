import { transition, trigger, useAnimation } from '@angular/animations';
import {
    Component,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { SearchFilter } from 'src/app/shared/pipe/search-filter';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeeDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/employeedetail.service';
import { EmployeFecilityManager } from 'src/app/shared/services/restcontroller/bizservice/employef.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Emp001mb } from 'src/app/shared/services/restcontroller/entities/employeedetails.mb';
import { Employef001mb } from 'src/app/shared/services/restcontroller/entities/employef001mb';
import { Firstaidwb001 } from 'src/app/shared/services/restcontroller/entities/firstaidmaterials.mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animations';
const animationParams = {
    menuWidth: '70px',
    animationStyle: '1500ms linear',
};
@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
    animations: [
        trigger('sideMenu', [
            transition(':enter', [
                useAnimation(SidebarOpenAnimation, {
                    params: {
                        ...animationParams,
                    },
                }),
            ]),
            transition(':leave', [
                useAnimation(SidebarCloseAnimation, {
                    params: {
                        ...animationParams,
                    },
                }),
            ]),
        ]),
    ],
})
export class SideMenuComponent implements OnChanges, OnInit {
    [x: string]: any;
    @ViewChild('sidenav') public sidenav!: MatSidenav;
    @Input() openNav: boolean | undefined;
    private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
    isCollapsed: boolean = true;
    smallScreen: boolean = true;
    sideNavMode: string | undefined;
    navMode: string | undefined;
    disableClose: boolean | undefined;
    screenWidth!: number;
    parentMenuString: string = '';
    childMenuString: string = '';
    temporaryDisabled: boolean = true;
    isShow: boolean = true;
    mcode: string = "";
    faNo: string = "";
    empname: string = "";
    searchStr: string = "";
    machineSetting: Machine001mb[] = [];
    employeeSetting: Emp001mb[] = [];
    EmployeSetting: Employef001mb[] = [];
    machine001mbs?: Machine001mb[] = [];
    emp001mbs?: Emp001mb[] = [];
    employef001mbs?: Employef001mb[] = [];
    employef001mb?: Employef001mb;
    currentMachine001mbs?: Machine001mb[] = [];
    // currentEmp001mbs?: Emp001mb[] = [];
    supplierReg?: Supplierregistration001mb[] = [];
    currentSupplierReg?: Supplierregistration001mb[] = [];
    supplierreg001mb?: Supplierregistration001mb;
    supplierCode: string = "";
    machine001mb?: Machine001mb;
    hexToRgb: any;
    rgbToHex: any;
    user?: User001mb;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;


    toggle() {
        this.temporaryDisabled = true;
        this.sidenav.toggle();
        setTimeout(() => {
            this.temporaryDisabled = false;
        }, 10);
    }
    constructor(
        private machineSettingManager: MachineSettingManager,
        private employeeDetailsManager: EmployeeDetailsManager,
        private dataSharedService: DataSharedService,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private router: Router,
        private authManger: AuthManager,
        private route: ActivatedRoute,
        private supplierRegManager: SupplierRegManager,
        private employeFecilityManager: EmployeFecilityManager,
        public searchFilter: SearchFilter
    ) { }
    @HostListener('window:resize', ['$event'])
    onResize(_event: any) {
        this.configureSideNav();
    }
    configureSideNav() {
        // this.smallScreen = window.innerWidth < 641 ? true : false;
        // if (!this.smallScreen) {
        //     this.sidenav.mode = "side"
        //     this.sidenav.opened = true
        // }
        // else {
        //     this.sidenav.mode = 'over'
        //     this.sidenav.opened = false
        // }
    }
    closeAllSidenav() {
        this.sidenav.close();
    }
    ngOnChanges() {
        // this.isCollapsed = false;
        // if (!this.openNav) {
        //  this.sidenav.open();
        // }
        // else if (this.sidenav) {
        //  this.sidenav.close();
        // }
    }
    ngOnInit() {
        this.machineSettingManager.findAllSlNoAndMcode().subscribe((response: any) => {
            this.machine001mbs = deserialize<Machine001mb[]>(Machine001mb, response);
            this.currentMachine001mbs = [];
            for (let machine001mb of this.machine001mbs) {
                this.currentMachine001mbs.push(machine001mb);
            }
        });



        this.employeeDetailsManager.allemployee().subscribe((response: any) => {
            this.emp001mbs = deserialize<Emp001mb[]>(Emp001mb, response);
            this.currentEmp001mbs = [];
            for (let emp001mb of this.emp001mbs) {
                this.currentEmp001mbs.push(emp001mb);
            }
        });
        // this.firstaidMaterialsManager.allfirstaid().subscribe((response: any) => {
        //     this.firstaidwb001 = deserialize<Firstaidwb001[]>(Firstaidwb001, response);
        //     console.log("this.firstaidwb001", this.firstaidwb001);
        //     this.currentFirstaidwb001 = [];
        //     for(let firstaidwb001 of this.firstaidwb001) {
        //         this.currentFirstaidwb001.push(firstaidwb001);
        //     }
        // });

        // this.supplierRegManager.findAllSlNoAndSuppcode().subscribe(response => {
        //     this.supplierReg = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
        // });

        this.supplierRegManager.findAllSlNoAndSuppcode().subscribe((response: any) => {
            this.supplierReg = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
            this.currentSupplierReg = [];
            for (let supplierregistration001mb of this.supplierReg) {
                this.currentSupplierReg.push(supplierregistration001mb);
            }
        });

        this.employeFecilityManager.allemployef().subscribe((response: any) => {
            this.employef001mbs = deserialize<Employef001mb[]>(Employef001mb, response);
            this.currentEmployef001mb = [];
            for (let employef001mb of this.employef001mbs) {
                this.currentEmployef001mb.push(employef001mb);
            }
        });
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });

        this.dataSharedService.currentSearchObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentMachine001mbs = [];
                if (this.machine001mbs && this.machine001mbs.length > 0) {
                    for (let machine001mb of this.machine001mbs) {
                        if (this.searchStr && machine001mb.mcode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentMachine001mbs.push(machine001mb);
                        }
                    }
                }
            }
        });

        this.dataSharedService.currentSearchItemObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentSupplierReg = [];
                if (this.supplierReg && this.supplierReg.length > 0) {
                    for (let supplierreg001mb of this.supplierReg) {
                        if (this.searchStr && supplierreg001mb.supplierCode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentSupplierReg.push(supplierreg001mb);
                        }
                    }
                }
            }
        });
        this.dataSharedService.currentSearchMenuObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentMachine001mbs = [];
                if (this.machine001mbs && this.machine001mbs.length > 0) {
                    for (let machine001mb of this.machine001mbs) {
                        if (this.searchStr && machine001mb.mcode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentMachine001mbs.push(machine001mb);
                        }
                    }
                }
            }
        });

        this.dataSharedService.currentSearchObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentEmp001mbs = [];
                if (this.emp001mbs && this.emp001mbs.length > 0) {
                    for (let emp001mb of this.emp001mbs) {
                        if (this.searchStr && emp001mb.empname?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentEmp001mbs.push(emp001mb);
                        }
                    }
                }
            }
        });

        this.dataSharedService.currentSearchMenuItemObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentSupplierReg = [];
                if (this.supplierReg && this.supplierReg.length > 0) {
                    for (let supplierreg001mb of this.supplierReg) {
                        if (this.searchStr && supplierreg001mb.supplierCode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentSupplierReg.push(supplierreg001mb);
                        }
                    }
                }
            }
        });

        this.authManager.currentUserSubject.subscribe((object: any) => {
            this.user = object;

            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
        //Getting Width size//
        this.screenWidth$.subscribe((width) => {
            this.screenWidth = width;
        });

        this.dataSharedService.currentSideNavObject.subscribe(
            (isShow: boolean) => {
                isShow = isShow;
                if (this.sidenav && !isShow) {
                    this.sidenav.open();
                } else if (this.sidenav) {
                    this.sidenav.close();
                }
            }
        );
        this.authManager.currentUserSubject.subscribe((object: any) => {
            // this.colorthemes = object.theme;
        });
    }
    // onMenuClick(machine001mb: Machine001mb) {
    //     this.router.navigate(['../app-machines/app-preventive-maintenance-plan']);
    //     // this.router.navigate(['../app-machines/app-preventive-maintenance-plan', { relativeTo: this.route.parent }]);
    //     // this.router.navigateByUrl('./app-machines/app-preventive-maintenance-plan');
    // }

    ngAfterViewInit() {
        this.temporaryDisabled = false;
    }

    onMenuParentClick(parentMenuString: string, childMenuString: string = '') {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = '';
        this.dataSharedService.changeMenuAction(object);
    }
    onMenuChildClick(parentMenuString: string, childMenuString: string) {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = this.childMenuString;
        this.dataSharedService.changeMenuAction(object);
    }
    onClick(event: any) {
        this.isShow = !this.isShow;
    }

}
function toLocaleLowerCase() {
    throw new Error('Function not implemented.');
}

