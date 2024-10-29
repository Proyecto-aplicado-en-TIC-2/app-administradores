import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunityUpbService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  public getById(id: string): Observable<ICommunityUpb> {
    return this.http.get<ICommunityUpb>(
      environment.urlApi + `/community/${id}`,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      },
    );
  }
}

export interface ICommunityUpb {
  partition_key: string;
  id: string;
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationship_with_the_university: string;
}
