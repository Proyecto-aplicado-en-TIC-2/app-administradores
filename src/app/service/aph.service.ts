import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IAPH } from '../interface/aph.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AphService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAllAph() {
    return this.http.get<IAPH[]>(environment.urlApi + '/prehospital-care', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }
}
