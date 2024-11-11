import { Component } from '@angular/core';
import { TextFieldComponent } from '../components/text-field/text-field.component';
import { FilledButtonComponent } from '../components/filled-button/filled-button.component';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TextFieldComponent, FilledButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  mail = new FormControl('');
  password = new FormControl('');

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
  ) {
    console.log('LoginComponent', 'Se inicio');

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/incidents']).then();
    }
  }

  // Estado de carga
  loading = false;
  message = '';

  login() {
    console.log('Captura de datos', this.mail.value, this.password.value);
    console.log('Realizar petición');
    this.message = 'Cargando...';
    this.loading = true;
    this.loginService.login(this.mail.value, this.password.value).subscribe(
      (date) => {
        console.log(date);
        if (date.operation) {
          this.authService.saveToken(date.access_token);
          this.router.navigate(['/incidents']);
        } else {
          this.message = 'Correo o contraseña incorrectos';
          this.loading = false;
        }
      },
      (error) => {
        console.log(error);
        this.message = 'Sin conexión con el servidor';
        this.loading = false;
      },
    );
  }
}
