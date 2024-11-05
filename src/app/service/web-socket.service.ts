import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { ListReports } from './list/list-reports.service';
import { environment } from '../../environments/environment';
import {ReportModel} from "../models/report";

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  @Output() outReportedEmergency: EventEmitter<void> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private listIncidents: ListReports,
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

    this.mensajes();
  }

  listen = (): void => {
    this.ioSocket.on('connect', (res: any) => {
      console.log('Escuchando el webSocket', res);
    });
  };

  mensajes = () => {
    this.ioSocket.on('Reporte_Resivido', (res: ReportModel) => {
      console.log(
        '📡',
        'Mensaje recibido',
        '📥 Socket ->',
        'Reporte_Resivido',
        res,
      );

      // guardamos el dato
      this.listIncidents.push(res);

      // Enviamos la señal
      this.outReportedEmergency.emit();
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
