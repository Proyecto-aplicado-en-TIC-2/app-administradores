import { Quadrant } from './full-report-model';

export class WebSocketInfoModal {
  public id: string = '';
  public partition_key: string = '';
  public webSocketId: string = '';
  public cuadrant: Quadrant = Quadrant.Division_1;
  public inService: boolean = false;
}
