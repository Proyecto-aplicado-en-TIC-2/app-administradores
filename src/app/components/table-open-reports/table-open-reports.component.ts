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
    <div>
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
                    getAph(getCase(item.id)?.aphThatTakeCare_Id)?.names +
                      ' ' +
                      getAph(getCase(item.id)?.aphThatTakeCare_Id)?.last_names
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
                  <app-filled-button-2 texto="Mas" />
                </div>
              </td>
            </tr>
          } @empty {
            <p>Cargando datos</p>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    div {
      overflow-x: auto;
      color: var(--md-sys-color-on-surface);
    }

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

  getCase(id: string) {
    return this.Casos.find((value) => value.id === id);
  }

  getAph(id: string | undefined) {
    return this.Aphs.find((value) => value.id === id);
  }

  protected readonly Cases = Cases;
  protected readonly Math = Math;
}
