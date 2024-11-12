import { RelationshipWithTheUniversity, UserDetails } from './community';

export class AphModel {
  public partition_key: string = '';
  public id: string = '';
  public names: string = '';
  public last_names: string = '';
  public mail: string = '';
  public phone_number: string = '';
  public relationshipWithTheUniversity: RelationshipWithTheUniversity =
    RelationshipWithTheUniversity.estudent;
  public in_service: boolean = false;
  public quadrant: string = '';
  public userDetails: UserDetails = new UserDetails();
  public _ts: number = 0;
}
