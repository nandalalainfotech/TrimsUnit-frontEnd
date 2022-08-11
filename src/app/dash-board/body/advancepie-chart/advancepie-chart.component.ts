import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
// import { data } from 'jquery';
import { deserialize } from 'serializer.ts/Serializer';
import { PreventivePlanManager } from 'src/app/shared/services/restcontroller/bizservice/preventiveplan.service';
import { Preventiveplan001wb } from 'src/app/shared/services/restcontroller/entities/preventiveplan001wb';

@Component({
  selector: 'app-advancepie-chart',
  templateUrl: './advancepie-chart.component.html',
  styleUrls: ['./advancepie-chart.component.css']
})
export class AdvancepieChartComponent implements OnInit {

  width = "500";
  height = "250";
  type = "pareto2d";
  data:any[]=[];
  dataFormat = "json";
  dataSource=data;
  preventiveplans: Preventiveplan001wb[] = [];
  // breakdownregs: Breakdownreg001wb[] = [];
  plancount: number = 0;
  // breakdowncount: number = 0;
  // endtimecount: number = 0;
  // starttimecount: number = 0;
  // starttimecountpercentage: number = 0;
  acheivedcount: number = 0;
  acheivedcountpercentage: number = 0;
  // startTime?:Date;
 
  // endTime?:Date;
  // endtimecountpercentage: number = 0;
  // plancountpercentage: number = 0;
  constructor(
    private preventivePlanManager: PreventivePlanManager,
  ) {}

  ngOnInit(): void {
    this.preventivePlanManager.findAllByDashboard().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].status) {
          this.plancount++
        }
        if (response[i].status == "A") {
          this.acheivedcount++
        }

      }
      this.data=[{name :"Jan" ,value:this.plancount}];
     
     
    });
  }  
}
 


  

  // onSelect(data: any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data: any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data: any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }



// const data = {
//   chart: {
//     // caption: " Sales Profit",
//     theme: "fusion",
//     decimals: "1",
//     drawcrossline: "1"
//   },
//   data: [
//     {
//       label: "Jan",
//       value: "40",
//       "color": "e9967a"
//     },
//     {
//       label: "Feb",
//       value: "22",
//       "color": "#e9967a"
//     },
//     {
//       label: "Mar",
//       value: "12",
//       "color": "#e9967a"
//     },
//     {
//       label: "Apr",
//       value: "10",
//       "color": "#e9967a"
//     },
//     {
//       label: "May",
//       value: "6",
//       "color": "#e9967a"
//     }
//   ]
// };

