import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-purchase-master',
  templateUrl: './purchase-master.component.html',
  styleUrls: ['./purchase-master.component.css']
})
export class PurchaseMasterComponent implements OnInit {
  isOpen: boolean = false;
  parentMenuString: string = '';
  childMenuString: string = '';
  isActive: boolean | undefined;
  user?: Login001mb;
  themes: any;
  // rgbToHex: any;
  // hexToRgb: any;
  login001mb: Login001mb = new Login001mb();
  color: any;
  defaultTheme: string = '#286090';
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    private authManager: AuthManager,
    private dataSharedService: DataSharedService) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
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