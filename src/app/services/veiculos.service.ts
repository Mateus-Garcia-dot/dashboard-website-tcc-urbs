import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Veiculos } from '../shared/models/veiculos';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  private veiculosSource = new BehaviorSubject<any[]>([]);

  currentVeiculos = this.veiculosSource.asObservable();

  private apiUrl = 'https://backend.tccurbstads.com';

  constructor(private http: HttpClient) { }

  getVehicles(codigoLinha: string): Observable<Veiculos[]> {

    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.http.get<Veiculos[]>(`${this.apiUrl}/vehicles/${codigoLinha}`, { headers });
  }

  updateVeiculos(veiculos: any[]): void {
    this.veiculosSource.next(veiculos);
  }

  getVeiculos(codigo: number): Observable<Veiculos[]> {
    return this.http.get<Veiculos[]>(`${this.apiUrl}/vehicles/${codigo}`);
  }
}
