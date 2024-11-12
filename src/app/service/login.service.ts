import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import {AphModel, AphModelCreateDto} from "../models/aph";
import {BrigadierModel, BrigadierModelCreateDto} from "../models/brigadier";
import {CommunityModel, CommunityModelCreateDto} from "../models/community";

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

  public deleteCuenta(email: string) {
    return this.http.delete<boolean>(environment.urlApi + `/auth/${email}`, {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }

  createAph(password: string | null, item: AphModelCreateDto) {
    return this.http.post<AphModel>(environment.urlApi + '/auth/register/prehospital-care', {
      password: password,
      user: item
    });
  }

  createBrigade(password: string | null, item: BrigadierModelCreateDto) {
    return this.http.post<BrigadierModel>(environment.urlApi + '/auth/register/brigade', {
      password: password,
      user: item
    });
  }

  createCommunity(password: string | null, item: CommunityModelCreateDto) {
    return this.http.post<CommunityModel>(environment.urlApi + '/auth/register/upb-community', {
      password: password,
      user: item
    });
  }
}

interface ResponseLogIn {
  operation: boolean;
  access_token: string;
}
