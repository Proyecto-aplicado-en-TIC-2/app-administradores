import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "./service/auth.service";
import { LoginService } from "./service/login.service";
import { inject } from "@angular/core";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route, state) => {
  console.log("Se activó el guard");

  // Servicios
  const auth = inject(AuthService);
  const router = inject(Router);
  const loginService = inject(LoginService);

  console.log('Tenemos un token existente', auth.isAuthenticated())
  if (!auth.isAuthenticated()) return false;

  // Validamos el token de forma asíncrona
  return loginService.verifyToken().pipe(
    map((isTokenValid: boolean) => {
      console.log("El token es válido", isTokenValid);
      if (!isTokenValid) {
        console.log("Eliminamos el token del local storage");
        auth.deleteToken();
        console.log("Redireccionamos al login");
        router.navigate(['/login']);
        return false; // Bloquea la navegación si el token no es válido
      }
      console.log("El guard da acceso al dashboard");
      return true; // Permite la navegación si el token es válido
    }),
    catchError((error) => {
      console.log("El servidor está desconectado");
      router.navigate(['/login']);
      return of(false); // Bloquea la navegación en caso de error
    })
  );
};
