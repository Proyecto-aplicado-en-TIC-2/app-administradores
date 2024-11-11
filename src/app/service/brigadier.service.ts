import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BrigadierModel } from '../models/brigadier';

@Injectable({
  providedIn: 'root',
})
export class BrigadierService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<BrigadierModel[]>(environment.urlApi + '/brigadiers', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }

  public getById(id: string) {
    return this.http.get<BrigadierModel[]>(
      environment.urlApi + '/brigadiers/' + id,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  public GetBrigadierFromList(list: string[]) {
    return this.http.post<BrigadierModel[]>(
      environment.urlApi + '/brigadiers/GetBrigadierFromList',
      list,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
