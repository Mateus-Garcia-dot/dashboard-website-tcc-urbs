import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Veiculo } from '../shared/models/veiculo';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  
  private map!: google.maps.Map;
  private veiculoMarker: google.maps.Marker[] = [];
  private todosVeiculosMarker: google.maps.Marker[] = [];
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
        title: veiculos.COD,
        icon: {
          url: 'assets/images/directions_bus_24dp_FILL0_wght400_GRAD0_opsz24.png',
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      const contentString = `
        <div>
          <strong>Linha:</strong> ${veiculos.CODIGOLINHA}<br>
          <strong>Código:</strong> ${veiculos.COD}<br>
          <strong>Horário de atualização:</strong> ${veiculos.REFRESH}<br>
          <strong>Sentido:</strong> ${veiculos.SENTIDO}<br>
          <strong>Situação:</strong> ${veiculos.SITUACAO}<br>
          <strong>Tipo de Veículo:</strong> ${this.getNomeTipoVeiculo(veiculos.TIPO_VEIC)}
        </div>`;

      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.veiculoMarker.push(marker);
    });
  }

  getNomeTipoVeiculo(id: string): string {
    const tiposVeiculo = [
      { id: 1, nome: 'COMUM' },
      { id: 2, nome: 'SEMI PADRON' },
      { id: 3, nome: 'PADRON' },
      { id: 4, nome: 'ARTICULADO' },
      { id: 5, nome: 'BIARTICULADO' },
      { id: 6, nome: 'MICRO' },
      { id: 7, nome: 'MICRO ESPECIAL' },
      { id: 8, nome: 'BIARTIC. BIO' },
      { id: 9, nome: 'ARTIC. BIO' },
      { id: 10, nome: 'HIBRIDO' },
      { id: 11, nome: 'HIBRIDO BIO' },
      { id: 12, nome: 'ELÉTRICO' }
    ];
    const tipo = tiposVeiculo.find(t => t.id === +id); // Converter id para número
    return tipo ? tipo.nome : 'Desconhecido';
  }

  adicionarTodosVeiculos(veiculos: Veiculo[]) {
    this.todosVeiculosMarker.forEach(marker => marker.setMap(null));
    this.todosVeiculosMarker = [];

    veiculos.forEach(veiculos => {
        const position = new google.maps.LatLng(veiculos.LAT, veiculos.LON);
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          title: veiculos.CODIGOLINHA,
          icon: {
            url: 'assets/images/directions_bus_24dp_FILL0_wght400_GRAD0_opsz24.png',
            scaledSize: new google.maps.Size(30, 30)
          }
        });

        const contentString = `
          <div>
          <strong>Linha:</strong> ${veiculos.CODIGOLINHA}<br>
          <strong>Código:</strong> ${veiculos.COD}<br>
          <strong>Horário de atualização:</strong> ${veiculos.REFRESH}<br>
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

        this.todosVeiculosMarker.push(marker);
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
