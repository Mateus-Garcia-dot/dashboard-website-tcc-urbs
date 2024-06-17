import { Component, OnDestroy } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { VeiculosService } from '../../services/veiculos.service';
import { Veiculo } from '../../shared/models/veiculo';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  public veiculos: Veiculo[] = [];
  intervalo: any;

  constructor(private veiculoService: VeiculosService, private mapaService: MapaService) {
    this.intervalo = setInterval(() => {
      this.chamarFuncao();
    }, 30000);
  }

  ngOnInit(): void {
    this.veiculoService.getAllVehicles().subscribe(
      (veiculos: Veiculo[]) => {
        this.veiculos = veiculos.filter(item => item.SITUACAO2 === "REALIZANDO ROTA");
        this.chamarFuncao();
      },
      (error) => {
        console.error('Erro ao obter linhas:', error);
      }
    );  
  }

  chamarFuncao() {
    this.mapaService.adicionarTodosVeiculos(this.veiculos);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); 
  }
}