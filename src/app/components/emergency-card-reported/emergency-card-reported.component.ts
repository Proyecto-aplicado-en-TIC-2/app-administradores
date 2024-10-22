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

      </div>
      <div>
        <app-filled-button texto="Asignar APH"/>
        <app-filled-button texto="Mas"/>
      </div>
    </section>
  `,
  styles: ``
})
export class EmergencyCardReportedComponent {
  @Input() json: { } | undefined ;


}
