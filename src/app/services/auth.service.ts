import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario';
import { Login } from '../shared/models/login';
import { tap } from 'rxjs/operators';
import { RespostaLogin } from '../shared/models/resposta-login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://backend.tccurbstads.com/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<RespostaLogin> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
      return this.http.post<RespostaLogin>(this.apiUrl, null, { params }).pipe(
        tap(response => {
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            console.log('Token saved successfully');
          }
        })
      );
    }
}
