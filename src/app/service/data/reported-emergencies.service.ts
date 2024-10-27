import { Injectable } from '@angular/core';
import { CommunityUpbReportsService } from '../community-upb-reports.service';

@Injectable({
  providedIn: 'root',
})
export class ListReportedEmergenciesService {
  ListReportedEmergencies: IEmergencyReported[] = [];

  constructor(private communityUpbReportsService: CommunityUpbReportsService) {}

  addList(item: IEmergencyReported) {
    // Obtenemos la lista del localstorage
    const list = this.getListLS();

    // Agregamos el nuevo dato
    list.push(item);

    // Guardamos la lista con el dato nuevo
    this.setListLS(list);
  }

  getList() {
    if (this.listExisteLS()) {
      console.log('Lista ya existe');
      return this.getListLS();
    } else {
      // todo realizar la lógica para cargar con el nuevo query
      // todo realizar un bucle de llenado
      this.communityUpbReportsService.getAll().subscribe((list) => {
        this.setListLS(list);
        console.log(
          'Cantidad de alertas actuales -> listReportEmergency',
          this.getListLS().length,
        );
      });
      console.log(
        'Cantidad de alertas actuales -> listReportEmergency',
        this.getListLS().length,
      );
      return this.getListLS();
    }
  }

  private getListLS() {
    // Obtenemos la lista del local storage
    const string = localStorage.getItem('ListReportedEmergencies');

    // Convertimos ese string en una lista de typo IEmergencyReported
    const list: IEmergencyReported[] = JSON.parse(<string>string);
    return list;
  }

  private setListLS(list: IEmergencyReported[]) {
    // Guardamos una lista nueva
    localStorage.setItem('ListReportedEmergencies', JSON.stringify(list));
  }

  private listExisteLS() {
    // Verificamos si la lista existe
    return !!localStorage.getItem('ListReportedEmergencies');
  }

  private deleteListLS() {
    // Eliminamos la lista en local storage
    localStorage.removeItem('ListReportedEmergencies');
  }
}

export interface IEmergencyReported {
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
