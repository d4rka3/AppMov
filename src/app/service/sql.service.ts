import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumnos } from '../inteface/alumnos';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private httpclient: HttpClient) { }

  GuardarAlumno(newAlumno: Alumnos): Observable<Alumnos> {
    return this.httpclient.post<Alumnos>(`${environment.apiURl}/AlumnosRegistro`, newAlumno);
  }

  ObtenerUsuarioPorCredenciales(nombre: string, contrasena: string): Observable<Alumnos | null> {
    return this.httpclient.get<Alumnos[]>(`${environment.apiURl}/AlumnosRegistro`)
      .pipe(
        map(alumnos => alumnos.find(alumno => alumno.nombre === nombre && alumno.contrasena === contrasena) || null)
      );
  }

  obtenerAlumnos(): Observable<Alumnos[]> {
    return this.httpclient.get<Alumnos[]>(`${environment.apiURl}/AlumnosRegistro`);
  }

}



