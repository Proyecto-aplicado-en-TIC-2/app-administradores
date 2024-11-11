import { Component } from '@angular/core';
import { ListCasesNeedAph } from '../../service/list/list-cases-need-aph.service';
import { CasesService } from '../../service/cases.service';
import { CaseModel } from '../../models/case';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { AphService } from '../../service/aph.service';
import { AphModel } from '../../models/aph';
import { CommunityModel } from '../../models/community';
import { CommunityUpbService } from '../../service/community-upb.service';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { BrigadierModel } from '../../models/brigadier';
import { BrigadierService } from '../../service/brigadier.service';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-table-aphs-help',
  standalone: true,
  imports: [
    FilledButtonComponent,
    FilledButtonComponent2,
    FormsModule,
    NgForOf,
  ],
  template: `
    <section id="content">
      <!--   Información de las listas   -->
      @if (listCases.length != 0) {
        <div class="roboto-regular header_info">
          <p>
            Aph que necesitan ayuda <b>{{ listCases.length }}</b>
          </p>
        </div>
      }
      <!--   Lista de los casos   -->
      <div class="list">
        <div class="body roboto-regular">
          @for (item of listCases; track item.id) {
            <section class="cards">
              <div class="box_info">
                <h5>Nombre Aph</h5>
                <p>
                  {{
                    getAph(item.aphThatTakeCare_Id).names +
                      ' ' +
                      getAph(item.aphThatTakeCare_Id).last_names
                  }}
                </p>
              </div>

              <div class="box_info">
                <h5>Nombre Usuario</h5>
                <p>
                  {{
                    getCommunity(item.reporter_Id).names +
                      ' ' +
                      getCommunity(item.reporter_Id).last_names
                  }}
                </p>
              </div>
              <div class="buttons">
                <app-filled-button
                  texto="Asignar brigadista"
                  (click)="openModal(item)"
                />
              </div>
            </section>
          } @empty {
            <p>Sin novedades</p>
          }
        </div>
      </div>
    </section>
    <!--  Modal para asignar un brigadista disponible  -->
    @if (isModal) {
      <div class="modal-overlay" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="scroll_container">
          <!-- Botones de paginación -->
          <h1 class="roboto-regular">Brigadistas activos</h1>
          <div class="pagination-controls roboto-regular">
            <app-filled-button
              (click)="previousPage()"
              [disabled]="currentPage === 1"
              texto="Anterior"
            />
            <p>Pagina {{ currentPage }}/{{ totalPages }}</p>
            <app-filled-button
              (click)="nextPage()"
              [disabled]="currentPage * itemsPerPage >= items.length"
              texto="Siguiente"
            />
            <p>Elementos por página</p>
            <select
              id="itemsPerPageSelect"
              [(ngModel)]="itemsPerPage"
              (change)="onItemsPerPageChange(itemsPerPage)"
            >
              <option
                *ngFor="let option of itemsPerPageOptions"
                [value]="option"
              >
                {{ option }}
              </option>
            </select>
            <p>
              Total de registros: <b>{{ totalRegister }}</b>
            </p>
          </div>

          <!-- Lista de brigadistas disponibles -->
          <div class="scroll_table">
            <table>
              <thead>
                <tr class="roboto-regular">
                  <td class="start"><h4>Nombres</h4></td>
                  <td><h4>Apellidos</h4></td>
                  <td><h4>Numero de teléfono</h4></td>
                  <td><h4>Cuadrante</h4></td>
                  <td class="end"><h4>Acciones</h4></td>
                </tr>
              </thead>
              <tbody class="roboto-regular">
                @for (item of paginated; track item.id) {
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
                        <app-filled-button-2
                          texto="Asignar Brigadista"
                          (click)="assignBrigadier(item)"
                        />
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <p>Sin brigadistas activos</p>
                }
              </tbody>
            </table>
          </div>
        </div>
        <div class="buttons_footer">
          <app-filled-button texto="Cerrar" (click)="closeModal()" />
        </div>
      </div>
    }
  `,
  styles: `
    .header_info {
      padding-left: 20px;
      p {
        margin: 0;
      }
    }

    #content {
      width: 100%;

      .list {
        width: 100%;
        overflow-x: auto;
        scroll-behavior: smooth;
      }
    }

    /* Diseño del slider */
    .body {
      display: flex;
      flex-direction: row;
      padding: 20px;
      gap: 30px;
      width: max-content;

      .cards {
        min-width: 200px;
        background: var(--md-sys-color-primary-container);
        padding: 20px 20px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        gap: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);

        .box_info {
          h5 {
            margin: 0;
          }
          p {
            margin: 0;
            padding-top: 5px;
          }
        }

        .buttons {
          display: flex;
          justify-content: center;
        }
      }
    }

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
          width: max-content;
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
      justify-content: space-between;
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
export class TableAphsHelpComponent {
  listCases: CaseModel[] = [];
  listAph: AphModel[] = [];
  listCommunity: CommunityModel[] = [];

  constructor(
    protected listCasesNeedAph: ListCasesNeedAph, // lista con los aph que necesitan un brigadista
    private casesService: CasesService,
    private aphService: AphService,
    private communityUpbService: CommunityUpbService,
    private brigadierService: BrigadierService,
    private webSocketService: WebSocketService,
  ) {
    // Consultamos a la base de datos para que no se quede ningún aph sin ayuda
    if (this.listCasesNeedAph.lengthCase() == 0) {
      // Consultamos en la base de datos
      this.fillList();
    } else {
      // Llenamos las listas locales
      this.fillListLocal();
    }
  }

  // lLenar la lista de los casos
  fillList() {
    console.log('Inicio el llenado de los casos que necesitan brigadista');
    // Obtenemos los casos que necesitan un aph
    this.casesService.getCasesNeedHelp().subscribe((value) => {
      this.listCasesNeedAph.fillCase(value);

      // Realizamos la extraccion de los datos necesarios
      // lista de ids Aph
      const listAphId: string[] = [];
      value.forEach((item) => {
        listAphId.push(item.aphThatTakeCare_Id);
      });

      // lista de ids Community
      const listCommunityId: string[] = [];
      value.forEach((item) => {
        listCommunityId.push(item.reporter_Id);
      });

      // Realizamos la consulta de los aph
      this.aphService.getFromList(listAphId).subscribe((value) => {
        this.listCasesNeedAph.fillAph(value);

        // Realizamos la consulta de los usuarios comunidad
        this.communityUpbService
          .getFromList(listCommunityId)
          .subscribe((value) => {
            this.listCasesNeedAph.fillCommunity(value);

            // LLenar listas locales
            this.fillListLocal();
          });
      });
    });
  }

  fillListLocal() {
    this.listCases = this.listCasesNeedAph.getCase();
    this.listAph = this.listCasesNeedAph.getAph();
    this.listCommunity = this.listCasesNeedAph.getCommunity();
  }

  // Buscar un item por Id de las listas locales
  getCase(id: string) {
    return this.listCasesNeedAph.findCaseById(id);
  }

  getAph(id: string) {
    return this.listCasesNeedAph.findAphById(id);
  }

  getCommunity(id: string) {
    return this.listCasesNeedAph.findCommunityById(id);
  }

  // Modal para asignar un brigadista a un caso
  isModal = false; // Variable de cambio para el modal

  // Configuraciones para la lista del modal
  items: BrigadierModel[] = [];
  caseItem: CaseModel = new CaseModel();

  currentPage = 1; // Página actual
  itemsPerPage = 10; // Número de elementos por página
  paginated: BrigadierModel[] = []; // Reportes de la página actual
  itemsPerPageOptions = [10, 20, 50]; // Opciones de elementos por página

  openModal(caseItem: CaseModel) {
    // Llenar la lista con los brigadistas que no tienen asignado un caso
    this.fillDateModal();
    this.caseItem = caseItem;

    // Cambiamos el estado del modal
    this.isModal = true;
  }

  closeModal() {
    this.isModal = false;
  }

  fillDateModal(): void {
    // Obtenemos los brigadistas que están asignados a un caso
    this.casesService.getIdBrigadeAssignedCase().subscribe((value) => {
      // Obtenemos los brigadistas conectados
      this.casesService.getAllConnections().subscribe((data) => {
        let listBrigades = data.filter(
          (value1) => value1.partition_key == 'brigade_accounts',
        );
        console.log('Brigadistas conectados', listBrigades);

        // Eliminamos los brigadistas asignados de la lista de conectados
        value.forEach((item) => {
          listBrigades = listBrigades.filter(
            (value2) => value2.id != item.brigadista_Id,
          );
        });

        // Sacamos la lista de solo ids
        let listIdsBrigade: string[] = [];
        listBrigades.forEach((item) => {
          listIdsBrigade.push(item.id);
        });
        console.log('Lista final Brigadistas conectados', listIdsBrigade);

        // Buscamos los ids de la lista
        this.brigadierService
          .GetBrigadierFromList(listIdsBrigade)
          .subscribe((value) => {
            console.log('Lista de los brigadistas', value);
            let listfin = value.filter((value1) => value1.in_service);
            console.log('Lista fal de los brigadistas', listfin);
            this.items = listfin;
            this.updatePagination();
          });
      });
    });
  }

  // Llama a esta función para actualizar los elementos mostrados en la página actual
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(startIndex, endIndex, this.itemsPerPage);
    this.paginated = this.items.slice(startIndex, endIndex);
  }

  // Avanza a la página siguiente
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.items.length) {
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
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  get totalRegister() {
    return this.items.length;
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = Number.parseInt(String(newItemsPerPage));
    this.currentPage = 1; // Reinicia a la primera página al cambiar el tamaño
    this.updatePagination();
  }

  // Asignar brigadista a un caso
  assignBrigadier(item: BrigadierModel) {
    this.webSocketService.AssignBrigade({
      user_id: item.id,
      partition_key: this.caseItem.partition_key.toString(),
      case_id: this.caseItem.id,
    });

    // Eliminamos la lista
    this.listCasesNeedAph.putCase(this.caseItem.id);

    // Actualizar listas locales
    this.fillListLocal();

    // Cerrar el modal
    this.isModal = true;
  }
}
