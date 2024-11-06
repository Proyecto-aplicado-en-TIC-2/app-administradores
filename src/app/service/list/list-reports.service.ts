import { Injectable } from '@angular/core';
import { ReportModel } from '../../models/report';

@Injectable({
  providedIn: 'root',
})
export class ListReports {
  listReports: ReportModel[] = [];

  get() {
    return this.listReports;
  }

  push(item: ReportModel) {
    this.listReports.push(item);
  }

  length() {
    return this.listReports.length;
  }

  fill(list: ReportModel[]) {
    this.listReports = list;
  }
}
