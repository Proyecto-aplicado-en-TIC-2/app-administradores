import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommunityModel } from '../models/community';
import { AphModel } from '../models/aph';

@Injectable({
  providedIn: 'root',
})
export class CommunityUpbService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getById(id: string): Observable<CommunityModel> {
    return this.http.get<CommunityModel>(
      environment.urlApi + `/community/${id}`,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  getFromList(list: string[]) {
    return this.http.post<CommunityModel[]>(
      environment.urlApi + '/community/GetCommunityFromList',
      list,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
