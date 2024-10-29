import { Component } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';

@Component({
  selector: 'app-table-history-closed-reports',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <table>
      <thead>
        <tr class="roboto-regular">
          <td><h3>Fecha de incidente</h3></td>
          <td><h3>Nombre completo</h3></td>
          <td><h3>Aph asignado</h3></td>
          <td><h3>Bloque</h3></td>
          <td><h3>Descripción</h3></td>
        </tr>
      </thead>
      <tbody class="roboto-regular">
        <tr>
          <td class="text">Jaider Joham Morales Franco</td>
          <td class="text">Bloque 11</td>
          <td class="text">Me realice un corte</td>
          <td class="text">Maria perez</td>
          <td class="text">Maria perez</td>
          <td>
            <app-filled-button texto="Informe" />
          </td>
        </tr>
        <tr>
          <td class="text">Jaider Joham Morales Franco</td>
          <td class="text">Bloque 11</td>
          <td class="text">Me realice un corte</td>
          <td class="text">Maria perez</td>
          <td class="text">Maria perez</td>
          <td>
            <app-filled-button texto="Informe" />
          </td>
        </tr>
        <tr>
          <td class="text">Jaider Joham Morales Franco</td>
          <td class="text">Bloque 11</td>
          <td class="text">Me realice un corte</td>
          <td class="text">Maria perez</td>
          <td class="text">Maria perez</td>
          <td>
            <app-filled-button texto="Informe" />
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: `
    table {
      width: 100%;
      border-spacing: 0 20px;
    }

    thead {
      h3 {
        margin: 0;
        padding: 0 20px;
      }
    }

    tbody {
      border-spacing: 10px 0;

      td {
        padding: 0 20px;
      }

      .text {
        border-right: 1px solid var(--md-sys-color-on-surface);
      }
    }
  `,
})
export class TableHistoryClosedReportsComponent {}
