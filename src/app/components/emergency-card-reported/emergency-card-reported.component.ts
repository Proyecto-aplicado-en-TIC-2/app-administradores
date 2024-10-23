import {Component, Input} from '@angular/core';
import {FilledButtonComponent} from "../filled-button/filled-button.component";

@Component({
  selector: 'app-emergency-card-reported',
  standalone: true,
  imports: [
    FilledButtonComponent
  ],
  template: `
    <section>
      <div class="box">
        <div class="box_info">
          <h4>Prioridad</h4>
          <p class="prioridad">Alta</p>
        </div>

        <div class="box_info">
          <h4>Nombre completo</h4>
          <p>Jaider Joham Morales Franco</p>
        </div>

        <div class="box_info">
          <h4>Id UPB</h4>
          <p>000423552</p>
        </div>

        <div class="box_info">
          <h4>Contacto de emergencia</h4>
          <p>3008059938</p>
        </div>

        <div class="box_info">
          <h4>Bloque o punto de referencia</h4>
          <p>En la bibloteca</p>
        </div>

        <div class="box_info">
          <h4>Salón</h4>
          <p>3</p>
        </div>

        <div class="box_info">
          <h4>Descripción del incidente</h4>
          <p>Tengo un corte en la mano</p>
        </div>

      </div>
      <div class="box_button">
        <app-filled-button texto="Asignar APH"/>
        <app-filled-button texto="Mas"/>
      </div>
    </section>
  `,
  styles: `
  section{
    width: 320px;
    background: var(--md-sys-color-primary-container);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    box-shadow:  0 4px 4px 0 var(--md-sys-color-shadow);
  }

  .box_info{
    display: flex;
    flex-direction: column;
    gap: 5px;

    h4, p {
        margin: 0;
    }
  }

  `
})
export class EmergencyCardReportedComponent {
  @Input() json: String[] | undefined ;


}
