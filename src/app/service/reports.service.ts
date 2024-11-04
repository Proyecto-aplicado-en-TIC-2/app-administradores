import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {ReportModel} from "../models/report";

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<ReportModel[]>(environment.urlApi + '/incidents', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }

  public getById(id: string, partitionKey: string): Observable<ReportModel> {
    return this.http.get<ReportModel>(
      environment.urlApi + `/incidents/${id}/${partitionKey}`,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  public GetFromList(ids: string[]): Observable<ReportModel[]> {
    return this.http.post<ReportModel[]>(
      environment.urlApi + `/incidents/GetIncidentsOfTheDay`,
      ids,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
