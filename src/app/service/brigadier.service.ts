import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { IBrigadier } from '../interface/brigadier.interface';

@Injectable({
  providedIn: 'root',
})
export class BrigadierService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<IBrigadier[]>(environment.urlApi + '/brigadiers', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }
}
