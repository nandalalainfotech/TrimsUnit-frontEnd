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
@Component({
  selector: 'app-maintanance',
  templateUrl: './maintanance.component.html',
  styleUrls: ['./maintanance.component.css']
})
export class MaintananceComponent implements OnInit {
  preventiveplans: Preventiveplan001wb[] = [];
  breakdownregs: Breakdownreg001wb[] = [];
  plancount: number = 0;
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
  constructor(
      private preventivePlanManager: PreventivePlanManager,
      private breakDownRegManager: BreakDownRegManager,
      private authManager: AuthManager,
  ) { }

  ngOnInit(): void {
      //PREVENTIVE PLAN COUNT
      
      this.authManager.currentUserSubject.subscribe((object: any) => {
          this.user = object;

          let rgb = Utils.hexToRgb(object.theme);

          this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

          this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

          this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

          this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
      });
      this.preventivePlanManager.findAllByDashboard().subscribe(response => {
          for (let i = 0; i < response.length; i++) {
              if (response[i].status == "P") {
                  this.plancount++
              }
              if (response[i].status == "A") {
                  this.acheivedcount++
              }

          }

          this.acheivedcountpercentage = (Math.floor((this.acheivedcount / this.plancount) * 100)
          );
          this.preventiveplans = deserialize<Preventiveplan001wb[]>(Preventiveplan001wb, response);
      });

      //BREAKDOWN REGISTER COUNT
      this.breakDownRegManager.findAllByDashboard().subscribe(response => {
         
          for (let i = 0; i < response.length; i++) {
              if (response[i].mslno) {
                  this.breakdowncount++
              }
              if (response[i].startTime && response[i].endTime) {
                  let starttimehh = response[i].startTime.split(":")[0];
                  let starttimemm = response[i].startTime.split(":")[1];
                  let endtimehh = response[i].endTime.split(":")[0];
                  let endtimemm = response[i].endTime.split(":")[1];
                  let diff = endtimehh - starttimehh;
                  let diff1 = endtimemm - starttimemm;
                  let out = diff.toString().padStart(2, '0') + ':' + diff1.toString().padStart(2, '0');
                  this.outs.push(out);
            

              }
          }
this.myFunction();
          this.breakdownregs = deserialize<Breakdownreg001wb[]>(Breakdownreg001wb, response);
      });

  }
  myFunction() {
      var hours = 0;
      var minutes = 0;

      var myArray = this.outs;


      for (var i in myArray) {
          hours += parseInt(myArray[i].substring(0, 2))
          minutes += parseInt(myArray[i].substring(3, 5))
      }
      this.sum = hours + ":" + minutes;
      this.endtimecountpercentage = (Math.floor((this.sum /this.breakdowncount) * 100)
      
      );
  }
  

}



