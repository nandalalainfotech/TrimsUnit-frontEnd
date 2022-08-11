import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-facilitys',
  templateUrl: './facilitys.component.html',
  styleUrls: ['./facilitys.component.css']
})
export class FacilitysComponent implements OnInit {

  parentMenuString: string = '';
  childMenuString: string = '';
  isActive: boolean | undefined;
  themes: any;
  color: any;
  user?: Login001mb;
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
    private route: ActivatedRoute,
    private authManger: AuthManager,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.user = this.authManger.getcurrentUser;
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
