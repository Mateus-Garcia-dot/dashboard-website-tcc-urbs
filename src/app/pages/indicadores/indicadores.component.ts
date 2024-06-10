import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatIconModule],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.scss'
})
export class IndicadoresComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) private chartRef!: ElementRef;
  chart: any;

  constructor() {
    this.chartRef = {} as ElementRef;
   }

  ngOnInit(): void {
    this.createLineChart();
  }

  createLineChart(): void {
    const chartData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
      datasets: [{
        label: 'Vendas',
        data: [100, 150, 120, 180, 200],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        lineTension: 0.1
      }]
    };

    const chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  }
  
}
