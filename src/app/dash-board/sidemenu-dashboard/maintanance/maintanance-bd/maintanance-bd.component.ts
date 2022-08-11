import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { multi } from './data';

@Component({
  selector: 'app-maintanance-bd',
  templateUrl: './maintanance-bd.component.html',
  styleUrls: ['./maintanance-bd.component.css']
})
export class MaintananceBDComponent implements OnInit {

  multi: any[] = [];
  view: number[] = [700, 400];

  
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'MONTH-2019';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'BREAKDOWN HRs';
  // legendTitle: string = 'Years';
  public legendPosition: LegendPosition = LegendPosition.Below;
  animations: boolean = true;

  colorScheme = {
    domain: ['##0000FF']
  };


  constructor() { 
    Object.assign(this, { multi })

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
