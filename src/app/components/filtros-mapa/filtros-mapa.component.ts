import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-filtros-mapa',
  standalone: true,
  imports: [],
  templateUrl: './filtros-mapa.component.html',
  styleUrl: './filtros-mapa.component.scss'
})
export class FiltrosMapaComponent implements OnInit {

  ngOnInit(): void {
    //this.loadMap();
    //this.fetchLinhas();
  }

}
