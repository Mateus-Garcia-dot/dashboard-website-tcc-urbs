import { Component } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
