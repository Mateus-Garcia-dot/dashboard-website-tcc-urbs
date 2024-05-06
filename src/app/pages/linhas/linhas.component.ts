import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { Linha } from '../../shared/models/linha';
import { LinhasService } from '../../services/linhas.service';
import { Observable } from 'rxjs';
import { Veiculos } from '../../shared/models/veiculos';
import { VeiculosService } from '../../services/veiculos.service';
import { PontosService } from '../../services/pontos.service';
import { ShapeService } from '../../services/shape.service';



@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [
    MapaComponent,
    CommonModule
  ],
  templateUrl: './linhas.component.html',
  styleUrl: './linhas.component.scss'
})
export class LinhasComponent implements OnInit{
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  public linhas: Linha[] = [];
  public veiculo: Veiculos[] = [];


  constructor(private linhaService: LinhasService, private veiculoService: VeiculosService, private pontosService: PontosService,
    private shapeService: ShapeService
   ) {}

  ngOnInit(): void {
    this.linhaService.getLinhas().subscribe(
      (linhas: Linha[]) => {
        this.linhas = linhas;
      },
      (error) => {
        console.error('Erro ao obter linhas:', error);
      }
    );  
  }

  selecionarLinha(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const codigoLinha = selectElement.value
    console.log('Linha selecionada:', codigoLinha);

    this.pontosService.getStops(codigoLinha).subscribe(stops => {
      console.log('Paradas:', stops);
    });

    this.shapeService.getShape(codigoLinha).subscribe(shape => {
      console.log('Shape:', shape);
    });

    this.veiculoService.getVehicles(codigoLinha).subscribe(veiculos => {
      console.log('Veículos:', veiculos);
    }); 
  }

   /*
   addMarkers(veiculos: any[]){
    this.veiculo.forEach(veiculos =>{
      let lat = parseFloat(veiculos.LAT);
      let lng = parseFloat(veiculos.LON);
      const position = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: position,
        map: this.map,
        title: veiculos.COD
      });
    })
   }

  veiculos.forEach(veiculo =>{
        let lat = parseFloat(veiculo.LAT);
        let lng = parseFloat(veiculo.LON);
        const position = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: position,
          map: this.map,
          title: veiculo.COD
        });
      })
    addMarkers(veiculos: any[]) {
      this.clearMarkers();
      veiculos.forEach(veiculo => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: parseFloat(veiculo.LAT), lng: parseFloat(veiculo.LON) },
          map: this.map,
          title: veiculo.COD || 'Veículo'
        });
        this.markers.push(marker);
      });
    }

    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    }

    fetchVehicles(linhaId: string) {
      // Substitua isso por uma chamada real ao seu serviço
      const veiculos = this.veiculoService.getVehicles(linhaId); // Esta função deve ser implementada para buscar veículos
      this.addMarkers(veiculos);
    }
  addMarkers(veiculos: any[]): void {
     // Limpa marcadores antigos
     this.markers.forEach(marker => marker.setMap(null));
     this.markers = [];
 
     // Adiciona novos marcadores
     veiculos.forEach(veiculo => {
       const lat = parseFloat(veiculo.LAT);
       const lng = parseFloat(veiculo.LON);
       const marker = new google.maps.marker.AdvancedMarkerElement({
         position: new google.maps.LatLng(lat, lng),
         title: veiculo.COD
       });
       this.markers.push(marker);
     });
  }

    buscaVeiculos() {
      // Suponha que lineId esteja disponível ou seja gerenciado de alguma forma
      const codigoLinha = 'some_line_id';
      this.linhaService.getVehicles(codigoLinha).subscribe(veiculo => {
        this.veiculo = veiculo.map(veiculos => ({
          position: { lat: veiculos.LAT, lng: veiculos.LON },
          COD: veiculos.COD
        }));
      });
      setTimeout(() => this.buscaVeiculos(), 10000); // atualiza a posição a cada 10 segundos
    }
    */
}
