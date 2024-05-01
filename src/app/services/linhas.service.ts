import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Linha } from '../shared/models/linha';
import { Shape } from '../shared/models/shape';

@Injectable({
  providedIn: 'root'
})
export class LinhasService {

  private apiUrl = 'https://backend.tccurbstads.com';

  constructor(private http: HttpClient) { }

  getLinhas(): Observable<Linha[]> {

    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Linha[]>(`${this.apiUrl}/lines`, { headers });
  }

  getShape(lineId: number): Observable<Shape> {
    return this.http.get<Shape>(`${this.apiUrl}/shape/${lineId}`);
  }
}
