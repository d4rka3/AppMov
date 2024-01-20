import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SqlService } from './service/sql.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private sqlService: SqlService, private router: Router) { }

  canActivate(): boolean {
    // Supongamos que tienes un método en SqlService para verificar la autenticación
    const usuarioAutenticado = this.sqlService.estaAutenticado(); 

    if (usuarioAutenticado) {
      return true; // El usuario está autenticado
    } else {
      this.router.navigate(['/login']); // Redirige al login si el usuario no está autenticado
      return false;
    }
  }
}







