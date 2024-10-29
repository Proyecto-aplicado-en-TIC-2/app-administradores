import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<IIncident[]>(environment.urlApi + '/incidents', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
    });
  }

  public getById(id: string, partitionKey: string): Observable<IIncident> {
    return this.http.get<IIncident>(
      environment.urlApi + `/incidents/${id}/${partitionKey}`,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }

  public getIncidentsOfTheDay(ids: string[]): Observable<IIncident[]> {
    return this.http.post<IIncident[]>(
      environment.urlApi + `/incidents/GetIncidentsOfTheDay`,
      ids,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}

export interface IIncident {
  partition_key: string;
  reporter: {
    id: string;
    names: string;
    lastNames: string;
    relationshipWithTheUniversity: string;
  };
  location: {
    block: string;
    classroom: number;
    pointOfReference: string;
  };
  id: string;
}
