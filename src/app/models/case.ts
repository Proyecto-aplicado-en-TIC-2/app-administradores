export class CaseModel {
  public id: string = '';
  public WebSocket_id_attendant: string = '';
  public brigadista_Id: string = '';
  public reporter_Id: string = '';
  public aphThatTakeCare_Id: string = '';
  public partition_key: Cases = 0;
  public State: string = '';
  public date = new date();
}

export enum Cases {
  Incendio,
  Medico,
  Estrctural,
}

class date {
  public date: string = '';
  public hourRequest: string = '';
  public hourArrive: string = '';
  public hourCloseAttentionn: string = '';
}
