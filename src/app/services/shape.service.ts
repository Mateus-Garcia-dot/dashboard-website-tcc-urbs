import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shape } from '../shared/models/shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  private apiUrl = 'https://backend.tccurbstads.com';

  constructor(private http: HttpClient) { }

  getShape(codigoLinha: string): Observable<any> {

    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/shape/${codigoLinha}`, { headers });
  }
}
