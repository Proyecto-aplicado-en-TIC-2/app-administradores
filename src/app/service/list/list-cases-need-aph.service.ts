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

  // Obtener las listas
  getCase() {
    return this.listCases;
  }

  getAph() {
    return this.listAph;
  }

  getCommunity() {
    return this.listCommunity;
  }

  // Agregar un item a la lista
  pushCase(item: CaseModel) {
    this.listCases.push(item);
  }

  pushAph(item: AphModel) {
    this.listAph.push(item);
  }

  pushCommunity(item: CommunityModel) {
    this.listCommunity.push(item);
  }

  // Tamaño de las listas
  lengthCase() {
    return this.listCases.length;
  }

  // LLenar las listas
  fillCase(list: CaseModel[]) {
    this.listCases = list;
  }

  fillAph(list: AphModel[]) {
    this.listAph = list;
  }

  fillCommunity(list: CommunityModel[]) {
    this.listCommunity = list;
  }

  // Buscar items en las listas
  findCaseById(id: string) {
    return this.listCases.find((value) => (value.id = id)) || new CaseModel();
  }

  findAphById(id: string) {
    return this.listAph.find((value) => (value.id = id)) || new AphModel();
  }

  findCommunityById(id: string) {
    return (
      this.listCommunity.find((value) => (value.id = id)) ||
      new CommunityModel()
    );
  }

  putCase(id: string) {
    this.listCases = this.listCases.filter((value) => value.id !== id);
  }
}
