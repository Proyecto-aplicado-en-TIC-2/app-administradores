import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { FullReportModel } from '../models/full-report-model';

@Injectable({
  providedIn: 'root',
})
export class FullReportsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<FullReportModel[]>(
      environment.urlApi + '/emergency-reports',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
