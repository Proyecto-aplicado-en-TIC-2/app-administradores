import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {
  }

  // Méto do para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
     // Verifica si hay un token almacenado
    return this.cookieService.check('token');
  }

  getToken(){
    return this.cookieService.get('token');
  }

  // Méto do para guardar el token (llámalo después de iniciar sesión)
  saveToken(token: string): void {
    this.cookieService.set('token', token, { expires: 1, path: '/' });
  }

  // Méto do para eliminar el token (útil para cerrar sesión)
  deleteToken(): void {
    this.cookieService.delete('token');
  }
}
