import { Injectable } from '@angular/core';
import { Especialidad } from '../_model/especialidad';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

 
  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  url: string = `http://localhost:8080/especialidades`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Especialidad[]>(this.url);
  }

  listarPorId(idEspecialidad: number) {
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }

  registrar(especialidad: Especialidad) {
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad: Especialidad) {
    return this.http.put(this.url, especialidad);
  }

  eliminar(idEspecialidad: number) {
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }
}
