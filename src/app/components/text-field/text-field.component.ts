import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [],
  template: `
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label roboto-regular">{{ label }}</label>
      <input type="{{type}}" class="form-control" id="exampleInputEmail1">
    </div>
  `,
  styles: `
    div {
      display: flex;
      flex-direction: column;
    }

    input {
      background: var(--md-sys-color-surface);
      border: 2px solid var(--md-sys-color-primary);
      border-radius: 8px;
      height: 20px;
      padding: 10px 10px;
    }

    label {

    }

  `
})
export class TextFieldComponent {
  @Input() label: string = "";
  @Input() type: string = "";
}
