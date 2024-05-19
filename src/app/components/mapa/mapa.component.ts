import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements AfterViewInit{

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  constructor(private mapaService: MapaService) {}

  ngAfterViewInit(): void {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(-25.425039921571354, -49.26776760408415),
      zoom: 14
    };
    const map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    this.mapaService.setMap(map);
  }

  /*
  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    if (typeof google !== 'undefined' && google.maps) {
      this.initMap();
    } else {
      setTimeout(() => this.loadMap(), 100);
    }
  }

  initMap() {
    const center = new google.maps.LatLng(-25.425039921571354, -49.26776760408415);
    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 14
    };

    new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
  */

}
