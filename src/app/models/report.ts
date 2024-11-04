export class ReportModel {
  //Id Auto generate for CosmosDB
  public partition_key: Cases;
  public priority?: Priorty
  public whatIsHappening?: string;
  public affected?: string;
  public reporter?: {
    id?: string;
    names?: string;
    lastNames?: string;
    relationshipWithTheUniversity?: RelationshipWithTheUniversity;
  };
  public location?: {
    block?: Block;
    classroom?: string;
    pointOfReference?: string;
  };
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
  Estrctural,
}

export enum Priorty{
  Alta,
  Media,
  Baja
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
