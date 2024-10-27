import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { IEmergencyReported } from './data/reported-emergencies.service';

@Injectable({
  providedIn: 'root',
})
export class CommunityUpbReportsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getAll() {
    return this.http.get<IEmergencyReported[]>(
      environment.urlApi + '/incidents',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}
