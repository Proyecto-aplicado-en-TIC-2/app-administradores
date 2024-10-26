import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public login(mail: string | null, password: string | null) {
    console.log('Login service -> ', mail, password);
    return this.http.post<ResponseLogIn>(environment.urlApi + '/auth/login', {
      mail: mail,
      password: password,
    });
  }

  public verifyToken() {
    try {
      console.log('Login Service', 'Verificar la valides del token');
      return this.http.get<boolean>(environment.urlApi + '/hello', {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      });
    } catch (e) {
      console.log('Login Service', 'Servidor desconectado');
      return of(false);
    }
  }
}

interface ResponseLogIn {
  operation: boolean;
  access_token: string;
}
