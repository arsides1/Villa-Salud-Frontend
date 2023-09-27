import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Paciente } from '../_model/paciente';



@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();
  url: string = `http://localhost:8080/pacientes`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(idPaciente: number) {
    return this.http.get<Paciente>(`${this.url}/${idPaciente}`);
  }

  registrar(paciente: Paciente) {
    return this.http.post(this.url, paciente);
  }

  modificar(paciente: Paciente) {
    return this.http.put(this.url, paciente);
  }

  eliminar(idPaciente: number) {
    return this.http.delete(`${this.url}/${idPaciente}`);
  }


}
