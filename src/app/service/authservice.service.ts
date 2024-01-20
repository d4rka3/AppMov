// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumnos } from '../inteface/alumnos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<Alumnos | null> {
    return this.httpClient.get<Alumnos[]>(`${environment.apiURl}/AlumnosRegistro`)
      .pipe(
        map((alumnos: Alumnos[]) => alumnos.find(alumno => alumno.nombre === username && alumno.contrasena === password) || null)
      );
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    // Implementa la lógica para verificar la autenticación (por ejemplo, verificar si hay un token en el almacenamiento local)
    // Devuelve true si está autenticado, false si no lo está
    return true;
  }
}



