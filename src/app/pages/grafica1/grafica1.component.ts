import { Component } from '@angular/core';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {



  labels1: string[] = ['Ventas1', 'Ventas2', 'Ventas3'];
  data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
        //hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };


  labels2: string[] = ['Compras1', 'Compras2', 'Compras3'];
  data2: ChartData<'doughnut'> = {
    labels: this.labels2,
    datasets: [
      {
        data: [100, 300, 500],
      }
    ]
  };


  labels3: string[] = ['Productos1', 'Productos2', 'Productos3'];
  data3: ChartData<'doughnut'> = {
    labels: this.labels3,
    datasets: [
      {
        data: [500, 300, 500],
      }
    ]
  };

  labels4: string[] = ['Cambios1', 'Cambios2', 'Cambios3'];
  data4: ChartData<'doughnut'> = {
    labels: this.labels4,
    datasets: [
      {
        data: [200, 400, 100],
      }
    ]
  };

}
