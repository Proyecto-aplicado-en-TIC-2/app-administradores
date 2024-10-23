import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-filled-button-2',
  standalone: true,
  imports: [],
  template: `
    <button class="roboto-regular">{{ texto }}</button>
  `,
  styles: `
    button {
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-surface);
      padding: 10px 25px;
      border: none;
      border-radius: 50px;
      font-size: 15px;
    }
  `
})
export class FilledButtonComponent2 {
  @Input() texto: string = "";
}
