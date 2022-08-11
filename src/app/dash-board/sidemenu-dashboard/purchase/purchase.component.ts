
import { Component, HostBinding, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { concat, differenceBy, sum } from 'lodash';
import * as moment from 'moment';
import { stringify } from 'querystring';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BreakDownRegManager } from 'src/app/shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { Breakdownreg001wb } from 'src/app/shared/services/restcontroller/entities/Breakdownreg001wb';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
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

    purchasecount: number = 0;
    pocount:number = 0;
    acheivedcountpercentage:number =0 ;
    purchaseRegs: Purchasereqslip001wb[] = [];
    order: Purchaseorder001wb[] = [];
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
        private purchaseregslipManager: PurchasereqslipManager,
        private purchaseorderManager: PurchaseorderManager,
        private preventivePlanManager: PreventivePlanManager,
        private authManager: AuthManager,
    ) { }

    ngOnInit(): void {
        //PRSNO COUNT
        this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
            for (let i = 0; i < response.length; i++) {
                if (response[i].prsNo) {
                    this.purchasecount++
                }
            }
           
            this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
           
          });
      

        //BREAKDOWN REGISTER COUNT
        this.purchaseorderManager.allpurchaseorder().subscribe(response => {
            for (let i = 0; i < response.length; i++) {
                if (response[i].pono) {
                    this.pocount++
                }
            }
            this.acheivedcountpercentage = (Math.floor((this.purchasecount / this.pocount) * 100)
            );
            this.order = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
            
          });
          //bar
          this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
            this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
           
            for (let i = 0; i < response.length; i++) {
             
              if (response[i].prsNo) {
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
            
            }
            this.multi = [
              {
                "name": "JAN",
                "series": [
                 
                  {
                    "name": "Plan",
                    "value": this.janplancount,
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
                 
                ]
              },
              {
                "name": "MAR",
                "series": [
                 
                  {
                    "name": "Plan",
                    "value": this.marplancount,
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
                 
                ]
              },
              {
                "name": "MAY",
                "series": [
                
                  {
                    "name": "Plan",
                    "value": this.mayplancount,
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
                 
                ]
              },
              {
                "name": "JULY",
                "series": [
                 
                  {
                    "name": "prsno",
                    "value": this.julyplancount,
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
                 
                ]
              },
              {
                "name": "SEP",
                "series": [
                 
                  {
                    "name": "Plan",
                    "value": this.sepplancount,
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
                 
                ]
              },
              {
                "name": "NOV",
                "series": [
                  
                  {
                    "name": "Plan",
                    "value": this.novplancount,
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






