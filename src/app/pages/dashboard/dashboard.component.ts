import { Component } from '@angular/core';
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
export class DashboardComponent {
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
        this.veiculos = veiculos;

        let novaLista: any[] = [];
        
        veiculos.forEach(item => {
          
          if(item.SITUACAO2 === "REALIZANDO ROTA") {
            novaLista.push(item);
          }
        });
        console.log(novaLista);
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
}
