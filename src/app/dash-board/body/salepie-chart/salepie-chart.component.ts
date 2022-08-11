import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { deserialize } from 'serializer.ts/Serializer';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
// import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';

@Component({
  selector: 'app-salepie-chart',
  templateUrl: './salepie-chart.component.html',
  styleUrls: ['./salepie-chart.component.css']
})
export class SalepieChartComponent implements OnInit {

  single: any[] = [];
  view: any[] = [700, 400];

  preventiveplans: Preventiveplan001wb[] = [];
  preventiveplan001wb: any[]=[];
  purchasecount: number = 0;
  pocount: number = 0;
  acheivedcountpercentage:number =0;
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  order: Purchaseorder001wb[] = [];
  public legendPosition: LegendPosition = LegendPosition.Below;
  purchaseRegs: Purchasereqslip001wb[] = [];
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };


  constructor(
    private preventivePlanManager: PreventivePlanManager,
    private purchaseregslipManager: PurchasereqslipManager,
    private purchaseorderManager: PurchaseorderManager,
  ) {
    // Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
      this.purchaseRegs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
      
      for (let i = 0; i < response.length; i++) {
        if (response[i].prsNo) {
          this.purchasecount++
      }

      }
      
    this.single=[{name :"PRSNO" ,value:this.purchasecount}, {name :"PONO" ,value:this.pocount}];
  });
  this.purchaseorderManager.allpurchaseorder().subscribe(response => {
    for (let i = 0; i < response.length; i++) {
        if (response[i].pono) {
            this.pocount++
        }
    }
    this.acheivedcountpercentage = (Math.floor((this.purchasecount / this.pocount) * 100)
    );
    this.order = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
    this.single=[{name :"PRSNO" ,value:this.purchasecount}, {name :"PONO" ,value:this.pocount}];
  });
  
  }

  onSelect(data: any): void {
    // console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }
}
