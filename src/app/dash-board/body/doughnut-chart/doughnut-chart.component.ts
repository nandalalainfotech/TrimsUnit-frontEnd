import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']

})


export class DoughnutChartComponent implements OnInit {

  view: number[] = [700, 400];

  constructor() {

  }

  ngOnInit(): void {
  }

  series = [
    {
      "name": "Online",
      "value": 50,
      "label": "Online",
    },
    {
      "name": "Distributor",
      "value": 30,
      "label": "Distributor",
    },
    {
      "name": "Retail",
      "value": 10,
      "label": "Retail",
    },
    {
      "name": "Corporate",
      "value": 10,
      "label": "Corporate",
    }
  ];

  pieChartLabel(series: any[], name: string): string {
    const item = series.filter(data => data.name === name);
    if (item.length > 0) {
      return item[0].label;
    }
    return name;
  }

}
