import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-piegrid-chart',
  templateUrl: './piegrid-chart.component.html',
  styleUrls: ['./piegrid-chart.component.css']
})
export class PiegridChartComponent implements OnInit {

  single!: any[];
  view: any[] = [500, 400];

  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {

    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  onSelect(event: any) {
    console.log(event);
  }

}
