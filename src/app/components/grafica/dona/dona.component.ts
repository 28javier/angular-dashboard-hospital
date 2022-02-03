import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input() titulo: string = '';


  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [
    'Sin Titulo 1',
    'Sin Titulo 2',
    'Sin Titulo 3',
  ];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#A1CEFB', '#F9F98A', '#F87C7C'],
        hoverBackgroundColor: ['#439EF9', '#E3E30B', '#ED0C0C'],
        hoverBorderColor: ['#00000003', '#00000003', '#00000003']
      },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

}
