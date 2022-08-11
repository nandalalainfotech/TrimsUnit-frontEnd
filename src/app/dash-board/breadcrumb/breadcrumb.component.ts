import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
    parentMenuString: string | undefined;
    childMenuString: string | null | undefined;
    isLoader: boolean = false;
    // rgbToHex: any;
    // hexToRgb: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authManager: AuthManager,
        private dataSharedService: DataSharedService
    ) {}

    ngOnInit(): void {
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
        this.dataSharedService.currentLoaderObject.subscribe(
            (isLoader: boolean) => {
                this.isLoader = isLoader;
            }
        );
    }
}
