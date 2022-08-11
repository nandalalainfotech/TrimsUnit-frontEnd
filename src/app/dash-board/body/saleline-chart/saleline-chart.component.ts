import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saleline-chart',
  templateUrl: './saleline-chart.component.html',
  styleUrls: ['./saleline-chart.component.css']
})
export class SalelineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  colorScheme = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A']
  };

  data = [
    {
      "name": "Online",
      "series": [
        {
          "name": "Jan",
          "value": 14
        },
        {
          "name": "Feb",
          "value": 35
        },
        {
          "name": "March",
          "value": 4
        },
        {
          "name": "Apr",
          "value": 17
        },
        {
          "name": "May",
          "value": 14
        },
        {
          "name": "Jun",
          "value": 35
        },
        {
          "name": "Jul",
          "value": 35
        },
        {
          "name": "Aug",
          "value": 35
        },
        {
          "name": "Sep",
          "value": 35
        },
        {
          "name": "Oct",
          "value": 35
        },
        {
          "name": "Nov",
          "value": 35
        },
        {
          "name": "Dec",
          "value": 35
        }
      ]
    },

    {
      "name": "yellow",
      "series": [
        {
          "name": "Aug",
          "value": 364
        },
        {
          "name": "Sep",
          "value": 412
        },
        {
          "name": "Oct",
          "value": 437
        },
        {
          "name": "Nov",
          "value": 437
        },
        {
          "name": "Dec",
          "value": 364
        },
        {
          "name": "Jan",
          "value": 412
        }
      ]
    },
    {
      "name": "red",
      "series": [
        {
          "name": "Aug",
          "value": 168
        },
        {
          "name": "Sep",
          "value": 343
        },
        {
          "name": "Oct",
          "value": 512
        },
        {
          "name": "Nov",
          "value": 291
        },
        {
          "name": "Dec",
          "value": 168
        },
        {
          "name": "Jan",
          "value": 343
        },
      ]
    }
  ]
}
