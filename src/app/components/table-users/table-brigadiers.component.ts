import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { BrigadierService } from '../../service/brigadier.service';
import { BrigadierModel } from '../../models/brigadier';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';
import { LoginService } from '../../service/login.service';
import {
  BloodType,
  DocumetnType,
  RelationshipWithTheUniversity,
} from '../../models/community';
import { Quadrant } from '../../models/full-report-model';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-table-brigadiers',
  standalone: true,
  imports: [
    FilledButtonComponent,
    FormsModule,
    NgForOf,
    FilledButtonComponent2,
    ReactiveFormsModule,
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
          @for (item of paginated; track item.id) {
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
                  <app-filled-button-2
                    texto="Eliminar"
                    (click)="openModalDeleteCommunity(item)"
                  />
                  <app-filled-button-2
                    texto="Actualizar"
                    (click)="openModalUpdateCommunity(item)"
                  />
                  <app-filled-button-2
                    texto="Ver"
                    (click)="openModalViewCommunity(item)"
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

    <!--Modal de confirmación para eliminar-->
    @if (statusModalDelete) {
      <div
        class="modal-overlay-delete-modal"
        (click)="closeModalDeleteCommunity()"
      >
        <div class="modal-content-delete-modal">
          <div class="container container_2">
            <div class="box roboto-regular">
              <h1 class="roboto-regular">Eliminar usuario</h1>
              <p>
                ¿Está seguro de que desea eliminar el usuario
                <b>{{ itemDeleteTemp.names }} {{ itemDeleteTemp.last_names }}</b
                >?
              </p>
              <p>Esta acción no se puede deshacer.</p>
            </div>
          </div>
          <div class="buttons_footer-delete-modal">
            <app-filled-button-2
              texto="Cancelar"
              (click)="closeModalDeleteCommunity()"
            />
            <app-filled-button texto="Aceptar" (click)="deleteBrigader()" />
          </div>
        </div>
      </div>
    }

    <!-- Modal de para actualizar -->
    @if (statusModalUpdate) {
      <div class="modal-overlay" (click)="closeModalUpdateCommunity()"></div>
      <div class="modal-content">
        <div class="scroll_container">
          <div class="container container_2">
            <div class="box roboto-regular">
              <h1 class="roboto-regular">Actualizar información</h1>
              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Nombres</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="names"
                  />
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Apellidos</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="last_names"
                  />
                </div>
              </div>

              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Correo electrónico</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="mail"
                    [formControl]="mail"
                  />
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Numero de teléfono</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="phone_number"
                  />
                </div>
              </div>

              <div class="inputs_box_doble">
                <div
                  class="inputs_box"
                  style="flex-direction: row; align-items: center; gap: 20px"
                >
                  <label for="mail" class="form-label roboto-regular"
                    >El brigadista esta en servicio</label
                  >
                  <input
                    style="width: 20px; height: 20px"
                    type="checkbox"
                    class="form-control"
                    id="mail"
                    [formControl]="in_service"
                  />
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Cuadrante asignado</label
                  >
                  <select
                    class="form-control"
                    id="relationshipWithTheUniversity"
                    [formControl]="quadrant"
                  >
                    <option [value]="Quadrant.Division_1">Cuadrante 1</option>
                    <option [value]="Quadrant.Division_2">Cuadrante 2</option>
                    <option [value]="Quadrant.Division_3">Cuadrante 3</option>
                    <option [value]="Quadrant.Division_4">Cuadrante 4</option>
                    <option [value]="Quadrant.Division_5">Cuadrante 5</option>
                    <option [value]="Quadrant.Division_6">Cuadrante 6</option>
                    <option [value]="Quadrant.Division_7">Cuadrante 7</option>
                  </select>
                </div>
              </div>

              <div class="inputs_box">
                <label for="mail" class="form-label roboto-regular"
                  >Relación con la universidad</label
                >
                <select
                  class="form-control"
                  id="relationshipWithTheUniversity"
                  [formControl]="relationshipWithTheUniversity"
                >
                  <option [value]="RelationshipWithTheUniversity.universitary">
                    Universitario
                  </option>
                  <option [value]="RelationshipWithTheUniversity.estudent">
                    Estudiante
                  </option>
                  <option [value]="RelationshipWithTheUniversity.professor">
                    Profesor
                  </option>
                  <option [value]="RelationshipWithTheUniversity.visitor">
                    Visitante
                  </option>
                </select>
              </div>

              <h1 class="roboto-regular">Detalles del usuario</h1>

              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Id universitario</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="idUniversity"
                  />
                </div>

                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Tipo de documento</label
                  >
                  <select
                    class="form-control"
                    id="relationshipWithTheUniversity"
                    [formControl]="documentType"
                  >
                    <option [value]="DocumetnType.CedulaDeCiudadania">
                      Cédula de ciudadanía
                    </option>
                    <option [value]="DocumetnType.TarjetDeIdentidad">
                      Tarjeta de identidad
                    </option>
                    <option [value]="DocumetnType.CedulaDeExtranjeria">
                      Cédula de extranjería
                    </option>
                  </select>
                </div>
              </div>

              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Número de documento</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="documentNumber"
                  />
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Dirección de residencia</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="address"
                  />
                </div>
              </div>

              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Número de teléfono para contacto de emergencia</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="emergencyContactPhoneNumber"
                  />
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Fecha de nacimiento</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    id="mail"
                    [formControl]="birthday"
                  />
                </div>
              </div>

              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Tipo de sangre</label
                  >
                  <select
                    class="form-control"
                    id="relationshipWithTheUniversity"
                    [formControl]="bloodType"
                  >
                    <option [value]="BloodType.A_POS">A+</option>
                    <option [value]="BloodType.O_POS">O+</option>
                    <option [value]="BloodType.B_POS">B+</option>
                    <option [value]="BloodType.AB_POS">AB+</option>
                    <option [value]="BloodType.A_NEG">A-</option>
                    <option [value]="BloodType.O_NEG">O-</option>
                    <option [value]="BloodType.B_NEG">B-</option>
                    <option [value]="BloodType.AB_NEG">AB-</option>
                  </select>
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Alergias</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="allergies"
                  />
                </div>
              </div>

              <div class="inputs_box_doble">
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Dependencia de medicamentos</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="dependentMedications"
                  />
                </div>
                <div class="inputs_box">
                  <label for="mail" class="form-label roboto-regular"
                    >Discapacidad</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    [formControl]="disabilities"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons_footer">
          <app-filled-button-2
            texto="Cerrar"
            (click)="closeModalUpdateCommunity()"
          />
          <app-filled-button
            texto="Actualizar datos"
            (click)="updateCommunity()"
          />
        </div>
      </div>
    }

    <!-- Modal de para actualizar -->
    @if (statusModalView) {
      <div class="modal-overlay" (click)="closeModalViewCommunity()"></div>
      <div class="modal-content">
        <div class="scroll_container">
          <div class="container container_2">
            <div class="box roboto-regular">
              <h1 class="roboto-regular">Información del usuario</h1>
              <div class="box_info">
                <h5>Nombres</h5>
                <p>{{ itemCommunityView.names }}</p>
              </div>

              <div class="box_info">
                <h5>Apellidos</h5>
                <p>{{ itemCommunityView.last_names }}</p>
              </div>

              <div class="box_info">
                <h5>Correo electrónico</h5>
                <p>{{ itemCommunityView.mail }}</p>
              </div>

              <div class="box_info">
                <h5>Numero de teléfono</h5>
                <p>{{ itemCommunityView.phone_number }}</p>
              </div>

              <div class="box_info">
                <h5>Relación con la universidad</h5>
                <p>{{ itemCommunityView.relationshipWithTheUniversity }}</p>
              </div>

              <div class="box_info">
                <h5>Cuadrante</h5>
                <p>{{ itemCommunityView.quadrant }}</p>
              </div>

              <div class="box_info">
                <h5>Brigadista se encuentra en servicio</h5>
                <p>{{ itemCommunityView.in_service }}</p>
              </div>

              <h2 class="roboto-regular">Detalles del usuario</h2>

              <div class="box_info">
                <h5>Id universitario</h5>
                <p>{{ itemCommunityView.userDetails.idUniversity }}</p>
              </div>

              <div class="box_info">
                <h5>Tipo de documento</h5>
                <p>{{ itemCommunityView.userDetails.documentType }}</p>
              </div>
              <div class="box_info">
                <h5>Número de documento</h5>
                <p>{{ itemCommunityView.userDetails.documentNumber }}</p>
              </div>
              <div class="box_info">
                <h5>Dirección de residencia</h5>
                <p>{{ itemCommunityView.userDetails.address }}</p>
              </div>
              <div class="box_info">
                <h5>Número de teléfono para contacto de emergencia</h5>
                <p>
                  {{
                    itemCommunityView.userDetails.emergencyContactPhoneNumber
                  }}
                </p>
              </div>
              <div class="box_info">
                <h5>Fecha de nacimiento</h5>
                <p>{{ itemCommunityView.userDetails.birthday }}</p>
              </div>
              <div class="box_info">
                <h5>Tipo de sangre</h5>
                <p>{{ itemCommunityView.userDetails.bloodType }}</p>
              </div>
              <div class="box_info">
                <h5>Alergias</h5>
                <p>{{ itemCommunityView.userDetails.allergies }}</p>
              </div>
              <div class="box_info">
                <h5>Dependencia de medicamentos</h5>
                <p>{{ itemCommunityView.userDetails.dependentMedications }}</p>
              </div>
              <div class="box_info">
                <h5>Discapacidad</h5>
                <p>{{ itemCommunityView.userDetails.disabilities }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons_footer">
          <app-filled-button-2
            texto="Cerrar"
            (click)="closeModalViewCommunity()"
          />
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

    .modal-overlay-delete-modal {
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

    .modal-content-delete-modal {
      max-width: 60%;
      background: white;
      padding: 30px;
      border-radius: 8px;
      position: relative;
    }

    .buttons_footer-delete-modal {
      display: flex;
      flex-direction: row;
      margin-top: 45px;
      gap: 30px;
      justify-content: center;
    }

    /* Estilos para el modal de actualizar */
    .box {
      .inputs_box_doble {
        display: flex;
        flex-direction: row;
        gap: 40px;
      }
    }

    .inputs_box {
      width: 300px;
      display: flex;
      flex-direction: column;

      input,
      select {
        background: var(--md-sys-color-surface);
        border: 2px solid var(--md-sys-color-primary);
        border-radius: 8px;

        padding: 10px 10px;
        margin-top: 5px;
        font-family: 'Roboto', sans-serif;
        font-size: medium;
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
        gap: 15px;

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
        display: flex;
        flex-direction: column;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 30px;
        color: var(--md-sys-color-on-surface);
      }

      .buttons_footer {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        gap: 30px;
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

  constructor(
    private brigadierService: BrigadierService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  LlenarDatos(): void {
    this.brigadierService.getAll().subscribe((data) => {
      this.items = data.map((value: BrigadierModel) =>
        plainToClass(BrigadierModel, value),
      );
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

  // Modal para eliminar uno de la comunidad
  statusModalDelete = false;
  itemDeleteTemp = new BrigadierModel();

  // Eliminar un usuario
  openModalDeleteCommunity(item: BrigadierModel) {
    this.statusModalDelete = true;
    this.itemDeleteTemp = item;
  }

  deleteBrigader() {
    this.loginService
      .deleteCuenta(this.itemDeleteTemp.mail)
      .subscribe((value) => {
        console.log('Resultado de eliminar la cuenta', value);
        if (value) {
          // se elimino la cuenta
          if (value) {
            // Eliminamos el usuario
            this.brigadierService
              .deleteById(this.itemDeleteTemp.id)
              .subscribe((value) => {
                this.closeModalDeleteCommunity();
                this.LlenarDatos();
              });
          } else {
            window.alert('No es posible eliminar el usuario');
          }
        } else {
          window.alert('Usuario sin cuenta');
        }
      });
  }

  closeModalDeleteCommunity() {
    this.statusModalDelete = false;
  }

  // Modal para actualizar uno de la comunidad
  statusModalUpdate = false;
  itemCommunityUpdate = new BrigadierModel();

  // Datos del formulario
  names = new FormControl('');
  last_names = new FormControl('');
  mail = new FormControl({ value: '', disabled: true });
  phone_number = new FormControl('');
  relationshipWithTheUniversity = new FormControl('');
  in_service = new FormControl<boolean>(false);
  quadrant = new FormControl('');

  // Detalles del usuario
  idUniversity = new FormControl('');
  documentType = new FormControl('');
  documentNumber = new FormControl('');
  address = new FormControl('');
  emergencyContactPhoneNumber = new FormControl('');
  birthday = new FormControl('');
  bloodType = new FormControl('');
  allergies = new FormControl('');
  dependentMedications = new FormControl('');
  disabilities = new FormControl('');

  // Eliminar un usuario
  openModalUpdateCommunity(item: BrigadierModel) {
    this.itemCommunityUpdate = item;

    console.log('Usuario que vamos a actualizar', item);
    console.log('pruebas de datos', item.userDetails.documentNumber);
    console.log('pruebas de datos', item.userDetails.documentNumber as unknown);
    console.log(
      'pruebas de datos',
      item.userDetails.documentNumber == undefined,
    );

    this.names.setValue(item.names ? item.names : '');
    this.last_names.setValue(item.last_names ? item.last_names : '');
    this.mail.setValue(item.mail ? item.mail : '');
    this.phone_number.setValue(
      item.phone_number ? item.phone_number.toString() : '',
    );
    this.relationshipWithTheUniversity.setValue(
      item.relationshipWithTheUniversity,
    );

    console.log('Estado de servicio del brigadista');
    this.in_service.setValue(item.in_service);

    this.quadrant.setValue(item.quadrant);

    // Detalles del usuario
    this.idUniversity.setValue(
      (item.userDetails.idUniversity as unknown)
        ? item.userDetails.idUniversity.toString()
        : '',
    );
    this.documentType.setValue(item.userDetails.documentType);
    this.documentNumber.setValue(
      item.userDetails.documentNumber
        ? item.userDetails.documentNumber.toString()
        : '',
    );
    this.address.setValue(
      item.userDetails.address ? item.userDetails.address : '',
    );
    this.emergencyContactPhoneNumber.setValue(
      item.userDetails.emergencyContactPhoneNumber
        ? item.userDetails.emergencyContactPhoneNumber.toString()
        : '',
    );
    this.birthday.setValue(
      item.userDetails.birthday ? item.userDetails.birthday : '',
    );
    this.bloodType.setValue(item.userDetails.bloodType);
    this.allergies.setValue(
      item.userDetails.allergies ? item.userDetails.allergies : '',
    );
    this.dependentMedications.setValue(
      item.userDetails.dependentMedications
        ? item.userDetails.dependentMedications
        : '',
    );
    this.disabilities.setValue(
      item.userDetails.disabilities ? item.userDetails.disabilities : '',
    );

    // abrir el modal
    this.statusModalUpdate = true;
  }

  updateCommunity() {
    // item actualizado
    let item: BrigadierModel = new BrigadierModel();

    // Asignar los datos del form
    item.id = this.itemCommunityUpdate.id;
    item.partition_key = this.itemCommunityUpdate.partition_key;
    item.names = typeof this.names.value === 'string' ? this.names.value : '';
    item.last_names =
      typeof this.last_names?.value === 'string' ? this.last_names.value : '';
    item.mail = typeof this.mail?.value === 'string' ? this.mail.value : '';
    item.phone_number =
      typeof this.phone_number?.value === 'string'
        ? this.phone_number.value
        : '';
    item.relationshipWithTheUniversity = this.relationshipWithTheUniversity
      .value as unknown as RelationshipWithTheUniversity;
    item.in_service = this.in_service.value == true;

    item.quadrant = this.quadrant.value as unknown as Quadrant;

    item.userDetails.idUniversity =
      typeof this.idUniversity?.value === 'string'
        ? this.idUniversity.value
        : '';
    item.userDetails.documentType = this.documentType
      .value as unknown as DocumetnType;
    item.userDetails.documentNumber =
      typeof this.documentNumber?.value === 'string'
        ? this.documentNumber.value
        : '';
    item.userDetails.address =
      typeof this.address?.value === 'string' ? this.address.value : '';
    item.userDetails.emergencyContactPhoneNumber =
      typeof this.emergencyContactPhoneNumber?.value === 'string'
        ? this.emergencyContactPhoneNumber.value
        : '';
    item.userDetails.birthday =
      typeof this.birthday?.value === 'string' ? this.birthday.value : '';
    item.userDetails.bloodType = this.bloodType.value as unknown as BloodType;
    item.userDetails.allergies =
      typeof this.allergies?.value === 'string' ? this.allergies.value : '';
    item.userDetails.dependentMedications =
      typeof this.dependentMedications?.value === 'string'
        ? this.dependentMedications.value
        : '';
    item.userDetails.disabilities =
      typeof this.disabilities?.value === 'string'
        ? this.disabilities.value
        : '';

    // Inprimimos el usuario actualizado
    console.log('Enprimir el usuario de la communidad actualizado', item);
    console.log(
      'typeof this.phone_number?.value',
      typeof this.idUniversity?.value,
    );

    // Enviamos el usuario con cambios
    this.brigadierService.putById(item).subscribe((value) => {
      // cerrar el modal
      this.closeModalUpdateCommunity();
      this.LlenarDatos();
    });
  }

  closeModalUpdateCommunity() {
    this.statusModalUpdate = false;
  }

  // Modal para visualizar los datos

  statusModalView = false;
  itemCommunityView = new BrigadierModel();

  openModalViewCommunity(item: BrigadierModel) {
    // Modal para actualizar uno de la comunidad
    this.itemCommunityView = item;
    this.statusModalView = true;
  }

  closeModalViewCommunity() {
    this.statusModalView = false;
  }

  protected readonly RelationshipWithTheUniversity =
    RelationshipWithTheUniversity;
  protected readonly DocumetnType = DocumetnType;
  protected readonly BloodType = BloodType;
  protected readonly Quadrant = Quadrant;
}
