import { Component } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { WebSocketService } from '../../service/web-socket.service';
import { IIncident, IncidentService } from '../../service/incident.service';
import { CasesService } from '../../service/cases.service';
import { ListIncidents } from '../../service/list/list-incidents';
import {
  CommunityUpbService,
  ICommunityUpb,
} from '../../service/community-upb.service';
import { IAPH } from '../../interface/aph.interface';
import { AphService } from '../../service/aph.service';
import {it} from "node:test";

@Component({
  selector: 'app-emergency-card-reported',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <div class="body">
      @for (item of listTemp; track item.id) {
        <section>
          <div class="box roboto-regular">
            <div class="box_info">
              <h5>Prioridad</h5>
              <p class="prioridad">Alta</p>
            </div>

            <div class="box_info">
              <h5>Nombre completo</h5>
              <p>{{ item.reporter.names + ' ' + item.reporter.lastNames }}</p>
            </div>

            <div class="box_info">
              <h5>Bloque</h5>
              <p>{{ item.location.block }}</p>
            </div>

            <div class="box_info">
              <h5>Salón</h5>
              <p>{{ item.location.classroom }}</p>
            </div>

            <div class="box_info">
              <h5>Punto de referencia</h5>
              <p>{{ item.location.pointOfReference }}</p>
            </div>
          </div>
          <div class="box_button">
            <app-filled-button
              texto="Asignar APH"
              (click)="openModalAssignAph(item)"
            />
            <app-filled-button texto="Mas" (click)="openModal(item)" />
          </div>
        </section>
      } @empty {
        <h2 class="roboto-regular" style="color: var(--md-sys-color-error)">Sin alertas reportadas</h2>
      }
    </div>
    @if (isIncidentModalOpen) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal-content">
          <div class="container">
            <div class="box roboto-regular">
              <h2>Categoría del caso</h2>
              <div class="box_info">
                <p class="prioridad">{{ incidentModal.partition_key }}</p>
              </div>

              <h2>Locación de la incidencia</h2>

              <div class="box_info">
                <h5>Bloque</h5>
                <p>{{ incidentModal.location.block }}</p>
              </div>

              <div class="box_info">
                <h5>Salon</h5>
                <p>{{ incidentModal.location.classroom }}</p>
              </div>

              <div class="box_info">
                <h5>Punto de referencia</h5>
                <p>{{ incidentModal.location.pointOfReference }}</p>
              </div>
            </div>
            <div class="box roboto-regular">
              <h2>Quien reporta</h2>
              <div class="box_info">
                <h5>Nombres</h5>
                <p>{{ communityUpbModal.names }}</p>
              </div>

              <div class="box_info">
                <h5>Apellidos</h5>
                <p>{{ communityUpbModal.last_names }}</p>
              </div>

              <div class="box_info">
                <h5>Correo electronico</h5>
                <p>{{ communityUpbModal.mail }}</p>
              </div>

              <div class="box_info">
                <h5>Numero de telefono</h5>
                <p>{{ communityUpbModal.phone_number }}</p>
              </div>

              <div class="box_info">
                <h5>Relación con la universidad</h5>
                <p>
                  {{ communityUpbModal.relationship_with_the_university }}
                </p>
              </div>
            </div>
            <div></div>
          </div>
          <div class="buttons_footer">
            <app-filled-button texto="Cerrar" (click)="closeModal()" />
          </div>
        </div>
      </div>
    }
    @if (isAssignAphModalOpen) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal-content">
          <div class="container container_2">
            <div class="box roboto-regular">
              <table>
                <thead>
                  <tr class="roboto-regular">
                    <td><h4>Nombres</h4></td>
                    <td><h4>Apellidos</h4></td>
                    <td><h4>Numero de teléfono</h4></td>
                    <td><h4>Cuadrante</h4></td>
                  </tr>
                </thead>
                <tbody class="roboto-regular">
                  @for (item of items; track item.id) {
                    <tr>
                      <td class="text">
                        <p>{{ item.names }}</p>
                      </td>
                      <td class="text">
                        <p>{{ item.last_names }}</p>
                      </td>
                      <td class="text">
                        <p>{{ item.phone_number }}</p>
                      </td>
                      <td class="text">
                        <p>{{ item.quadrant }}</p>
                      </td>
                      <td>
                        <div class="buttons">
                          <app-filled-button texto="Asignar APH" (click)="AssignAph(item)" />
                        </div>
                      </td>
                    </tr>
                  } @empty {
                    <p>Cargando datos</p>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div class="buttons_footer">
            <app-filled-button texto="Cerrar" (click)="closeModalAssignAph()" />
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .body {
      display: flex;
      flex-direction: row;
      gap: 30px;
    }

    section {
      width: 317px;
      background: var(--md-sys-color-primary-container);
      padding: 20px 10px;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      gap: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);
    }

    .box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .prioridad {
        font-size: 36px;
      }
      .box_info {
        padding: 0 20px;
      }
      h5,
      h2,
      p {
        margin: 0;
      }
      p {
        padding-top: 5px;
      }
    }

    .box_button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 10px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      position: relative;

      .prioridad {
        color: var(--md-sys-color-primary);
      }
    }

    .buttons_footer {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
    }

    .container {
      display: flex;
      flex-direction: row;
      gap: 30px;
    }

    .container_2 {
      div {
        overflow-x: auto;
        color: var(--md-sys-color-on-surface);
      }

      table {
        border-spacing: 0 10px;
      }

      thead {
        h4 {
          margin: 0;
          padding: 0 15px;
        }
      }

      tbody {
        border-spacing: 10px 0;

        td {
          padding: 0 15px;

          p {
            inline-size: max-content;
            margin: 0;
          }
          .buttons {
            display: flex;
            flex-direction: row;
            gap: 20px;
          }
        }
      }
    }
  `,
})
export class EmergencyCardReportedComponent {
  listTemp: IIncident[] = [];

  constructor(
    private webSocketService: WebSocketService,
    private incidentService: IncidentService,
    private casesService: CasesService,
    private listIncidents: ListIncidents,
    private communityUpbService: CommunityUpbService,
    private aphService: AphService,
  ) {
    if (this.listIncidents.length() == 0) {
      this.GetInicial();
    } else {
      console.log('🫡', 'Usando datos locales');
      this.listTemp = this.listIncidents.get();
    }

    this.webSocketService.outReportedEmergency.subscribe(() => {
      console.log('🫡', 'Dato entrante del socket', '📥', 'Reporte-Recibido');
      console.log('🫡', 'Tamaño de la lista', this.listIncidents.length());
      this.listTemp = this.listIncidents.get();
    });
  }

  GetInicial() {
    console.log('🫡', 'GetInicial');
    this.casesService.getNewReports().subscribe((casos) => {
      const list: string[] = [];
      casos.forEach((caso) => {
        list.push(caso.id);
      });
      this.incidentService.getIncidentsOfTheDay(list).subscribe((reports) => {
        this.listIncidents.fill(reports);
        this.listTemp = this.listIncidents.get();
      });
    });
  }

  isIncidentModalOpen = false;
  incidentModal: IIncident = {
    partition_key: '',
    priority: '',
    reporter: {
      id: '',
      names: '',
      lastNames: '',
      relationshipWithTheUniversity: '',
    },
    location: {
      block: '',
      classroom: 0,
      pointOfReference: '',
    },
    id: '',
  };

  communityUpbModal: ICommunityUpb = {
    partition_key: '',
    id: '',
    names: '',
    last_names: '',
    mail: '',
    phone_number: '',
    relationship_with_the_university: '',
  };

  openModal(incident: IIncident) {
    this.incidentModal = incident;
    // consultamos el usuario
    this.communityUpbService
      .getById(incident.reporter.id)
      .subscribe((casos) => {
        this.communityUpbModal = casos;
        this.isIncidentModalOpen = true;
      });
  }

  closeModal() {
    this.isIncidentModalOpen = false;
  }

  isAssignAphModalOpen = false;
  incidenciaId = "";
  partition_keyModalOpen = "";
  items: IAPH[] = [];
  openModalAssignAph(incident: IIncident) {
    this.incidenciaId = incident.id // Id del caso abierto (Incidente)
    this.partition_keyModalOpen = incident.partition_key // Tipo de caso - Medico - Incendio

    // Consulta de APH
    this.aphService.getAllAph().subscribe((data) => {
      this.items = data;
      this.isAssignAphModalOpen = true;
    });
  }

  closeModalAssignAph() {
    this.isAssignAphModalOpen = false;
  }

  AssignAph(aph: IAPH) {
    // Objeto para la asignación
    let assignAph = {
      user_id: aph.id ,
      partition_key: this.partition_keyModalOpen,
      case_id: this.incidenciaId ,
    }
    console.log('😉','Datos de la asignación',assignAph);
    console.log('😉','Nombre del APH',aph.names, aph.last_names);
    console.log('😉','ID del aph',aph.id);

    // Realizar la asignación
    this.webSocketService.AssignAph(assignAph);

    // Cerrar el modal
    this.isAssignAphModalOpen = false;

    // Eliminar de la lista
    // Obtener la lista
    let listaConCambios = this.listIncidents.get().filter((item) => item.id !== this.incidenciaId)
    this.listIncidents.fill(listaConCambios)

    this.listTemp = this.listIncidents.get();
  }
}
