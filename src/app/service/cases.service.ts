import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { CaseModel } from '../models/case';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getNewReports() {
    return this.http.get<CaseModel[]>(environment.urlApi + '/websockets', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }

  public getOpenCases() {
    return this.http.get<CaseModel[]>(
      environment.urlApi + '/websockets/GetOpenReports',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  public getCasesNeedHelp() {
    return this.http.get<CaseModel[]>(
      environment.urlApi + '/websockets/GetReportsNeedHelp',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  public getCaseById(id: string, key: string) {
    return this.http.get<CaseModel>(
      environment.urlApi + `/websockets/id/${id}/${key}`,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
