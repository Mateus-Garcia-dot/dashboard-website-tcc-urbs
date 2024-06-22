import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { VeiculosService } from '../../services/veiculos.service';
import { Veiculo } from '../../shared/models/veiculo';
import { MapaService } from '../../services/mapa.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { switchMap, startWith, map } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MapaComponent, 
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  
public veiculos: Veiculo[] = [];
public veiculoFiltrado: Veiculo[] = [];
intervalo: any;
filtroSituacao: string | null = null;
filtroAdapt: string | null = null;
filtroTipoVeic: string | null = null;
tiposVeiculo: { id: string, nome: string }[] = [];
  

  constructor(private veiculoService: VeiculosService, private mapaService: MapaService) {
    
    
    this.intervalo = setInterval(() => {
      this.atualizarVeiculos();
    }, 30000);
  }

  ngOnInit(): void {
    this.atualizarVeiculos();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); 
  }

  aplicarFiltros(): void {
    if (this.veiculos && this.veiculos.length > 0) {
      this.veiculoFiltrado = this.veiculos.filter(v => {
        const adaptado = this.filtroAdapt !== null ? v.ADAPT === this.filtroAdapt : true;
        const tipoVeic = this.filtroTipoVeic !== null ? v.TIPO_VEIC === this.filtroTipoVeic : true;
        return adaptado &&
          tipoVeic &&
          (!this.filtroSituacao || v.SITUACAO === this.filtroSituacao);
      });
      this.mapaService.adicionarTodosVeiculos(this.veiculoFiltrado);
    }
  }

  atualizarVeiculos() {
    this.veiculoService.getAllVehicles().subscribe(
      (veiculos: Veiculo[]) => {
        this.veiculos = veiculos.filter(item => item.SITUACAO2 === "REALIZANDO ROTA");
        this.extrairTiposVeiculo(veiculos);
        this.aplicarFiltros();
      },
      (error) => {
        console.error('Erro ao obter linhas:', error);
      }
    );
  }

  extrairTiposVeiculo(veiculos: Veiculo[]): void {
    const tiposUnicos = [...new Set(veiculos.map(v => v.TIPO_VEIC))];
    this.tiposVeiculo = tiposUnicos.map(tipo => ({
      id: tipo,
      nome: this.getNomeTipoVeiculo(tipo)
    }));
  }

  getNomeTipoVeiculo(id: string): string {
    const tiposVeiculo = [
      { id: '1', nome: 'COMUM' },
      { id: '2', nome: 'SEMI PADRON' },
      { id: '3', nome: 'PADRON' },
      { id: '4', nome: 'ARTICULADO' },
      { id: '5', nome: 'BIARTICULADO' },
      { id: '6', nome: 'MICRO' },
      { id: '7', nome: 'MICRO ESPECIAL' },
      { id: '8', nome: 'BIARTIC. BIO' },
      { id: '9', nome: 'ARTIC. BIO' },
      { id: '10', nome: 'HIBRIDO' },
      { id: '11', nome: 'HIBRIDO BIO' },
      { id: '12', nome: 'ELÉTRICO' }
    ];
    const tipo = tiposVeiculo.find(t => t.id === id);
    return tipo ? tipo.nome : 'Desconhecido';
  }

  chamarFuncao() {
    this.mapaService.adicionarTodosVeiculos(this.veiculos);
  }

}