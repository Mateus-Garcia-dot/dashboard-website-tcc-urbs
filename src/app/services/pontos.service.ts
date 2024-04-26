import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pontos } from '../shared/models/pontos';

@Injectable({
  providedIn: 'root'
})
export class PontosService {

  private apiUrl = 'https://backend.tccurbstads.com/stops';

  constructor(private http: HttpClient) { }

  getPontos(codigo: number): Observable<Pontos[]> {
    return this.http.get<Pontos[]>(`${this.apiUrl}/stops/${codigo}`);
  }
}
