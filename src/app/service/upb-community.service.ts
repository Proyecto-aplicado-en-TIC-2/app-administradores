import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { IUpbCommunity } from '../interface/upb-community.interface';

@Injectable({
  providedIn: 'root',
})
export class UpbCommunityService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<IUpbCommunity[]>(environment.urlApi + '/community', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }
}
