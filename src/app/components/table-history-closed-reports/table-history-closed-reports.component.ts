import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ReportModel } from '../../models/report';
import { ReportsService } from '../../service/reports.service';
import { FullReportsService } from '../../service/full-reports.service';
import { FullReport } from '../../models/full-report';
import { AphModel } from '../../models/aph';
import { AphService } from '../../service/aph.service';

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
    <div>
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
                  <app-filled-button-2 texto="Ver mas" />
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
export class TableHistoryClosedReportsComponent implements OnInit {
  // lista temporal
  ReportesCompletos: FullReport[] = [];
  Aphs: AphModel[] = [];

  currentPage = 1; // Página actual
  itemsPerPage = 10; // Número de elementos por página
  paginatedReportes: FullReport[] = []; // Reportes de la página actual
  itemsPerPageOptions = [10, 20, 50]; // Opciones de elementos por página

  constructor(
    private fullReportsService: FullReportsService,
    private aphService: AphService,
  ) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  LlenarDatos() {
    // Consultamos los reportes completos
    this.fullReportsService.getAll().subscribe((data) => {
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
  getAph(id: string | undefined) {
    return this.Aphs.find((value) => value.id === id);
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
}
