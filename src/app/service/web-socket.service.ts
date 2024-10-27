import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { ListReportedEmergencies } from './data/datos';
import { ListReportedEmergenciesService } from './data/reported-emergencies.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  @Output() outReportedEmergency: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private listReportedEmergenciesService: ListReportedEmergenciesService,
  ) {
    console.log('WebSocketService', 'Token actual', authService.getToken());

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

  connection = () => {
    this.ioSocket.on('Connexion_Exitosa', (res: any) => {
      console.log('Escuchando el Connexion_Exitosa', res);
    });
  };

  mensajes = () => {
    console.log('Escuchando mensajes para Reporte_Resivido');
    this.ioSocket.on('Reporte_Resivido', (res: any) => {
      console.log('Mensjae recibido Reporte_Resivido', res);

      // Guardamos el nuevo elemento que recibe el socket
      this.listReportedEmergenciesService.addList(res);

      // Emitimos la señal para el renderizado
      this.outReportedEmergency.emit();
    });
  };

  listen = (): void => {
    this.ioSocket.on('connect', (res: any) => {
      console.log('Escuchando el webSocket', res);
    });
  };

  closeConnection(): void {
    this.ioSocket.close();
  }
}
