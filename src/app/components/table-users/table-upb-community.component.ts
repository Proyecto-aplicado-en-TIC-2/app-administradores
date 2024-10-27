import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { IUpbCommunity } from '../../interface/upb-community.interface';
import { UpbCommunityService } from '../../service/upb-community.service';

@Component({
  selector: 'app-table-upb-community',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <div>
      <table>
        <thead>
          <tr class="roboto-regular">
            <td><h4>Nombres</h4></td>
            <td><h4>Apellidos</h4></td>
            <td><h4>Correo electrónico</h4></td>
            <td><h4>Numero de teléfono</h4></td>
            <td><h4>Relación con la universidad</h4></td>
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
                <p>{{ item.relationship_with_the_university }}</p>
              </td>
              <td>
                <div class="buttons">
                  <app-filled-button texto="Eliminar" />
                  <app-filled-button texto="Actualizar" />
                  <app-filled-button texto="Ver" />
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
  `,
})
export class TableUpbCommunityComponent implements OnInit {
  items: IUpbCommunity[] = [];

  constructor(private upbCommunityService: UpbCommunityService) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  LlenarDatos(): void {
    this.upbCommunityService.getAll().subscribe((data) => {
      this.items = data;
    });
  }
}
