import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { BrigadierService } from '../../service/brigadier.service';
import { BrigadierModel } from '../../models/brigadier';
import { AphModel } from '../../models/aph';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';

@Component({
  selector: 'app-table-brigadiers',
  standalone: true,
  imports: [
    FilledButtonComponent,
    FormsModule,
    NgForOf,
    FilledButtonComponent2,
  ],
  template: `
    <!-- Botones de paginación -->
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
        <option *ngFor="let option of itemsPerPageOptions" [value]="option">
          {{ option }}
        </option>
      </select>
      <p>
        Total de registros: <b>{{ totalRegister }}</b>
      </p>
    </div>

    <!-- Lista de usuarios -->
    <div class="scroll_table">
      <table>
        <thead>
          <tr class="roboto-regular">
            <td class="start"><h4>Nombres</h4></td>
            <td><h4>Apellidos</h4></td>
            <td><h4>Correo electrónico</h4></td>
            <td><h4>Numero de teléfono</h4></td>
            <td><h4>Cuadrante</h4></td>
            <td class="end"><h4>Acciones</h4></td>
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
                <p>{{ item.mail }}</p>
              </td>
              <td class="text">
                <p>{{ item.phone_number }}</p>
              </td>
              <td class="text">
                <p>{{ item.quadrant }}</p>
              </td>
              <td>
                <div class="buttons">
                  <app-filled-button-2 texto="Eliminar" />
                  <app-filled-button-2 texto="Actualizar" />
                  <app-filled-button-2 texto="Ver" />
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
export class TableBrigadiersComponent implements OnInit {
  items: BrigadierModel[] = [];

  currentPage = 1; // Página actual
  itemsPerPage = 10; // Número de elementos por página
  paginated: BrigadierModel[] = []; // Reportes de la página actual
  itemsPerPageOptions = [10, 20, 50]; // Opciones de elementos por página

  constructor(private brigadierService: BrigadierService) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  LlenarDatos(): void {
    this.brigadierService.getAll().subscribe((data) => {
      this.items = data;
      this.Ordenar();
      this.updatePagination();
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

  Ordenar() {
    this.items.sort((a, b) => b._ts - a._ts);
  }
}
