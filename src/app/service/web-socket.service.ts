import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { ListReports } from './list/list-reports.service';
import { environment } from '../../environments/environment';
import { ReportModel } from '../models/report';
import { ListCasesNeedAph } from './list/list-cases-need-aph.service';
import { AphHelpModel } from '../models/aph-help';
import { CaseModel } from '../models/case';
import { CasesService } from './cases.service';
import { AphService } from './aph.service';
import { CommunityUpbService } from './community-upb.service';
import { firstValueFrom } from 'rxjs';
import { AphModel } from '../models/aph';
import { CommunityModel } from '../models/community';

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
    private casesService: CasesService,
    private aphService: AphService,
    private communityUpbService: CommunityUpbService,
    protected listCasesNeedAph: ListCasesNeedAph, // lista con los aph que necesitan un brigadista
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
    this.ioSocket.on('Aph_help', async (res: AphHelpModel) => {
      console.log('📥 Socket ->', 'Ayuda Aph', res);

      // Consultamos él casó y lo añadimos a la lista
      const tempCase = await this.getCaseService(
        res.case_info.case_id,
        res.case_info.partition_key,
      );
      const tempAph = await this.getAphService(tempCase.aphThatTakeCare_Id);
      const tempCommunity = await this.getCommunityService(
        tempCase.reporter_Id,
      );

      // Añadimos a las listas
      this.listCasesNeedAph.pushCase(tempCase);
      this.listCasesNeedAph.pushAph(tempAph);
      this.listCasesNeedAph.pushCommunity(tempCommunity);

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

  // Asignar un brigade
  AssignBrigade(item: {
    user_id: string;
    partition_key: string;
    case_id: string;
  }): void {
    this.ioSocket.emit('Brigadiers', item);
  }

  // Alerta global
  GlobalAlerts(assignment: any): void {
    this.ioSocket.emit('GlovalWarning', assignment);
  }

  // Metodo para consultar información

  // Extraer dato por id cuando el Socket agrega un nuevo item
  async getCaseService(id: string, key: string) {
    try {
      return await firstValueFrom(this.casesService.getCaseById(id, key));
    } catch {
      return new CaseModel();
    }
  }

  async getAphService(id: string) {
    try {
      return await firstValueFrom(this.aphService.getAphById(id));
    } catch {
      return new AphModel();
    }
  }

  async getCommunityService(id: string) {
    try {
      return await firstValueFrom(this.communityUpbService.getById(id));
    } catch {
      return new CommunityModel();
    }
  }
}
