import { Component } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { FilledButtonComponent2 } from '../filled-button/filled-button-2.component';

@Component({
  selector: 'app-card-global-emergency-active',
  standalone: true,
  imports: [FilledButtonComponent, FilledButtonComponent2],
  template: `
    <div class="box">
      <img src="/fire.png" alt="fire" />
      <div class="text roboto-regular">
        <h1>Tipo de emergencia</h1>
        <p>Descripción</p>
      </div>
      <div class="text roboto-regular">
        <h1>Estado</h1>
        <p>Activo</p>
        <p>Cantidad de dispositivos notificados</p>
        <p>102</p>
      </div>
      <app-filled-button-2 texto="Apagar emergencia" />
    </div>
  `,
  styles: `
    .box {
      height: 200px;
      width: auto;
      display: flex;
      flex-direction: row;
      gap: 30px;
      background: var(--md-sys-color-primary);
      border-radius: 8px;
      box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);
      padding: 20px;
      align-items: center;
    }

    img {
      width: 200px;
      height: 200px;
    }

    .text {
      height: min-content;
      color: var(--md-sys-color-surface);
      h1 {
        font-size: 36px;
        font-weight: 400;
        margin: 0;
      }
    }
  `,
})
export class CardGlobalEmergencyActiveComponent {}
