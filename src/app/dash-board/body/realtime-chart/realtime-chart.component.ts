import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-chart',
  templateUrl: './realtime-chart.component.html',
  styleUrls: ['./realtime-chart.component.css']
})
export class RealtimeChartComponent implements OnInit {

  name = 'Angular';

  colorScheme = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A']
  };

  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      "name": "Sales",
      "series": [
        {
          "name": "Jan",
          "value": 8
        },
        {
          "name": "Feb",
          "value": 12
        },
        {
          "name": "Mar",
          "value": 10
        },
        {
          "name": "Apr",
          "value": 4,
          "min": 0,
          "max": 4
        },
        {
          "name": "May",
          "value": 14,

        },
        {
          "name": "Jun",
          "value": 35,
          "min": 35,
          "max": 29
        },
        {
          "name": "Jul",
          "value": 22
        },
        {
          "name": "Aug",
          "value": 12
        },
        {
          "name": "Sep",
          "value": 33
        },
        {
          "name": "Oct",
          "value": 1,
          "min": 1,
          "max": 4
        },
        {
          "name": "Nov",
          "value": 45
        },
        {
          "name": "Dec",
          "value": 46
        }
      ]
    }
  ]

}
