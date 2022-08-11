
import { Component, enableProdMode, HostBinding, Inject, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { Utils } from 'src/app/shared/utils/utils';




@Component({
    selector: 'app-salebar-chart',
    templateUrl: './salebar-chart.component.html',
    styleUrls: ['./salebar-chart.component.css']
})
export class SalebarChartComponent  implements OnInit{
  multi: any[] = [];
    view: any[] = [700, 400] ;
    preventiveplan001wb: any[] = [];
    preventiveplans: Preventiveplan001wb[] = [];
    janplancount: number = 0;
    febplancount: number = 0;
    marplancount: number = 0;
    aprplancount: number = 0;
    mayplancount: number = 0;
    juneplancount: number = 0;
    julyplancount: number = 0;
    augplancount: number = 0;
    sepplancount: number = 0;
    ocplancount: number = 0;
    novplancount: number = 0;
    decplancount: number = 0;
    janachievedcount:number=0;
    febachievedcount:number=0;
    marachievedcount:number=0;
    aprachievedcount:number=0;
    mayachievedcount:number=0;
    juneachievedcount:number=0;
    julyachievedcount:number=0;
    augachievedcount:number=0;
    sepachievedcount:number=0;
    octachievedcount:number=0;
    novachievedcount:number=0;
    decachievedcount:number=0;
    acheivedcount: number = 0;
    switch_value: string | undefined;
  
    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = true;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Plan';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Acheived';
    legendTitle: string = 'Preventive Plan';
    public legendPosition: LegendPosition = LegendPosition.Below;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    user?: User001mb;
    colorScheme = {
      domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };
  
    constructor(
      private preventivePlanManager: PreventivePlanManager,
      private authManager: AuthManager,
    ) {
     
    }
  ngOnInit(): void {
    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;

      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
  });
    this.preventivePlanManager.findAllByDashboard().subscribe(response => {
      this.preventiveplans = deserialize<Preventiveplan001wb[]>(Preventiveplan001wb, Response);
      for (let i = 0; i < response.length; i++) {
       
        if (response[i].status =="P") {
          let plandate = new Date(response[i].date);
          const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
          let monthName = response[i].date ? months[plandate.getMonth()] : "";
          this.switch_value = monthName;
          switch (this.switch_value) {
            case "01":
             
              this.switch_value = "01";
                 this.janplancount++;
                  break;
               case "02":
                  this.switch_value = "02";
                  this.febplancount++;
                  break;
                case "03":
                  this.switch_value = "03";
                  this.marplancount++;
                  break;
                case "04":
                  this.switch_value = "04";
                  this.aprplancount++;
                  break;
                case "05":
                  this.switch_value = "05";
                  this.mayplancount++;
                  break;
                case "06":
                  this.switch_value = "06";
                  this.juneplancount++;
                  break;
                case  "07":
                  this.switch_value = "07";
                  this.julyplancount++;
                  break;
                case  "08":
                  this.switch_value = "08";
                  this.augplancount++;
                  break;
                case  "09":
                  this.switch_value = "09";
                  this.sepplancount++;
                  break;
                case  "10":
                   this.switch_value = "10";
                   this.ocplancount++;
                    break;
                case  "11":
                    this.switch_value = "11";
                    this.novplancount++;
                    break;
                case  "12":
                    this.switch_value = "12";
                    this.decplancount++;
                    break;
          }
          
        }
            
         else if (response[i].status == "A") {
          let plandate = new Date(response[i].date);
          const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
          let monthName = response[i].date ? months[plandate.getMonth()] : "";
          this.switch_value = monthName;
          switch (this.switch_value) {
            case "01":
             
              this.switch_value = "01";
                 this.janachievedcount++;
                  break;
               case "02":
                  this.switch_value = "02";
                  this.febachievedcount++;
                  break;
                case "03":
                  this.switch_value = "03";
                  this.marachievedcount++;
                  break;
                case "04":
                  this.switch_value = "04";
                  this.aprachievedcount++;
                  break;
                case "05":
                  this.switch_value = "05";
                  this.mayachievedcount++;
                  break;
                case "06":
                  this.switch_value = "06";
                  this.juneachievedcount++;
                  break;
                case  "07":
                  this.switch_value = "07";
                  this.julyachievedcount++;
                  break;
                case  "08":
                  this.switch_value = "08";
                  this.augachievedcount++;
                  break;
                case  "09":
                  this.switch_value = "09";
                  this.sepachievedcount++;
                  break;
                case  "10":
                   this.switch_value = "10";
                   this.octachievedcount++;
                    break;
                case  "11":
                    this.switch_value = "11";
                    this.novachievedcount++;
                    break;
                case  "12":
                    this.switch_value = "12";
                    this.decachievedcount++;
                    break;
              
          }
          
        }
      
      }
      this.multi = [
        {
          "name": "JAN",
          "series": [
           
            {
              "name": "Plan",
              "value": this.janplancount,
            },
            {
              "name": "Achieved",
              "value": this.janachievedcount,
            },
      
          ]
        },
        {
          "name": "FEB",
          "series": [
           
            {
              "name": "Plan",
              "value": this.febplancount,
            },
            {
              "name": "Achieved",
              "value": this.febachievedcount,
            },
          ]
        },
        {
          "name": "MAR",
          "series": [
           
            {
              "name": "Plan",
              "value": this.marplancount,
            },
            {
              "name": "Achieved",
              "value": this.marachievedcount,
            },
          ]
        },
        {
          "name": "APR",
          "series": [
          
            {
              "name": "Plan",
              "value": this.aprplancount,
            },
            {
              "name": "Achieved",
              "value": this.aprachievedcount,
            },
          ]
        },
        {
          "name": "MAY",
          "series": [
          
            {
              "name": "Plan",
              "value": this.mayplancount,
            },
            {
              "name": "Achieved",
              "value": this.mayachievedcount,
            },
          ]
        },
        {
          "name": "JUNE",
          "series": [
          
            {
              "name": "Plan",
              "value": this.juneplancount,
            },
            {
              "name": "Achieved",
              "value": this.juneachievedcount,
            },
          ]
        },
        {
          "name": "JULY",
          "series": [
           
            {
              "name": "Plan",
              "value": this.julyplancount,
            },
            {
              "name": "Achieved",
              "value": this.julyachievedcount,
            },
          ]
        },
        {
          "name": "AUG",
          "series": [
           
            {
              "name": "Plan",
              "value": this.augplancount,
            },
            {
              "name": "Achieved",
              "value": this.augachievedcount,
            },
          ]
        },
        {
          "name": "SEP",
          "series": [
           
            {
              "name": "Plan",
              "value": this.sepplancount,
            },
            {
              "name": "Achieved",
              "value": this.sepachievedcount,
            },
          ]
        },
        {
          "name": "OCT",
          "series": [
            
            {
              "name": "Plan",
              "value": this.ocplancount,
            },
            {
              "name": "Achieved",
              "value": this.octachievedcount,
            },
          ]
        },
        {
          "name": "NOV",
          "series": [
            
            {
              "name": "Plan",
              "value": this.novplancount,
            },
            {
              "name": "Achieved",
              "value": this.novachievedcount,
            },
          ]
        },
        {
          "name": "DEC",
          "series": [
            
            {
              "name": "Plan",
              "value": this.decplancount,
            },
            {
              "name": "Achieved",
              "value": this.decachievedcount,
            },
          ]
        },
      ]
  
  })

}

  
   onSelect(data): void {
      // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }
  
    onActivate(data): void {
      // console.log('Activate', JSON.parse(JSON.stringify(data)));
    }
  
    onDeactivate(data): void {
      // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}