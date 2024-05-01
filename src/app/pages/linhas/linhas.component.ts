import { Component } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { Linha } from '../../shared/models/linha';
import { LinhasService } from '../../services/linhas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-linhas',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './linhas.component.html',
  styleUrl: './linhas.component.scss'
})
export class LinhasComponent {
  public linhas: Linha[] = [];

  constructor(private linhaService: LinhasService) {}

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
}
