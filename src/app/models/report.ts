export class ReportModel {
  public id: string = '';
  public partition_key: Cases = 0;
  public priority: Priorty = 0;
  public whatIsHappening: string = '';
  public affected: string = '';
  public reporter = new Reporter();
  public location = new Location();
  public _ts: number = 0;
}

class Location {
  public block: Block = 0;
  public classroom: string = '';
  public pointOfReference: string = '';
}

class Reporter {
  public id: string = '';
  public names: string = '';
  public lastNames: string = '';
  public relationshipWithTheUniversity: RelationshipWithTheUniversity = 0;
}

export enum RelationshipWithTheUniversity {
  universitary,
  estudent,
  professor,
  visitor,
}

export enum Cases {
  Incendio,
  Medico,
  Estructural,
}

export enum Priorty {
  Alta,
  Media,
  Baja,
}

export enum Block {
  'Block1',
  'Block2',
  'Block3',
  'Block4',
  'Block5',
  'Block6',
  'Block7',
  'Block8',
  'Block9',
  'Block10',
  'Block12',
  'Block13',
  'Block14',
  'Block15',
  'Block16',
  'Block17',
  'Block18',
  'Block19',
  'Block20',
  'Block21',
  'Block22',
  'Block23',
  'Block24',
  'ComplejoDeIngenierias',
  'Forum',
  'BloquesExternosAlCampus',
}
