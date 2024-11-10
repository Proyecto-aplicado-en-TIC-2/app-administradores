import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { CasesService } from '../../service/cases.service';
import { ReportsService } from '../../service/reports.service';
import { ReportModel, Cases } from '../../models/report';
import { CaseModel } from '../../models/case';
import { AphModel } from '../../models/aph';
import { AphService } from '../../service/aph.service';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CommunityUpbService } from '../../service/community-upb.service';
import { CommunityModel } from '../../models/community';
import { BrigadierService } from '../../service/brigadier.service';
import { BrigadierModel } from '../../models/brigadier';

@Component({
  selector: 'app-table-open-reports',
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
        [disabled]="currentPage * itemsPerPage >= Reportes.length"
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
            <td><h4>Nombre</h4></td>
            <td><h4>Nombre Aph</h4></td>
            <td><h4>Prioridad</h4></td>
            <td><h4>Categoría</h4></td>
            <td><h4>Descripción</h4></td>
            <td><h4>Bloque</h4></td>
            <td><h4>Salon</h4></td>
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

              <td class="text">
                <p>{{ item.reporter.names + ' ' + item.reporter.lastNames }}</p>
              </td>

              <td class="text">
                <p>
                  {{
                    getAph(getCase(item.id).aphThatTakeCare_Id).names +
                      ' ' +
                      getAph(getCase(item.id).aphThatTakeCare_Id).last_names
                  }}
                </p>
              </td>

              <td class="text">
                @if (item.priority.toString() == 'Alta') {
                  <li style="color: #cf0017">{{ item.priority }}</li>
                } @else if (item.priority.toString() == 'Media') {
                  <li style="color: #ecae00">{{ item.priority }}</li>
                } @else if (item.priority.toString() == 'Baja') {
                  <li style="color: #0057cc">{{ item.priority }}</li>
                } @else {
                  <li>{{ item.priority }}</li>
                }
              </td>

              <td class="text">
                @if (item.partition_key.toString() == 'Incendio') {
                  <div
                    class="category"
                    style="
                    text-align: center;
                    background-color: #f8d7da;
                    color: #58151c;
                    border: 1px solid #f1aeb5;
                    border-radius: 50rem;
                    padding: 2px 10px;"
                  >
                    <p>{{ item.partition_key }}</p>
                  </div>
                } @else if (item.partition_key.toString() == 'Medico') {
                  <div
                    class="category"
                    style="
                    text-align: center;
                    background-color: #cfe2ff;
                    color: #052c65;
                    border: 1px solid #9ec5fe;
                    border-radius: 50rem;
                    padding: 2px 10px;"
                  >
                    <p>{{ item.partition_key }}</p>
                  </div>
                } @else if (item.partition_key.toString() == 'Estructural') {
                  <div
                    class="category"
                    style="
                    text-align: center;
                    background-color: #fff3cd;
                    color: #664d03;
                    border: 1px solid #ffe69c;
                    border-radius: 50rem;
                    padding: 2px 10px;"
                  >
                    <p>{{ item.partition_key }}</p>
                  </div>
                } @else {
                  <div class="category">
                    <p>{{ item.partition_key }}</p>
                  </div>
                }
              </td>

              <td class="text">
                <p class="description">{{ item.whatIsHappening }}</p>
              </td>

              <td class="text">
                <p>{{ item.location.block }}</p>
              </td>

              <td class="text">
                <p>{{ item.location.classroom }}</p>
              </td>

              <td>
                <div class="buttons">
                  <app-filled-button-2
                    texto="Mas"
                    (click)="openModal(item.id)"
                  />
                </div>
              </td>
            </tr>
          } @empty {
            <p>Sin datos</p>
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
                <h5>Prioridad</h5>
                <p>{{ itemModalReport.priority }}</p>
              </div>

              <div class="box_info">
                <h5>Categoría</h5>
                <p>{{ itemModalReport.partition_key }}</p>
              </div>

              <div class="box_info">
                <h5>Que está sucediendo</h5>
                <p>{{ itemModalReport.whatIsHappening }}</p>
              </div>

              <div class="box_info">
                <h5>Afectado</h5>
                <p>{{ itemModalReport.affected }}</p>
              </div>

              <h3>Locación</h3>

              <div class="box_info">
                <h5>Bloque</h5>
                <p>{{ itemModalReport.location.block }}</p>
              </div>

              <div class="box_info">
                <h5>Salon</h5>
                <p>{{ itemModalReport.location.classroom }}</p>
              </div>

              <div class="box_info">
                <h5>Punto de referencia</h5>
                <p>{{ itemModalReport.location.pointOfReference }}</p>
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
export class TableOpenReportsComponent implements OnInit {
  // lista temporal
  Reportes: ReportModel[] = [];
  Casos: CaseModel[] = [];
  Aphs: AphModel[] = [];

  currentPage = 1; // Página actual
  itemsPerPage = 10; // Número de elementos por página
  paginatedReportes: ReportModel[] = []; // Reportes de la página actual
  itemsPerPageOptions = [10, 20, 50]; // Opciones de elementos por página

  constructor(
    private casesService: CasesService,
    private reportsService: ReportsService,
    private aphService: AphService,
    private communityUpbService: CommunityUpbService,
    private brigadierService: BrigadierService,
  ) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  LlenarDatos() {
    // Consultamos los casos abiertos con un APH
    this.casesService.getOpenCases().subscribe((data) => {
      this.Casos = data;

      const listIds: string[] = [];
      data.forEach((item) => {
        listIds.push(item.id);
      });

      // Consultamos los reportes
      this.reportsService.GetFromList(listIds).subscribe((value) => {
        this.Reportes = value;
        console.log(value);
        this.Ordenar();
        this.updatePagination(); // Actualiza para mostrar los primeros 10 elementos
      });

      const listIdsAph: string[] = [];
      data.forEach((item) => {
        listIdsAph.push(item.aphThatTakeCare_Id);
      });

      // Consultamos los APH
      this.aphService.getFromList(listIdsAph).subscribe((value) => {
        this.Aphs = value;
        console.log(value);
      });
    });
  }

  // Llama a esta función para actualizar los elementos mostrados en la página actual
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(startIndex, endIndex, this.itemsPerPage);
    this.paginatedReportes = this.Reportes.slice(startIndex, endIndex);
  }

  // Avanza a la página siguiente
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.Reportes.length) {
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
    return Math.ceil(this.Reportes.length / this.itemsPerPage);
  }

  get totalRegister() {
    return this.Reportes.length;
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = Number.parseInt(String(newItemsPerPage));
    this.currentPage = 1; // Reinicia a la primera página al cambiar el tamaño
    this.updatePagination();
  }

  Ordenar() {
    this.Reportes.sort((a, b) => b._ts - a._ts);
  }

  // Extracción de datos

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

  getReport(id: string) {
    return this.Reportes.find((value) => value.id === id) || new ReportModel();
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

  // Modal
  isModal = false; // Variable de cambio para el modal
  itemModalReport: ReportModel = new ReportModel();
  itemModalCase: CaseModel = new CaseModel();
  itemModalAph: AphModel = new AphModel();
  itemModalCommunityUpb = new CommunityModel();
  itemModalBrigadier = new BrigadierModel();

  openModal(idReport: string) {
    this.itemModalReport = this.getReport(idReport);
    this.itemModalCase = this.getCase(this.itemModalReport.id);
    this.itemModalAph = this.getAph(this.itemModalCase.aphThatTakeCare_Id);
    this.getCommunity(this.itemModalReport.reporter.id).subscribe((value) => {
      this.itemModalCommunityUpb = value;

      this.getBrigadier(this.itemModalCase.brigadista_Id).subscribe((value) => {
        this.itemModalBrigadier = value[0];
        this.isModal = true;
        console.log(this.itemModalBrigadier.id);
      });
    });
  }

  closeModal() {
    this.isModal = false;
  }

  protected readonly Cases = Cases;
  protected readonly Math = Math;
}
