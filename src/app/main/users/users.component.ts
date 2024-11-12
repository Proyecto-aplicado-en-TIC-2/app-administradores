import { Component } from '@angular/core';
import { FilledButtonComponent } from '../../components/filled-button/filled-button.component';
import { TableAphComponent } from '../../components/table-users/table-aph.component';
import { TableBrigadiersComponent } from '../../components/table-users/table-brigadiers.component';
import { TableUpbCommunityComponent } from '../../components/table-users/table-upb-community.component';
import { FilledButtonComponent2 } from '../../components/filled-button/filled-button-2.component';
import {
  BloodType, CommunityModelCreateDto,
  DocumetnType,
  RelationshipWithTheUniversity,
} from '../../models/community';
import { Quadrant } from '../../models/full-report-model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoginService} from "../../service/login.service";
import {iterator} from "rxjs/internal/symbol/iterator";
import {AphModel, AphModelCreateDto} from "../../models/aph";
import {BrigadierModelCreateDto} from "../../models/brigadier";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FilledButtonComponent,
    TableAphComponent,
    TableBrigadiersComponent,
    TableUpbCommunityComponent,
    FilledButtonComponent2,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {

  constructor(private loginService : LoginService) {
  }

  // Variables para deshabilitar botones
  disabledAph: boolean = false;
  disabledBrigade: boolean = false;
  disableCommunity: boolean = false;

  // Variables para los modales
  modalAph: boolean = false;
  modalBrigade: boolean = false;
  modalCommunity: boolean = false;

  // Modal para crear un aph

  // Datos del formulario
  namesAph = new FormControl('');
  last_namesAph = new FormControl('');
  mailAph = new FormControl('');
  passwordAph = new FormControl('');
  phone_numberAph = new FormControl('');
  relationshipWithTheUniversityAph = new FormControl('');
  in_serviceAph = new FormControl<boolean>(false);
  quadrantAph = new FormControl('');

  // Detalles del usuario
  idUniversityAph = new FormControl('');
  documentTypeAph = new FormControl('');
  documentNumberAph = new FormControl('');
  addressAph = new FormControl('');
  emergencyContactPhoneNumberAph = new FormControl('');
  birthdayAph = new FormControl('');
  bloodTypeAph = new FormControl('');
  allergiesAph = new FormControl('');
  dependentMedicationsAph = new FormControl('');
  disabilitiesAph = new FormControl('');

  openModalAph() {
    this.modalAph = true;
    this.disabledBrigade = true;
    this.disableCommunity = true;
  }

  closeModalAph() {
    this.modalAph = false;
    this.disabledBrigade = false;
    this.disableCommunity = false;
  }

  createAph() {

    let item: AphModelCreateDto = new AphModelCreateDto();

    let password = this.passwordAph.value;

    // Asignar los datos del form
    item.names = typeof this.namesAph.value === 'string' ? this.namesAph.value : '';
    item.last_names =
      typeof this.last_namesAph?.value === 'string' ? this.last_namesAph.value : '';
    item.mail = typeof this.mailAph?.value === 'string' ? this.mailAph.value : '';
    item.phone_number =
      typeof this.phone_numberAph?.value === 'string'
        ? this.phone_numberAph.value
        : '';
    item.relationshipWithTheUniversity = this.relationshipWithTheUniversityAph
      .value as unknown as RelationshipWithTheUniversity;
    item.in_service = this.in_serviceAph.value == true;

    item.quadrant = this.quadrantAph.value as unknown as Quadrant;

    item.userDetails.idUniversity =
      typeof this.idUniversityAph?.value === 'string'
        ? this.idUniversityAph.value
        : '';
    item.userDetails.documentType = this.documentTypeAph
      .value as unknown as DocumetnType;
    item.userDetails.documentNumber =
      typeof this.documentNumberAph?.value === 'string'
        ? this.documentNumberAph.value
        : '';
    item.userDetails.address =
      typeof this.addressAph?.value === 'string' ? this.addressAph.value : '';
    item.userDetails.emergencyContactPhoneNumber =
      typeof this.emergencyContactPhoneNumberAph?.value === 'string'
        ? this.emergencyContactPhoneNumberAph.value
        : '';
    item.userDetails.birthday =
      typeof this.birthdayAph?.value === 'string' ? this.birthdayAph.value : '';
    item.userDetails.bloodType = this.bloodTypeAph.value as unknown as BloodType;
    item.userDetails.allergies =
      typeof this.allergiesAph?.value === 'string' ? this.allergiesAph.value : '';
    item.userDetails.dependentMedications =
      typeof this.dependentMedicationsAph?.value === 'string'
        ? this.dependentMedicationsAph.value
        : '';
    item.userDetails.disabilities =
      typeof this.disabilitiesAph?.value === 'string'
        ? this.disabilitiesAph.value
        : '';

    console.log('Datos del aph a crear',item)
    console.log('Datos del aph a crear contraseña',typeof this.passwordAph.value)
    console.log('Datos del aph a crear contraseña',this.passwordAph.value)

    // Llamar el servicio de auth
    this.loginService.createAph(password ,item).subscribe(value => {
      window.alert('Usuario creado')
      window.location.reload();
    })
    this.closeModalAph();
  }

  // Modal para crear un brigadista

  openModalBrigade() {
    this.modalBrigade = true;
    this.disabledAph = true;
    this.disableCommunity = true;
  }

  closeModalBrigade() {
    this.modalBrigade = false;
    this.disabledAph = false;
    this.disableCommunity = false;
  }

  createBrigade() {

    let item: BrigadierModelCreateDto = new BrigadierModelCreateDto();

    let password = this.passwordAph.value;

    // Asignar los datos del form
    item.names = typeof this.namesAph.value === 'string' ? this.namesAph.value : '';
    item.last_names =
      typeof this.last_namesAph?.value === 'string' ? this.last_namesAph.value : '';
    item.mail = typeof this.mailAph?.value === 'string' ? this.mailAph.value : '';
    item.phone_number =
      typeof this.phone_numberAph?.value === 'string'
        ? this.phone_numberAph.value
        : '';
    item.relationshipWithTheUniversity = this.relationshipWithTheUniversityAph
      .value as unknown as RelationshipWithTheUniversity;
    item.in_service = this.in_serviceAph.value == true;

    item.quadrant = this.quadrantAph.value as unknown as Quadrant;

    item.userDetails.idUniversity =
      typeof this.idUniversityAph?.value === 'string'
        ? this.idUniversityAph.value
        : '';
    item.userDetails.documentType = this.documentTypeAph
      .value as unknown as DocumetnType;
    item.userDetails.documentNumber =
      typeof this.documentNumberAph?.value === 'string'
        ? this.documentNumberAph.value
        : '';
    item.userDetails.address =
      typeof this.addressAph?.value === 'string' ? this.addressAph.value : '';
    item.userDetails.emergencyContactPhoneNumber =
      typeof this.emergencyContactPhoneNumberAph?.value === 'string'
        ? this.emergencyContactPhoneNumberAph.value
        : '';
    item.userDetails.birthday =
      typeof this.birthdayAph?.value === 'string' ? this.birthdayAph.value : '';
    item.userDetails.bloodType = this.bloodTypeAph.value as unknown as BloodType;
    item.userDetails.allergies =
      typeof this.allergiesAph?.value === 'string' ? this.allergiesAph.value : '';
    item.userDetails.dependentMedications =
      typeof this.dependentMedicationsAph?.value === 'string'
        ? this.dependentMedicationsAph.value
        : '';
    item.userDetails.disabilities =
      typeof this.disabilitiesAph?.value === 'string'
        ? this.disabilitiesAph.value
        : '';

    // Llamar el servicio de auth
    this.loginService.createBrigade(password ,item).subscribe(value => {
      window.alert('Usuario creado')
      window.location.reload();
    })
    this.closeModalBrigade();
  }

  // Modal para crear un usuario de la comunidad

  openModalCommunity() {
    this.modalCommunity = true;
    this.disabledAph = true;
    this.disabledBrigade = true;
  }

  closeModalCommunity() {
    this.modalCommunity = false;
    this.disabledAph = false;
    this.disabledBrigade = false;
  }

  createCommunity() {
    let item: CommunityModelCreateDto = new CommunityModelCreateDto();

    let password = this.passwordAph.value;

    // Asignar los datos del form
    item.names = typeof this.namesAph.value === 'string' ? this.namesAph.value : '';
    item.last_names =
      typeof this.last_namesAph?.value === 'string' ? this.last_namesAph.value : '';
    item.mail = typeof this.mailAph?.value === 'string' ? this.mailAph.value : '';
    item.phone_number =
      typeof this.phone_numberAph?.value === 'string'
        ? this.phone_numberAph.value
        : '';
    item.relationshipWithTheUniversity = this.relationshipWithTheUniversityAph
      .value as unknown as RelationshipWithTheUniversity;

    item.userDetails.idUniversity =
      typeof this.idUniversityAph?.value === 'string'
        ? this.idUniversityAph.value
        : '';
    item.userDetails.documentType = this.documentTypeAph
      .value as unknown as DocumetnType;
    item.userDetails.documentNumber =
      typeof this.documentNumberAph?.value === 'string'
        ? this.documentNumberAph.value
        : '';
    item.userDetails.address =
      typeof this.addressAph?.value === 'string' ? this.addressAph.value : '';
    item.userDetails.emergencyContactPhoneNumber =
      typeof this.emergencyContactPhoneNumberAph?.value === 'string'
        ? this.emergencyContactPhoneNumberAph.value
        : '';
    item.userDetails.birthday =
      typeof this.birthdayAph?.value === 'string' ? this.birthdayAph.value : '';
    item.userDetails.bloodType = this.bloodTypeAph.value as unknown as BloodType;
    item.userDetails.allergies =
      typeof this.allergiesAph?.value === 'string' ? this.allergiesAph.value : '';
    item.userDetails.dependentMedications =
      typeof this.dependentMedicationsAph?.value === 'string'
        ? this.dependentMedicationsAph.value
        : '';
    item.userDetails.disabilities =
      typeof this.disabilitiesAph?.value === 'string'
        ? this.disabilitiesAph.value
        : '';

    // Llamar el servicio de auth
    this.loginService.createCommunity(password ,item).subscribe(value => {
      window.alert('Usuario creado')
      window.location.reload();
    })
    this.closeModalCommunity();
  }

  protected readonly BloodType = BloodType;
  protected readonly RelationshipWithTheUniversity =
    RelationshipWithTheUniversity;
  protected readonly DocumetnType = DocumetnType;
  protected readonly Quadrant = Quadrant;
}
