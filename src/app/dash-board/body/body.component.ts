import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { Utils } from 'src/app/shared/utils/utils';
// import {
//   ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
//   ApexTitleSubtitle, ApexStroke, ApexGrid, ApexFill, ApexMarkers, ApexYAxis
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries | any;
//   chart: ApexChart | any;
//   xaxis: ApexXAxis | any;
//   dataLabels: ApexDataLabels | any;
//   grid: ApexGrid | any;
//   fill: ApexFill | any;
//   markers: ApexMarkers | any;
//   yaxis: ApexYAxis | any;
//   stroke: ApexStroke | any;
//   title: ApexTitleSubtitle | any;
// };

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
    name = 'World';
    user?: User001mb;
    public chartData: Array<any> = [];
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
       
        private authManager: AuthManager,
    ) { }
    // chartData=[];
    ngOnInit() {
        this.authManager.currentUserSubject.subscribe((object: any) => {
            this.user = object;
      
            let rgb = Utils.hexToRgb(object.theme);
      
            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);
      
            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
      
            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);
      
            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            this.chartData.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100),
            ]);
        }
    }

    buttonClick() {
        this.chartData = [];
        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            this.chartData.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100),
            ]);
        }
    }
}
