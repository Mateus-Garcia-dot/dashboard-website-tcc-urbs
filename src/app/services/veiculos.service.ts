import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculos } from '../shared/models/veiculos';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private apiUrl = 'https://backend.tccurbstads.com/vehicles';

  constructor(private http: HttpClient) { }

  getVeiculos(codigo: number): Observable<Veiculos[]> {
    return this.http.get<Veiculos[]>(`${this.apiUrl}/vehicles/${codigo}`);
  }
}
