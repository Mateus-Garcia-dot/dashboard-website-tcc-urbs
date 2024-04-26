import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit{

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

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

}
