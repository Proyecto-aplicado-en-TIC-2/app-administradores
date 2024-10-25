import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(window) private window: Window) {
  }

  // Méto do para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.window.sessionStorage.getItem('token'); // Verifica si hay un token almacenado
    return !!token; // Retorna true si hay un token, false si no
  }

  getToken(){
    return this.window.sessionStorage.getItem('token');
  }

  // Méto do para guardar el token (llámalo después de iniciar sesión)
  saveToken(token: string): void {
    this.window.sessionStorage.setItem('token', token);
  }

  // Méto do para eliminar el token (útil para cerrar sesión)
  deleteToken(): void {
    this.window.sessionStorage.removeItem('token');
  }
}
