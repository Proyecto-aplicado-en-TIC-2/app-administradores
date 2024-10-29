import { Component, Input, input } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-card-global-emergency',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <div class="body">
      <!--<img src="/fire-black.png" alt="fire" />-->
      <div class="texts roboto-regular">
        <h2 class="type">{{ NombreAlerta }}</h2>
        <p>{{ Description }}</p>
      </div>
      <app-filled-button
        texto="Activar emergencia global"
        (click)="sendEmergency()"
      />
    </div>
  `,
  styles: `
    .body {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 20px;
      padding: 10px 20px;
      align-items: center;
      background: var(--md-sys-color-on-primary);
      border-radius: 8px;
      box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);
      gap: 100px;
    }

    img {
      width: 70px;
      height: 70px;
    }

    .type {
      width: 250px;
    }

    .texts {
      width: max-content;
      display: flex;
      flex-direction: row;
      gap: 40px;
    }
  `,
})
export class CardGlobalEmergencyComponent {
  @Input() NombreAlerta = '';
  @Input() Description = '';

  constructor(private webSocketService: WebSocketService) {}

  sendEmergency() {
    this.webSocketService.GlobalAlerts({
      emergencia: this.NombreAlerta,
    });

    window.alert('Se envío una alerta global de tipo = ' + this.NombreAlerta);
  }
}
