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
      <div class="box roboto-regular">
        <div class="box_info">
          <h5>Prioridad</h5>
          <p class="prioridad">Alta</p>
        </div>

        <div class="box_info">
          <h5>Nombre completo</h5>
          <p>Jaider Joham Morales Franco</p>
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
          <h5>Bloque o punto de referencia</h5>
          <p>En la bibloteca</p>
        </div>

        <div class="box_info">
          <h5>Salón</h5>
          <p>3</p>
        </div>

        <div class="box_info">
          <h5>Descripción del incidente</h5>
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
    width: 317px;
    background: var(--md-sys-color-primary-container);
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    box-shadow:  0 4px 4px 0 var(--md-sys-color-shadow);
  }


  .box{
    display: flex;
    flex-direction: column;
    gap: 10px;

    .prioridad{
      font-size: 36px;
    }
    .box_info{
      padding: 0 20px;
    }
    h5, p {
        margin: 0;
    }
    p{
      padding-top: 5px;
    }
  }

  .box_button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  `
})
export class EmergencyCardReportedComponent {
  //@Input() json: String[] | undefined ;

}
