import { Injectable } from '@angular/core';
import { CaseModel } from '../../models/case';
import { AphModel } from '../../models/aph';
import { CommunityModel } from '../../models/community';

@Injectable({
  providedIn: 'root',
})
export class ListCasesNeedAph {
  listCases: CaseModel[] = [];
  listAph: AphModel[] = [];
  listCommunity: CommunityModel[] = [];

  getCase() {
    return this.listCases;
  }

  getAph() {
    return this.listAph;
  }

  getCommunity() {
    return this.listCommunity;
  }

  pushCase(item: CaseModel) {
    this.listCases.push(item);
  }

  pushAph(item: AphModel) {
    this.listAph.push(item);
  }

  pushCommunity(item: CommunityModel) {
    this.listCommunity.push(item);
  }

  lengthCase() {
    return this.listCases.length;
  }

  fillCase(list: CaseModel[]) {
    this.listCases = list;
  }

  fillAph(list: AphModel[]) {
    this.listAph = list;
  }

  fillCommunity(list: CommunityModel[]) {
    this.listCommunity = list;
  }
}
