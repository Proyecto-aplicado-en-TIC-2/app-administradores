import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';
import { LoginService } from './service/login.service';

export const loginGuard: CanActivateFn = () => {
  try {
    console.log('Guard', 'Activado');
    // Servicios
    const auth = inject(AuthService);
    const router = inject(Router);
    const loginService = inject(LoginService);

    console.log('Guard', 'El token existe?', auth.isAuthenticated());
    if (auth.isAuthenticated()) {
      // Validamos que el token este activo
      if (!loginService.verifyToken()) {
        router.navigate(['/login']).then();
        console.log('Guard', 'El token es invalido');
        return false;
      }

      console.log('Guard', 'El token es valido');
      return true;
    } else {
      router.navigate(['/login']).then();
      return false;
    }
  } catch (e) {
    console.log('Error en la extracción del token');
    return false;
  }
};
