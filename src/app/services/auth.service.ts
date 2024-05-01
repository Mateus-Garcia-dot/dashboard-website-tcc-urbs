import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario';
import { Login } from '../shared/models/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://backend.tccurbstads.com/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

      return this.http.post(this.apiUrl, null, { params });
  }
  

  
}