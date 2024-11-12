import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { AphModel } from '../models/aph';
import { BrigadierModel } from '../models/brigadier';

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

  deleteById(id: string) {
    return this.http.delete<any>(
      environment.urlApi + `/prehospital-care/${id}`,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  putById(data: AphModel) {
    return this.http.put<BrigadierModel>(
      environment.urlApi + `/prehospital-care/${data.id}`,
      data,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
