import { Component, HostBinding, OnInit } from '@angular/core';
import { concat, differenceBy, sum } from 'lodash';
import * as moment from 'moment';
import { stringify } from 'querystring';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BreakDownRegManager } from 'src/app/shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { Breakdownreg001wb } from 'src/app/shared/services/restcontroller/entities/Breakdownreg001wb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { Utils } from 'src/app/shared/utils/utils';
import { Spares001mb } from 'src/app/shared/services/restcontroller/entities/spares001mb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';

@Component({
  selector: 'app-hr-widjet',
  templateUrl: './hr-widjet.component.html',
  styleUrls: ['./hr-widjet.component.css']
})
export class HrWidjetComponent implements OnInit {
  preventiveplans: Preventiveplan001wb[] = [];
  breakdownregs: Breakdownreg001wb[] = [];
  purcount: number = 0;
  purreqcount:number=0;
  sum: any;
  outs: any[]=[];
  user?: User001mb;
  breakdowncount: number = 0;
  endtimecount: number = 0;
  starttimecount: number = 0;
  starttimecountpercentage: number = 0;
  acheivedcount: number = 0;
  acheivedcountpercentage: number = 0;
  startTime?: Date;
  // outs:any;
  endTime?: Date;
  endtimecountpercentage: number = 0;
  plancountpercentage: number = 0;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  purchaseRegs: Purchasereqslip001wb[]=[];
  constructor(
      private purchaseregslipManager: PurchasereqslipManager,
      private authManager: AuthManager,
  ) { }

  ngOnInit(): void {
      //User login
      
      this.authManager.currentUserSubject.subscribe((object: any) => {
          this.user = object;

          let rgb = Utils.hexToRgb(object.theme);

          this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

          this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

          this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

          this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
      });

      //PRS NO
          this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
              for (let i = 0; i < response.length; i++) {
                  if (response[i].prsNo) {
                      console.log("pur",response[i].prsNo)
                      this.purreqcount++
                  }
              }
  
            this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
          });

      //PO Released
        
      this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
          for (let i = 0; i < response.length; i++) {
              if (response[i].poNo) {
                  console.log("pur",response[i].prsNo)
                  this.purcount++
              }
          }

        this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
      });
  }
  

}

