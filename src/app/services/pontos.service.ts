import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pontos } from '../shared/models/pontos';

@Injectable({
  providedIn: 'root'
})
export class PontosService {

  private apiUrl = 'https://backend.tccurbstads.com';

  constructor(private http: HttpClient) { }

  getStops(codigoLinha: string): Observable<any> {

    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/stops/${codigoLinha}`, { headers });
  }

  /*
  getPontos(codigo: number): Observable<Pontos[]> {
    return this.http.get<Pontos[]>(`${this.apiUrl}/stops/${codigo}`);
  }
  */
}
