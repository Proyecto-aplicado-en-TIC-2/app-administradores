import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getNewReports() {
    return this.http.get<ICase[]>(environment.urlApi + '/websockets', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }
}

export interface ICase {
  id: string;
  WebSocket_id_attendant: string;
  brigadista_Id: string;
  reporter_Id: string;
  aphThatTakeCare_Id: string;
  partition_key: string;
  State: string;
  date: {
    date: string;
    hourRequest: string;
    hourArrive: string;
    hourCloseAttentionn: string;
  };
}
