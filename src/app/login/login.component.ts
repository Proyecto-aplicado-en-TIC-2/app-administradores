import { Component } from '@angular/core';
import {TextFieldComponent} from "../components/text-field/text-field.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TextFieldComponent, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'login';
}
