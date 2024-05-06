import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  /*
  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  
  setMap(map: google.maps.Map) {
    this.map = map;
  }

  addMarkers(veiculos: any[]) {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    veiculos.forEach(veiculo => {
      const position = new google.maps.LatLng(veiculo.latitude, veiculo.longitude);
      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: veiculo.nome
      });
      this.markers.push(marker);
    });
  }
  */

  constructor() { }
}
