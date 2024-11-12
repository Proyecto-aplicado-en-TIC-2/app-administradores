export class CommunityModel {
  public id: string = '';
  public partition_key: string = '';
  public names: string = '';
  public last_names: string = '';
  public mail: string = '';
  public phone_number: string = '';
  public relationshipWithTheUniversity: RelationshipWithTheUniversity =
    RelationshipWithTheUniversity.estudent;
  public userDetails = new UserDetails();
  public _ts: number = 0;
}

class UserDetails {
  public idUniversity: string = '';
  public documentType: DocumetnType = DocumetnType.CedulaDeCiudadania;
  public documentNumber: string = '';
  public address: string = '';
  public emergencyContactPhoneNumber: string = '';
  public birthday: string = '';
  public bloodType: BloodType = BloodType.A_POS;
  public allergies: string = '';
  public dependentMedications: string = '';
  public disabilities: string = '';
}
export enum RelationshipWithTheUniversity {
  universitary = 'universitary',
  estudent = 'estudent',
  professor = 'professor',
  visitor = 'visitor',
}

export enum DocumetnType {
  CedulaDeCiudadania = 'CedulaDeCiudadania',
  TarjetDeIdentidad = 'TarjetDeIdentidad',
  CedulaDeExtranjeria = 'CedulaDeExtranjeria',
}

export enum BloodType {
  A_POS = 'A_POS',
  O_POS = 'O_POS',
  B_POS = 'B_POS',
  AB_POS = 'AB_POS',
  A_NEG = 'A_NEG',
  O_NEG = 'O_NEG',
  B_NEG = 'B_NEG',
  AB_NEG = 'AB_NEG',
}
