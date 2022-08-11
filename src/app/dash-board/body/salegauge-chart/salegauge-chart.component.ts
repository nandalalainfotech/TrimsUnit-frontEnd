import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { single } from './data';

@Component({
  selector: 'app-salegauge-chart',
  templateUrl: './salegauge-chart.component.html',
  styleUrls: ['./salegauge-chart.component.css']
})
export class SalegaugeChartComponent implements OnInit {

  single: any[] = [];
  view: any[] = [500, 400];
  legend: boolean = true;
  // legendPosition: string = 'below';

  

  public legendPosition: LegendPosition = LegendPosition.Below;

  constructor() { 

    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
