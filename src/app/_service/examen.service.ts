import { Injectable } from '@angular/core';
import { Examen } from '../_model/examen';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();

  url: string = `http://localhost:8080/examenes`;
  
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Examen[]>(this.url);
  }

  listarPorId(idExamen: number) {
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }

  registrar(examen: Examen) {
    return this.http.post(this.url, examen);
  }

  modificar(examen: Examen) {
    return this.http.put(this.url, examen);
  }

  eliminar(idExamen: number) {
    return this.http.delete(`${this.url}/${idExamen}`);
  }
}
