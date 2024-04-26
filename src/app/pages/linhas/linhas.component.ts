import { Component } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';

@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './linhas.component.html',
  styleUrl: './linhas.component.scss'
})
export class LinhasComponent {

}
