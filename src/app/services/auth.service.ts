import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario';
import { Login } from '../shared/models/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://backend.tccurbstads.com';

  constructor(private http: HttpClient) {}
  

  login(credentials: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /*
  cadastro(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, usuario);
  }
  */
}