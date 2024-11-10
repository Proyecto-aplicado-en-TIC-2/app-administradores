import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import {UpbCommunityModel} from "../models/upb-community";

@Injectable({
  providedIn: 'root',
})
export class UpbCommunityService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<UpbCommunityModel[]>(environment.urlApi + '/community', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }
}
