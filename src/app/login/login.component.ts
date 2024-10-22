import { Component } from '@angular/core';
import {TextFieldComponent} from "../components/text-field/text-field.component";
import {NgOptimizedImage} from "@angular/common";
import {FilledButtonComponent} from "../components/filled-button/filled-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TextFieldComponent, NgOptimizedImage, FilledButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'login';
}
