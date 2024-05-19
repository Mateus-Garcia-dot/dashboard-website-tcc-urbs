import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  
  private map!: google.maps.Map;
  private veiculoMarker: google.maps.Marker[] = [];
  private paradaMarker: google.maps.Marker[] = [];
  private shapePath: google.maps.Polyline | null = null;

  
  setMap(map: google.maps.Map) {
    this.map = map;
  }

  adicionaParada(stops: any[]) {
    this.paradaMarker.forEach(markers => markers.setMap(null));
    this.paradaMarker = [];

    stops.forEach(stops => {
      const position = new google.maps.LatLng(stops.COORD[1], stops.COORD[0]);
      const markers = new google.maps.Marker({
        position,
        map: this.map,
        title: stops.NOME,
        icon: {
          url: 'assets/images/location_on_24dp_FILL0_wght400_GRAD0_opsz24.png',
          scaledSize: new google.maps.Size(24, 24)
        }
      });

      const contentString = `
        <div>
          <strong>Nome:</strong> ${stops.NOME}<br>
          <strong>Sentido:</strong> ${stops.SENTIDO}<br>
          <strong>Tipo:</strong> ${stops.TIPO}
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      markers.addListener('click', () => {
        infoWindow.open(this.map, markers);
      });

      this.paradaMarker.push(markers);
    });
  }

  adicionarVeiculos(veiculos: any[]) {
    this.veiculoMarker.forEach(marker => marker.setMap(null));
    this.veiculoMarker = [];

    veiculos.forEach(veiculos => {
      const position = new google.maps.LatLng(veiculos.LAT, veiculos.LON);
      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: veiculos.NAME,
        icon: {
          url: 'assets/images/directions_bus_24dp_FILL0_wght400_GRAD0_opsz24.png',
          scaledSize: new google.maps.Size(24, 24)
        }
      });

      const contentString = `
        <div>
          <strong>Linha:</strong> ${veiculos.CODIGOLINHA}<br>
          <strong>Código:</strong> ${veiculos.COD}<br>
          <strong>Horário de atualização:</strong> ${veiculos.REFRESH}<br>
          <strong>Sentido:</strong> ${veiculos.SENTIDO}<br>
          <strong>Situação:</strong> ${veiculos.SITUACAO}<br>
          <strong>Status:</strong> ${veiculos.SITUACAO2}
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.veiculoMarker.push(marker);
    });
  }

  drawShape(shapeData: any[]) {
    if (this.shapePath) {
      this.shapePath.setMap(null);
    }

    const path = shapeData.map(point => new google.maps.LatLng(point.COORD[1], point.COORD[0]));
    
    this.shapePath = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.shapePath!.setMap(this.map);
  }
  

  constructor() { }
}
