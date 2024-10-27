import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { WebSocketService } from '../../service/web-socket.service';
import { ListReportedEmergencies } from '../../service/data/datos';
import {
  IEmergencyReported,
  ListReportedEmergenciesService,
} from '../../service/data/reported-emergencies.service';

@Component({
  selector: 'app-emergency-card-reported',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <div class="body">
      @for (item of items; track item.id) {
        <section>
          <div class="box roboto-regular">
            <div class="box_info">
              <h5>Prioridad</h5>
              <p class="prioridad">Alta</p>
            </div>

            <div class="box_info">
              <h5>Nombre completo</h5>
              <p>{{ item.reporter.names + ' ' + item.reporter.lastNames }}</p>
            </div>

            <div class="box_info">
              <h5>Id UPB</h5>
              <p>000423552</p>
            </div>

            <div class="box_info">
              <h5>Contacto de emergencia</h5>
              <p>3008059938</p>
            </div>

            <div class="box_info">
              <h5>Bloque</h5>
              <p>{{ item.location.block }}</p>
            </div>

            <div class="box_info">
              <h5>Salón</h5>
              <p>{{ item.location.classroom }}</p>
            </div>

            <div class="box_info">
              <h5>Punto de referencia</h5>
              <p>{{ item.location.pointOfReference }}</p>
            </div>

            <div class="box_info">
              <h5>Descripción del incidente</h5>
              <p>Tengo un corte en la mano</p>
            </div>
          </div>
          <div class="box_button">
            <app-filled-button texto="Asignar APH" />
            <app-filled-button texto="Mas" />
          </div>
        </section>
      } @empty {
        <p>Sin alertas reportadas</p>
      }
    </div>
  `,
  styles: `
    .body {
      display: flex;
      flex-direction: row;
      gap: 30px;
    }

    section {
      width: 317px;
      background: var(--md-sys-color-primary-container);
      padding: 20px 10px;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      gap: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);
    }

    .box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .prioridad {
        font-size: 36px;
      }
      .box_info {
        padding: 0 20px;
      }
      h5,
      p {
        margin: 0;
      }
      p {
        padding-top: 5px;
      }
    }

    .box_button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 10px;
    }
  `,
})
export class EmergencyCardReportedComponent implements OnInit {
  items: IEmergencyReported[] = [];

  constructor(
    private webSocketService: WebSocketService,
    private listReportedEmergenciesService: ListReportedEmergenciesService,
  ) {
    this.webSocketService.outReportedEmergency.subscribe(() => {
      this.items = listReportedEmergenciesService.getList();
      console.log(
        'Cantidad de alertas actuales -> Constructor',
        this.items.length,
      );
    });
  }

  ngOnInit(): void {
    this.items = this.listReportedEmergenciesService.getList();
    console.log('Cantidad de alertas actuales -> ngOnInit', this.items.length);
  }
}
