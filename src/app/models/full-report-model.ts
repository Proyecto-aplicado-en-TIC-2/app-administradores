import { Cases } from './case';
import { Block, RelationshipWithTheUniversity } from './report';

export class FullReportModel {
  public id: string = '';
  public partition_key: Cases = 0;
  public help: help = new help();
  public whatIsHappening: string = '';
  public affected: string = '';
  public date: date = new date();
  public location: Location = new Location();
  public reporter: reporter = new reporter();
  public aphThatTakeCare: string = '';
  public classificationAttention: string = '';
  public patient: patient = new patient();
  public contact: contact = new contact();
  public evaluation: evaluation = new evaluation();
  public attendnt: attendnt = new attendnt();
  public equipment: equipment = new equipment();
  public noteForFollowUp: FollowUp = 0;
  public _ts: number = 0;
}

// Clases ayuda

class help {
  user_id: string = '';
  case_id: string = '';
  partition_key: string = '';
}

class date {
  date: string = '';
  hourRequest: string = '';
  hourArrive: string = '';
  hourCloseAttentionn: string = '';
}

class Location {
  public quadrant: Quadrant = 0;
  public block: Block = 0;
  public classroom: string = '';
  public pointOfReference: string = '';
}

class reporter {
  names: string = '';
  lastNames: string = '';
  relationshipWithTheUniversity: RelationshipWithTheUniversity = 0;
}

class patient {
  public names: string = '';
  public lastNames: string = '';
  public typeDocument: string = '';
  public numberOfDocument: string = '';
  public gender: Gender = 0;
  public age: number = 0;
  public relationshipWithTheUniversity: RelationshipWithTheUniversity = 0;
}

class contact {
  public attentionForSecureLine: AttentionForSecureLine = 0;
  public meansOfAttention: string = '';
  public startedInformation: string = '';
}

class evaluation {
  reasonForConsultation: string = '';
  disease: string = '';
  physicalExam: string = '';
  record: string = '';
  sentTo: string = '';
  diagnosticImpression: string = '';
  treatment: string = '';
  followUp: FollowUp = 0;
}

class attendnt {
  public callHour: string = ''; // HH/MM/SS
  public callAttendntName: string = '';
}

class equipment {
  public quantity: number = 0;
  public type: EquipmentType = 0;
  public source: EquipmentSource = 0;
}

// Enums

export enum EquipmentSource {
  'Botiquin',
  'Gabinete',
  'TraumaPolideportivo',
}

export enum Gender {
  'Male',
  'Female',
  'Otro',
}

export enum AttentionForSecureLine {
  True = 1,
  False = 0,
}

export enum FollowUp {
  True = 1,
  False = 0,
}

export enum Quadrant {
  'Division-1',
  'Division-2',
  'Division-3',
  'Division-4',
  'Division-5',
  'Division-6',
  'Division-7',
}

export enum EquipmentType {
  'APÓSITO_OCULAR',
  'APÓSITO_PQ',
  'BAJALENGUA',
  'BOLSAS_ROJAS',
  'CATÉTER',
  'ELECTRODOS',
  'GUANTES_DE_LATEX',
  'LANCETA',
  'TIRILLA',
  'MACROGOTERO',
  'SOL_SALINA',
  'TAPABOCA',
  'TORUNDA_DE_ALGODÓN',
  'VENDA_DE_GASA_4_5YD',
  'VENDA_DE_GASA_5_5YD',
  'VENDA_ELASTICA_4_5YD',
  'VENDA_ELASTICA_5_5YD',
}
