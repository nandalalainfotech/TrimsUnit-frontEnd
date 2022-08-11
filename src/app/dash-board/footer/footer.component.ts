import {
    Component,
    EventEmitter,
    HostBinding,
    OnInit,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { UnitManagerManager } from 'src/app/shared/services/restcontroller/bizservice/unitmaster.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { UnitMaster001mb } from 'src/app/shared/services/restcontroller/entities/unitmaster001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    @Output() open: EventEmitter<boolean> = new EventEmitter();
    isOpen: boolean = false;
    parentMenuString: string = '';
    childMenuString: string = '';
    isActive: boolean | undefined;
    user?: any;
    unit?: any;
    themes: any;
    unitmasters: UnitMaster001mb[] = [];
    // rgbToHex: any;
    // hexToRgb: any;
    login001mb: Login001mb = new Login001mb();
    color: any;
    clr = 'black';
    defaultTheme: string = '#286090';
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        private router: Router,
        private loginManager: LoginManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private dataSharedService: DataSharedService,
        private authManger: AuthManager,
        private baseService: BaseService,
        private unitManagerManager: UnitManagerManager
    ) { }

    ngOnInit() {
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.unitManagerManager.allunitmanager().subscribe((response) => {
            this.unitmasters = deserialize<UnitMaster001mb[]>(UnitMaster001mb, response);
            for(let i=0; i<this.unitmasters.length; i++){
                if(this.unitmasters[i].slNo==this.user.unitslNo){

                    this.unit=this.unitmasters[i].unitName
                }
            }
        })
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }
}
