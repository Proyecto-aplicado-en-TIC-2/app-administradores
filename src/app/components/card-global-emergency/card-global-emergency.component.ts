import { Component } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';

@Component({
  selector: 'app-card-global-emergency',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <div class="body">
      <img src="/fire-black.png" alt="fire" />
      <div class="texts roboto-regular">
        <p>Tipo de emergencia</p>
        <p>Descripción</p>
      </div>
      <app-filled-button texto="Editar" />
      <app-filled-button texto="Actualizar" />
      <app-filled-button texto="Activar emergencia global" />
    </div>
  `,
  styles: `
    .body {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 5px;
      padding: 10px 20px;
      align-items: center;
      background: var(--md-sys-color-on-primary);
      border-radius: 8px;
      box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);
    }

    img {
      width: 70px;
      height: 70px;
    }

    .texts {
      width: 200px;
    }
  `,
})
export class CardGlobalEmergencyComponent {}
