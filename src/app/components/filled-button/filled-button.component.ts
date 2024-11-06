import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filled-button',
  standalone: true,
  imports: [],
  template: `
    <button class="roboto-regular" [disabled]="disabled">{{ texto }}</button>
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

    button:disabled {
      background-color: rgba(29, 27, 32, 0.12);
      opacity: 0.7;
      color: var(--md-sys-color-on-surface);
    }
  `,
})
export class FilledButtonComponent {
  @Input() texto: string = '';
  @Input() disabled!: boolean;
}
