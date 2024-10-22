import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-filled-button',
  standalone: true,
  imports: [],
  template: `
    <button class="roboto-regular">{{ texto }}</button>
  `,
  styles: `
    button {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-surface);
      padding: 10px 25px;
      border: none;
      border-radius: 50px;
      font-size: 15px;
    }
  `
})
export class FilledButtonComponent {
  @Input() texto: string = "";
}
