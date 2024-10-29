import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { ListIncidents } from './list/list-incidents';
import { IIncident } from './incident.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  @Output() outReportedEmergency: EventEmitter<void> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private listIncidents: ListIncidents,
  ) {
    console.log(
      '📡',
      'WebSocketService',
      'Token actual',
      authService.getToken(),
    );

    super({
      url: 'http://localhost:3000/WebSocketGateway',
      options: {
        transports: ['websocket'],
        upgrade: true,
        extraHeaders: {
          authorization: 'Bearer ' + authService.getToken(),
          name: 'App angular',
        },
      },
    });
  }

  mensajes = () => {
    this.ioSocket.on('Reporte_Resivido', (res: IIncident) => {
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
}
