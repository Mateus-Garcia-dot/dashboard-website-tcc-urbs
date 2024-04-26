import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Linha[]>(`${this.apiUrl}/lines`);
  }

  getShape(lineId: number): Observable<Shape> {
    return this.http.get<Shape>(`${this.apiUrl}/shape/${lineId}`);
  }
}
