import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { Linha } from '../../shared/models/linha';
import { LinhasService } from '../../services/linhas.service';
import { Observable, Subscription, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { Veiculos } from '../../shared/models/veiculos';
import { VeiculosService } from '../../services/veiculos.service';
import { PontosService } from '../../services/pontos.service';
import { ShapeService } from '../../services/shape.service';
import { MapaService } from '../../services/mapa.service';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [
    MapaComponent,
    CommonModule, 
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './linhas.component.html',
  styleUrl: './linhas.component.scss'
})
export class LinhasComponent implements OnInit{
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  public linhas: Linha[] = [];
  public veiculo: Veiculos[] = [];
  private linhaAtual: string = '';
  private atualizarVeiculo: Subscription | null = null;


  constructor(private linhaService: LinhasService, private veiculoService: VeiculosService, private pontosService: PontosService,
    private shapeService: ShapeService, private mapaService: MapaService) {}

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

  ngOnDestroy(): void {
    if (this.atualizarVeiculo) {
      this.atualizarVeiculo.unsubscribe();
    }
  }

  selecionarLinha(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const codigoLinha = selectElement.value
    console.log('Linha selecionada:', codigoLinha);

    if (this.linhaAtual !== codigoLinha) {
      this.linhaAtual = codigoLinha;

    this.pontosService.getStops(codigoLinha).subscribe(stops => {
      console.log('Paradas:', stops);
      this.mapaService.adicionaParada(stops);
    });

    this.shapeService.getShape(codigoLinha).subscribe(shape => {
      console.log('Shape:', shape);
      this.mapaService.drawShape(shape);
    });

    if (this.atualizarVeiculo) {
      this.atualizarVeiculo.unsubscribe();
    }

    this.atualizarVeiculo = interval(20000)
      .pipe(
        startWith(0),
        switchMap(() => this.veiculoService.getVehicles(codigoLinha))
      )
      .subscribe(
        veiculos => {
          console.log('Veículos:', veiculos);
          this.mapaService.adicionarVeiculos(veiculos);
        },
        error => console.error('Erro ao atualizar veículos:', error)
      );
    }
  }
  
}


