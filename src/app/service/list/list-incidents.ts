import { IIncident } from '../reports.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListIncidents {
  listIncidents: IIncident[] = [];

  get() {
    return this.listIncidents;
  }

  push(item: IIncident) {
    this.listIncidents.push(item);
  }

  length() {
    return this.listIncidents.length;
  }

  fill(list: IIncident[]) {
    this.listIncidents = list;
  }
}
