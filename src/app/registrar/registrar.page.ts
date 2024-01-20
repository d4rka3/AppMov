import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SqlService } from '../service/sql.service';
import { Alumnos } from '../inteface/alumnos';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {

  newAlumno: Alumnos = {
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    contrasena: "",
  };

  constructor(private router: Router, private sqlservice: SqlService) { }

  async RegistrarAlumno() {
    // Verifica si faltan campos por llenar
    if (!this.camposCompletos()) {
      alert('Por favor, completa todos los campos antes de registrar.');
      return;
    }

    // Verifica la validez del rut
    if (!this.validarRut()) {
      alert('El rut debe contener solo números y tener un máximo de 12 caracteres.');
      return;
    }

    // Verifica la longitud del correo
    if (this.newAlumno.correo.length > 30) {
      alert('El correo debe tener un máximo de 30 caracteres.');
      return;
    }

    // Verifica la longitud de la contraseña (mínimo 3, máximo 12 caracteres)
    if (this.newAlumno.contrasena.length < 3 || this.newAlumno.contrasena.length > 12) {
      alert('La contraseña debe tener entre 3 y 12 caracteres.');
      return;
    }

    const alumnos = await this.sqlservice.obtenerAlumnos().toPromise();

    // Verifica si el rut ya existe en la lista de alumnos
    if (alumnos && alumnos.some(alumno => alumno.rut === this.newAlumno.rut.trim())) {
      alert('El rut ya está registrado. Por favor, utiliza otro.');
      return;
    }

    // Guarda el nuevo alumno
    this.sqlservice.GuardarAlumno(this.newAlumno).subscribe(
      response => {
        // Muestra alerta si el usuario se ha registrado con éxito
        alert('Usuario registrado con éxito.');
        console.log('Usuario registrado con éxito:', response);
        
        // Navegar a la página de inicio
        this.router.navigate(['/login']);
      },
      error => {
        // Muestra alerta si hay un error al registrar el usuario
        alert('Error al registrar usuario. Por favor, verifica los datos.');
        console.error('Error al registrar usuario:', error);
      }
    );
  }

  // Función para verificar si todos los campos están completos
  camposCompletos(): boolean {
    return (
      this.newAlumno.nombre.trim() !== "" &&
      this.newAlumno.apellido.trim() !== "" &&
      this.newAlumno.rut.trim() !== "" &&
      this.newAlumno.correo.trim() !== "" &&
      this.newAlumno.contrasena.trim() !== ""
    );
  }

  // Función para validar el formato del rut
  validarRut(): boolean {
    // Expresión regular para permitir solo números en el rut y longitud máxima de 12 caracteres
    const rutRegex = /^[0-9]{1,12}$/;
    return rutRegex.test(this.newAlumno.rut.trim());
  }

}





