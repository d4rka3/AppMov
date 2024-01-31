import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SqlService } from '../service/sql.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  Usuario: any;
  contrasena: string = "";
  hide = true;

  constructor(private router: Router, private sqlService: SqlService) {}

  login() {
    if (!this.Usuario || !this.contrasena) {
      alert('Por favor, completa todos los campos antes de iniciar sesión.');
      return;
    }

    this.sqlService.ObtenerUsuarioPorCredenciales(this.Usuario, this.contrasena).subscribe(
      usuario => {
        if (usuario) {
          // Usuario autenticado, redirigir al home con el nombre de usuario como información adicional
          this.router.navigate(['/home'], { state: { username: this.Usuario } });
        } else {
          // Credenciales incorrectas
          alert('Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.');
        }
      },
      error => {
        // Manejo de errores
        console.error(error);
        alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo nuevamente.');
      }
    );
  }

  togglePassword() {
    this.hide = !this.hide;
  }
}
