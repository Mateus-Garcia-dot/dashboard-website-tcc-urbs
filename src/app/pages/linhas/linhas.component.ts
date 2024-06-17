import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { Linha } from '../../shared/models/linha';
import { LinhasService } from '../../services/linhas.service';
import { Observable, Subscription, interval, map } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { Veiculos } from '../../shared/models/veiculos';
import { VeiculosService } from '../../services/veiculos.service';
import { PontosService } from '../../services/pontos.service';
import { ShapeService } from '../../services/shape.service';
import { MapaService } from '../../services/mapa.service';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';


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
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './linhas.component.html',
  styleUrl: './linhas.component.scss'
})
export class LinhasComponent implements OnInit, OnDestroy{
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  public linhas: Linha[] = [];
  public veiculo: Veiculos[] = [];
  private linhaAtual: string = '';
  private atualizarVeiculo: Subscription | null = null;
  controleLinhas = new FormControl();
  public linhasFiltradas!: Observable<Linha[]>;
  filtroSituacao: string | null = null; // Nova propriedade para o filtro SITUACAO
  filtroAdapt: number | null = null;
  filtroTipoVeic: number | null = null;
  tiposVeiculo = [
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

  constructor(private linhaService: LinhasService, private veiculoService: VeiculosService, private pontosService: PontosService,
    private shapeService: ShapeService, private mapaService: MapaService) {}

    ngOnInit(): void {
      this.linhaService.getLinhas().subscribe(
        (linhas: Linha[]) => {
          this.linhas = linhas;
          this.linhasFiltradas = this.controleLinhas.valueChanges.pipe(
            startWith(''),
            map(value => this._filterLinhas(value))
          );
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

  private _filterLinhas(value: string): Linha[] {
    const filterValue = value.toLowerCase();
    return this.linhas.filter(linha => 
      linha.COD.toString().toLowerCase().includes(filterValue) || 
      linha.NOME.toLowerCase().includes(filterValue)
    );
  }

  selecionarLinha(event: MatAutocompleteSelectedEvent): void {
    const codigoLinha = event.option.value;
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


