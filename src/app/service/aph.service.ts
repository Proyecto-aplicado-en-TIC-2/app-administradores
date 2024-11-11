import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { AphModel } from '../models/aph';

@Injectable({
  providedIn: 'root',
})
export class AphService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAllAph() {
    return this.http.get<AphModel[]>(environment.urlApi + '/prehospital-care', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }

  public getFromList(list: string[]) {
    return this.http.post<AphModel[]>(
      environment.urlApi + '/prehospital-care/GetAphFromList',
      list,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  public getAphById(id: string) {
    return this.http.get<AphModel>(
      environment.urlApi + '/prehospital-care/' + id,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
