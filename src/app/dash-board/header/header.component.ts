import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fork } from 'cluster';
import { data } from 'jquery';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { LogoutPopupComponent } from 'src/app/shared/logout-popup/logout-popup.component';
import { SearchFindComponent } from 'src/app/shared/search-find/search-find.component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeFecilityManager } from 'src/app/shared/services/restcontroller/bizservice/employef.service';
import { FirePlanManager } from 'src/app/shared/services/restcontroller/bizservice/fireplan.service';
import { FirstaidMaterialsManager } from 'src/app/shared/services/restcontroller/bizservice/firstaid-materials.service';
import { LegalManager } from 'src/app/shared/services/restcontroller/bizservice/legal.service';


import { LegalDocumentsManager } from 'src/app/shared/services/restcontroller/bizservice/legaldocuments.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { SafetyEquipmentsManager } from 'src/app/shared/services/restcontroller/bizservice/safetyequipments.service';
import { SupplierAuditManager } from 'src/app/shared/services/restcontroller/bizservice/supplierAudit.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { SupplierTrainingPlanManager } from 'src/app/shared/services/restcontroller/bizservice/suppliertrainingplan.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Fireplan001wb } from 'src/app/shared/services/restcontroller/entities/fireplan.mb';
import { Firstaidwb001 } from 'src/app/shared/services/restcontroller/entities/firstaidmaterials.mb';
import { Legal001wb } from 'src/app/shared/services/restcontroller/entities/legal.mb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { Safetyequwb001 } from 'src/app/shared/services/restcontroller/entities/safetyequipments.mb';
import { Supplieraudit001wb } from 'src/app/shared/services/restcontroller/entities/supplierAudit001mb';
import { Suppliertrainingplan001wb } from 'src/app/shared/services/restcontroller/entities/suppliertrainingplan001wb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Output() open: EventEmitter<boolean> = new EventEmitter();
    isOpen: boolean = false;
    parentMenuString: string = "";
    childMenuString: string = "";
    isActive: boolean | undefined;
    user?: User001mb;
    themes: any;
    searchValue: string = '';
    searchPopup: string = '';
    searchItems: string = '';
    // rgbToHex: any;
    // hexToRgb: any;
    theme: any;
    user001mb: User001mb = new User001mb();
    color: any;
    sideNavMode: string | undefined;
    temporaryDisabled: boolean = true;
    defaultTheme: string = "#286090";
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    params: any
    showNotification: boolean | undefined;
    blink: boolean = false;
    preventiveplans: Preventiveplan001wb[] = [];
    firstaiddetails:Firstaidwb001[]=[];
    safetyEquipment:Safetyequwb001[]=[];
    firePlan:Fireplan001wb[]=[];
    supPlans: Supplieraudit001wb[] = [];
    trainPlans: Suppliertrainingplan001wb[] = [];
    fireplan:Fireplan001wb[]=[];
    legalsetting:Legal001wb[]=[];
    // machine001mbs: Machine001mb[] = [];
    // filterOption: string = 'all';
    // searchValue: string = '';
    // filteredItems = [];

    public downloadUrl: string = `${environment.apiUrl}/filemanager/download/`;
    modalRef: any;
    machine001mbs?: Machine001mb[] | undefined;
    currentMachine001mbs: never[] | undefined;
    searchStr: any;
    constructor(private router: Router,
        private authManager: AuthManager,
        private dataSharedService: DataSharedService,
        private authManger: AuthManager,
        private userManager: UserManager,
        private preventivePlanManager: PreventivePlanManager,
        private firstaidMaterialsManager: FirstaidMaterialsManager,
        private fireplanManager: FirePlanManager,
        private supplierAuditManager: SupplierAuditManager,
        private suppTrainPlanManager: SupplierTrainingPlanManager,
        private modalService: NgbModal,
        private legalmanager: LegalManager,
        private machineSettingManager: MachineSettingManager,
        private employeFecilityManager: EmployeFecilityManager,
        private legalDocumentsManager: LegalDocumentsManager,
        private safetyEquipmentsManager: SafetyEquipmentsManager,
     
        private supplierRegManager: SupplierRegManager) { }

    ngOnInit() {

        // this.updateResults();


        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });


        let preventiveplans = this.preventivePlanManager.findNotificationAll();
        let supPlans = this.supplierAuditManager.findNotification();
        let trainPlans = this.suppTrainPlanManager.NotificationAll();
        let firstaiddetails = this.firstaidMaterialsManager.findeNotificationAll();
        let firePlan = this.fireplanManager.findNotificationAll();
        let legalsetting = this.legalmanager.findNotificationAll();

        forkJoin([preventiveplans, supPlans, trainPlans,firstaiddetails,firePlan,legalsetting ]).subscribe((result: any) => {
            this.preventiveplans = deserialize<Preventiveplan001wb[]>(Preventiveplan001wb, result[0]);
            this.supPlans = deserialize<Supplieraudit001wb[]>(Supplieraudit001wb, result[1]);
            this.trainPlans = deserialize<Suppliertrainingplan001wb[]>(Suppliertrainingplan001wb, result[2]);
            this.firstaiddetails = deserialize<Firstaidwb001[]>(Firstaidwb001, result[3]);
            this.firePlan = deserialize<Fireplan001wb[]>(Fireplan001wb, result[4]);
            this.legalsetting = deserialize<Legal001wb[]>(Legal001wb, result[5]);
            if (this.preventiveplans.length > 0 || this.supPlans.length > 0 || this.trainPlans.length > 0 || this.firstaiddetails.length > 0  || this.firePlan.length > 0 || this.legalsetting.length > 0) {
                this.blink = true;
            } else {
                this.blink = false;
            }
        })


        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
        this.downloadUrl = this.downloadUrl + 'ERP-logo.png';
    }
    ngAfterViewInit() {
        this.temporaryDisabled = false;
    }

    onSerchClick( searchValue:any, searchItems:any){
        this.dataSharedService.onSearchAction(searchValue);
        this.dataSharedService.onSearchAction(searchItems);
        
    } 

    clickMenu() {
        // this.open.emit();   
        this.isOpen = !this.isOpen;
        this.dataSharedService.isSideNavAction(this.isOpen);
    }
    onSerchButtonClick(object:any){ 
        const modalRef = this.modalService.open(SearchFindComponent,{size:'lg'});
    }
    submit() {
        const modalRef = this.modalService.open(LogoutPopupComponent);
        modalRef.result.then((data) => {
            if (data == "Yes") {
                this.authManger.logout("");
            }
        });
    }

    onMenuParentClick(parentMenuString: string, childMenuString: string = "") {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = "";
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

    colorPicker(event: any) {
        console.log("event====>>",event);
        
        this.user001mb = this.authManager.getcurrentUser;
        this.color = this.user001mb.theme;
        this.color = this.themes;
        let updateTheme: any = {};
        updateTheme.personId = this.user001mb.personId;
        updateTheme.theme = this.color;
        this.userManager.updateUserTheme(updateTheme).subscribe((response: any) => {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
            currentUser.userDTO.theme = response.theme;
            this.user001mb.theme = response.theme;
            this.authManager.setcurrentUser(this.user001mb);
            //   This is a color changed area
            let rgb = Utils.hexToRgb(response.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }

    defaultColor() {
        this.user001mb = this.authManager.getcurrentUser;
        this.themes = this.user001mb.theme;
        this.themes = this.defaultTheme;
        let updateTheme: any = {};
        updateTheme.personId = this.user001mb.personId;
        updateTheme.theme = this.themes;
        this.userManager.updateUserTheme(updateTheme).subscribe((response: any) => {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
            currentUser.userDTO.theme = response.theme;
            this.user001mb.theme = response.theme;
            this.authManager.setcurrentUser(this.user001mb);
        });
    }


    openNotification(state: boolean) {
        this.showNotification = state
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(target: any) {
        let bellClass = target.getAttribute('class');
        if (bellClass != "fa fa-bell") {
            this.showNotification = false;
        }
    }

    // updateResults() {
    //     this.filteredItems = this.filterByOption(this.searchByValue(this.machine001mbs));
    // }

    // searchByValue(machine001mbs: any) {
    //     return machine001mbs.filter((machine: any) => {
    //         if (this.searchValue.trim() === '') {
    //             return true;
    //         } else {
    //             return (
    //                 machine.mcode
    //                     .toLowerCase()
    //                     .includes(this.searchValue.trim().toLocaleLowerCase())
    //             );
    //         }
    //     });
    // }

    // filterByOption(machine001mbs: any) {
    //     return machine001mbs.filter((machine: any) => {
    //         if (this.filterOption === 'all' || this.filterOption === machine.mcode) {
    //             return true;
    //         }
    //     });
    // }
}
