import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ReportModel } from '../../models/report';
import { ReportsService } from '../../service/reports.service';
import { FullReportsService } from '../../service/full-reports.service';
import { FullReportModel } from '../../models/full-report-model';
import { AphModel } from '../../models/aph';
import { AphService } from '../../service/aph.service';
import { CaseModel } from '../../models/case';
import { CommunityModel } from '../../models/community';
import { BrigadierModel } from '../../models/brigadier';
import { CommunityUpbService } from '../../service/community-upb.service';
import { BrigadierService } from '../../service/brigadier.service';
import { CasesService } from '../../service/cases.service';

@Component({
  selector: 'app-table-history-closed-reports',
  standalone: true,
  imports: [
    FilledButtonComponent,
    FilledButtonComponent2,
    FormsModule,
    NgForOf,
  ],
  template: `
    <!-- Botones de paginación -->
    <div class="pagination-controls roboto-regular">
      <app-filled-button
        (click)="previousPage()"
        [disabled]="currentPage === 1"
        texto="Anterior"
      ></app-filled-button>
      <p>Pagina {{ currentPage }}/{{ totalPages }}</p>
      <app-filled-button
        (click)="nextPage()"
        [disabled]="currentPage * itemsPerPage >= ReportesCompletos.length"
        texto="Siguiente"
      ></app-filled-button>
      <p>Elementos por página</p>
      <select
        id="itemsPerPageSelect"
        [(ngModel)]="itemsPerPage"
        (change)="onItemsPerPageChange(itemsPerPage)"
      >
        <option *ngFor="let option of itemsPerPageOptions" [value]="option">
          {{ option }}
        </option>
      </select>
      <p>
        Total de registros: <b>{{ totalRegister }}</b>
      </p>
    </div>

    <div class="scroll_table">
      <table>
        <thead>
          <tr class="roboto-regular">
            <td class="start"><h4>Fecha</h4></td>
            <td><h4>Hora</h4></td>
            <td><h4>Usuario atendido</h4></td>
            <td><h4>Relación</h4></td>
            <td><h4>Nombre Aph</h4></td>
            <td class="end"><h4>Acciones</h4></td>
          </tr>
        </thead>
        <tbody class="roboto-regular">
          @for (item of paginatedReportes; track item.id) {
            <tr>
              <td class="text">
                <p>{{ fecha(item._ts) }}</p>
              </td>

              <td class="text">
                <p>{{ hora(item._ts) }}</p>
              </td>

              <!-- Nombre del usuario atendido -->
              <td class="text">
                <p>{{ item.reporter.names + ' ' + item.reporter.lastNames }}</p>
              </td>

              <!-- Nombre del usuario atendido -->
              <td class="text">
                <p>{{ item.reporter.relationshipWithTheUniversity }}</p>
              </td>

              <!-- Nombre del APH -->
              <td class="text">
                <p>
                  {{
                    this.getAph(item.aphThatTakeCare)?.names +
                      ' ' +
                      this.getAph(item.aphThatTakeCare)?.last_names
                  }}
                </p>
              </td>

              <td>
                <div class="buttons">
                  <app-filled-button-2
                    texto="Ver mas"
                    (click)="openModal(item.id)"
                  />
                </div>
              </td>
            </tr>
          } @empty {
            <p>Cargando datos</p>
          }
        </tbody>
      </table>
    </div>
    @if (isModal) {
      <div class="modal-overlay" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="scroll_container">
          <div class="container">
            <div class="box roboto-regular">
              <h1 class="roboto-regular">Reporte</h1>
              <h3>Detalles</h3>

              <div class="box_info">
                <h5>Categoría</h5>
                <p>{{ itemModalFullReport.partition_key }}</p>
              </div>

              <div class="box_info">
                <h5>Que está sucediendo</h5>
                <p>{{ itemModalFullReport.whatIsHappening }}</p>
              </div>

              <div class="box_info">
                <h5>Afectado</h5>
                <p>{{ itemModalFullReport.affected }}</p>
              </div>

              <h3>Locación</h3>

              <div class="box_info">
                <h5>Bloque</h5>
                <p>{{ itemModalFullReport.location.block }}</p>
              </div>

              <div class="box_info">
                <h5>Salon</h5>
                <p>{{ itemModalFullReport.location.classroom }}</p>
              </div>

              <div class="box_info">
                <h5>Punto de referencia</h5>
                <p>{{ itemModalFullReport.location.pointOfReference }}</p>
              </div>
            </div>

            <div class="box roboto-regular">
              <h1 class="roboto-regular">Quien reporta</h1>
              <div class="box_info">
                <h5>Nombres</h5>
                <p>{{ itemModalCommunityUpb.names }}</p>
              </div>

              <div class="box_info">
                <h5>Apellidos</h5>
                <p>{{ itemModalCommunityUpb.last_names }}</p>
              </div>

              <div class="box_info">
                <h5>Correo electronico</h5>
                <p>{{ itemModalCommunityUpb.mail }}</p>
              </div>

              <div class="box_info">
                <h5>Numero de telefono</h5>
                <p>{{ itemModalCommunityUpb.phone_number }}</p>
              </div>

              <div class="box_info">
                <h5>Relación con la universidad</h5>
                <p>
                  {{ itemModalCommunityUpb.relationshipWithTheUniversity }}
                </p>
              </div>
            </div>

            <div class="box roboto-regular">
              <h1 class="roboto-regular">Detalles</h1>
              <div class="box_info">
                <h5>Id Universitario</h5>
                <p>{{ itemModalCommunityUpb.userDetails.idUniversity }}</p>
              </div>

              <div class="box_info">
                <h5>Tipo de documento</h5>
                <p>{{ itemModalCommunityUpb.userDetails.documetnType }}</p>
              </div>

              <div class="box_info">
                <h5>Numero de documento</h5>
                <p>{{ itemModalCommunityUpb.userDetails.documentNumber }}</p>
              </div>

              <div class="box_info">
                <h5>Dirección</h5>
                <p>{{ itemModalCommunityUpb.userDetails.address }}</p>
              </div>

              <div class="box_info">
                <h5>Contacto de emergencia</h5>
                <p>
                  {{
                    itemModalCommunityUpb.userDetails
                      .emergencyContactPhoneNumber
                  }}
                </p>
              </div>

              <div class="box_info">
                <h5>Fecha de nacimiento</h5>
                <p>
                  {{ itemModalCommunityUpb.userDetails.birthday }}
                </p>
              </div>

              <div class="box_info">
                <h5>Tipo de sangre</h5>
                <p>
                  {{ itemModalCommunityUpb.userDetails.bloodType }}
                </p>
              </div>

              <div class="box_info">
                <h5>Alergias</h5>
                <p>
                  {{ itemModalCommunityUpb.userDetails.allergies }}
                </p>
              </div>

              <div class="box_info">
                <h5>Medicamentos dependientes</h5>
                <p>
                  {{ itemModalCommunityUpb.userDetails.dependentMedications }}
                </p>
              </div>

              <div class="box_info">
                <h5>Discapacidad</h5>
                <p>
                  {{ itemModalCommunityUpb.userDetails.disabilities }}
                </p>
              </div>
            </div>

            <div class="box roboto-regular">
              <h1 class="roboto-regular">APH Asignado</h1>
              <div class="box_info">
                <h5>Nombres</h5>
                <p>{{ itemModalAph.names }}</p>
              </div>

              <div class="box_info">
                <h5>Apellidos</h5>
                <p>{{ itemModalAph.last_names }}</p>
              </div>

              <div class="box_info">
                <h5>Correo electronico</h5>
                <p>{{ itemModalAph.mail }}</p>
              </div>

              <div class="box_info">
                <h5>Numero de telefono</h5>
                <p>{{ itemModalAph.phone_number }}</p>
              </div>
            </div>

            @if (itemModalBrigadier.id == '') {
              <h1 class="roboto-regular">Sin brigadista</h1>
            } @else {
              <div class="box roboto-regular">
                <h1 class="roboto-regular">Brigadista Asignado</h1>
                <div class="box_info">
                  <h5>Nombres</h5>
                  <p>{{ itemModalBrigadier.names }}</p>
                </div>

                <div class="box_info">
                  <h5>Apellidos</h5>
                  <p>{{ itemModalBrigadier.last_names }}</p>
                </div>

                <div class="box_info">
                  <h5>Correo electronico</h5>
                  <p>{{ itemModalBrigadier.mail }}</p>
                </div>

                <div class="box_info">
                  <h5>Numero de telefono</h5>
                  <p>{{ itemModalBrigadier.phone_number }}</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div class="buttons_footer">
          <app-filled-button texto="Cerrar" (click)="closeModal()" />
        </div>
      </div>
    }
  `,
  styles: `
    /* Estilo de los botones de control*/
    .pagination-controls {
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: center;

      select {
        background: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
        border: none;
        border-radius: 20px;
        width: max-content;
        height: 40px;
        padding: 0 20px;
      }
    }

    /*Estilos de la tabla*/
    .scroll_table {
      overflow-x: auto;
      color: var(--md-sys-color-on-surface);

      table {
        border-spacing: 0 10px;
      }

      thead {
        h4 {
          color: var(--md-sys-color-on-surface-variant);
          margin: 0;
          padding: 7px 15px;
        }

        tr {
          td {
            background: var(--md-sys-color-surface-container);
          }

          .start {
            border-radius: 50px 0 0 50px;
          }

          .end {
            border-radius: 0 50px 50px 0;
          }
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

          .description {
            width: 300px;
            max-height: 2.5em;
            overflow: hidden;
            transition: max-height 1s ease-in;
          }

          .description:before {
            max-height: 2.5em;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
          }

          .description:hover {
            max-height: 100em;
          }

          .category {
            display: flex;
            justify-content: center;
          }

          .buttons {
            width: max-content;
            display: flex;
            flex-direction: row;
            gap: 20px;
          }
        }
      }
    }

    /* Estilos del modal fondo */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    /* Fondo scroll modal */
    .scroll_container {
      overflow-y: auto;
    }

    /* Estilos del modal */
    .modal-content {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1000;
      max-width: 60%;
      background: white;
      padding: 30px;
      border-radius: 8px;

      .box {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .box_info {
          padding: 0 10px;
        }

        h1 {
          font-size: 36px;
        }

        h3 {
          margin: 0 10px;
        }

        h1,
        h5,
        p {
          margin: 0;
        }

        p {
          padding-top: 5px;
        }
      }

      .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 30px;
        color: var(--md-sys-color-on-surface);
      }

      .buttons_footer {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
      }
    }
  `,
})
export class TableHistoryClosedReportsComponent implements OnInit {
  // lista temporal
  ReportesCompletos: FullReportModel[] = [];
  Casos: CaseModel[] = [];
  Aphs: AphModel[] = [];

  currentPage = 1; // Página actual
  itemsPerPage = 10; // Número de elementos por página
  paginatedReportes: FullReportModel[] = []; // Reportes de la página actual
  itemsPerPageOptions = [10, 20, 50]; // Opciones de elementos por página

  constructor(
    private fullReportsService: FullReportsService,
    private aphService: AphService,
    private casesService: CasesService,
    private communityUpbService: CommunityUpbService,
    private brigadierService: BrigadierService,
  ) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  LlenarDatos() {
    // Consultamos los reportes completos
    this.fullReportsService.getAll().subscribe((data) => {
      // Consultamos los casos
      this.casesService.getOpenCases().subscribe((data) => {
        this.Casos = data;
      });

      const listIdsAph: string[] = [];
      data.forEach((item) => {
        listIdsAph.push(item.aphThatTakeCare);
      });

      // Consultamos los APH
      this.aphService.getFromList(listIdsAph).subscribe((value) => {
        this.Aphs = value;
        console.log(value);
      });

      this.ReportesCompletos = data;
      console.log('📃', 'Reportes completos', data);
      this.Ordenar();
      this.updatePagination();
    });
  }

  // Llama a esta función para actualizar los elementos mostrados en la página actual
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(startIndex, endIndex, this.itemsPerPage);
    this.paginatedReportes = this.ReportesCompletos.slice(startIndex, endIndex);
  }

  // Avanza a la página siguiente
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.ReportesCompletos.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Retrocede a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.ReportesCompletos.length / this.itemsPerPage);
  }

  get totalRegister() {
    return this.ReportesCompletos.length;
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = Number.parseInt(String(newItemsPerPage));
    this.currentPage = 1; // Reinicia a la primera página al cambiar el tamaño
    this.updatePagination();
  }

  Ordenar() {
    this.ReportesCompletos.sort((a, b) => b._ts - a._ts);
  }

  // Extracción de datos

  getReportCompletos(id: string) {
    return (
      this.ReportesCompletos.find((value) => value.id === id) ||
      new FullReportModel()
    );
  }

  getCase(id: string) {
    return this.Casos.find((value) => value.id === id) || new CaseModel();
  }

  getAph(id: string) {
    return this.Aphs.find((value) => value.id === id) || new AphModel();
  }

  getCommunity(id: string) {
    return this.communityUpbService.getById(id);
  }

  getBrigadier(id: string) {
    return this.brigadierService.getById(id);
  }

  fecha(numero: number) {
    return new Date(numero * 1000).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  hora(numero: number) {
    return new Date(numero * 1000).toLocaleTimeString();
  }

  protected readonly Math = Math;

  // Modal
  isModal = false; // Variable de cambio para el modal
  itemModalFullReport: FullReportModel = new FullReportModel();
  itemModalCase: CaseModel = new CaseModel();
  itemModalAph: AphModel = new AphModel();
  itemModalCommunityUpb = new CommunityModel();
  itemModalBrigadier = new BrigadierModel();

  openModal(idReport: string) {
    this.itemModalFullReport = this.getReportCompletos(idReport);
    this.itemModalCase = this.getCase(this.itemModalFullReport.help.case_id);
    this.itemModalAph = this.getAph(this.itemModalFullReport.aphThatTakeCare);
    console.log('->', this.itemModalAph);
    console.log('->', this.itemModalFullReport.help.user_id);
    this.getCommunity(this.itemModalFullReport.help.user_id).subscribe(
      (value) => {
        this.itemModalCommunityUpb = value;
        console.log('->', value);

        this.getBrigadier(this.itemModalCase.brigadista_Id).subscribe(
          (value) => {
            this.itemModalBrigadier = value[0];
            this.isModal = true;
            console.log(this.itemModalBrigadier.id);
          },
        );
      },
    );
  }

  closeModal() {
    this.isModal = false;
  }
}
