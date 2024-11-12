import { RelationshipWithTheUniversity, UserDetails } from './community';
import { Quadrant } from './full-report-model';

export class BrigadierModel {
  public partition_key: string = '';
  public id: string = '';
  public names: string = '';
  public last_names: string = '';
  public mail: string = '';
  public phone_number: string = '';
  public relationshipWithTheUniversity: RelationshipWithTheUniversity =
    RelationshipWithTheUniversity.estudent;
  public in_service: boolean = false;
  public quadrant: Quadrant = Quadrant.Division_1;
  public userDetails: UserDetails = new UserDetails();
  public _ts: number = 0;
}

export class BrigadierModelCreateDto {
  public names: string = '';
  public last_names: string = '';
  public mail: string = '';
  public phone_number: string = '';
  public relationshipWithTheUniversity: RelationshipWithTheUniversity =
    RelationshipWithTheUniversity.estudent;
  public in_service: boolean = false;
  public quadrant: Quadrant = Quadrant.Division_1;
  public userDetails: UserDetails = new UserDetails();
  public _ts: number = 0;
}
