export class CommunityModel {
  public id: string = '';
  public partition_key: string = '';
  public names: string = '';
  public last_names: string = '';
  public mail: string = '';
  public phone_number: string = '';
  public relationshipWithTheUniversity: RelationshipWithTheUniversity = 0;
  public userDetails = new UserDetails();
  public _ts: number = 0;
}

class UserDetails {
  public idUniversity: number = 0;
  public documetnType: DocumetnType = 0;
  public documentNumber: string = '';
  public address: string = '';
  public emergencyContactPhoneNumber: number = 0;
  public birthday: string = '';
  public bloodType: BloodType = BloodType.A_POS;
  public allergies: string = '';
  public dependentMedications: string = '';
  public disabilities: string = '';
}
export enum RelationshipWithTheUniversity {
  universitary,
  estudent,
  professor,
  visitor,
}

enum DocumetnType {
  CedulaDeCiudadania,
  TarjetDeIdentidad,
  CedulaDeExtranjeria,
}

enum BloodType {
  A_POS = 'A+',
  O_POS = 'O+',
  B_POS = 'B+',
  AB_POS = 'AB+',
  A_NEG = 'A-',
  O_NEG = 'O-',
  B_NEG = 'B-',
  AB_NEG = 'AB-',
}
