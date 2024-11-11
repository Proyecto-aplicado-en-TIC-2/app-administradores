import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { ListReports } from './list/list-reports.service';
import { environment } from '../../environments/environment';
import { ReportModel } from '../models/report';
import { ListCasesNeedAph } from './list/list-cases-need-aph.service';
import { AphHelpModel } from '../models/aph-help';
import { CaseModel } from '../models/case';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  @Output() outReportedEmergency: EventEmitter<void> = new EventEmitter();
  @Output() outAphHelp: EventEmitter<AphHelpModel> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private listIncidents: ListReports,
    private listAphsHelp: ListCasesNeedAph,
  ) {
    console.log(
      '📡',
      'WebSocketService',
      'Token actual',
      authService.getToken(),
    );

    super({
      url: environment.urlApi + '/WebSocketGateway',
      options: {
        transports: ['polling'],
        upgrade: true,
        extraHeaders: {
          Authorization: 'Bearer ' + authService.getToken(),
        },
      },
    });

    this.Reportes(); // Mensajes de los reportes recibidos por parte de los usuarios
    this.AphHelp(); // Escucha los aph que necesitan ayuda
  }

  listen = (): void => {
    this.ioSocket.on('connect', (res: any) => {
      console.log('Escuchando el webSocket', res);
    });
  };

  Reportes = () => {
    this.ioSocket.on('Reporte_Resivido', (res: ReportModel) => {
      console.log('📥 Socket ->', 'Reporte', res);

      // guardamos el dato
      this.listIncidents.push(res);

      // Enviamos la señal
      this.outReportedEmergency.emit();
    });
  };

  AphHelp = () => {
    this.ioSocket.on('Aph_help', (res: AphHelpModel) => {
      console.log('📥 Socket ->', 'Ayuda Aph', res);

      // Enviamos la señal
      this.outAphHelp.emit(res);
    });
  };

  closeConnection(): void {
    this.ioSocket.close();
  }

  // Asignar un aph
  AssignAph(assignment: any): void {
    this.ioSocket.emit('APH', assignment);
  }

  // Alerta global
  GlobalAlerts(assignment: any): void {
    this.ioSocket.emit('GlovalWarning', assignment);
  }
}
