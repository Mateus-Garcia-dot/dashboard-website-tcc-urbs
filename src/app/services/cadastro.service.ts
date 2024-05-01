import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../shared/models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl = 'https://backend.tccurbstads.com/register';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> { 
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
}
