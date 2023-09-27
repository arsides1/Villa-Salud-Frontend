import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Medico } from '../_model/medico';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  url: string = `http://localhost:8080/medicos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Medico[]>(this.url);
  }

  listarPorId(idmedico: number) {
    return this.http.get<Medico>(`${this.url}/${idmedico}`);
  }

  registrar(medico: Medico) {
    return this.http.post(this.url, medico);
  }

  modificar(medico: Medico) {
    return this.http.put(this.url, medico);
  }

  eliminar(idmedico: number) {
    return this.http.delete(`${this.url}/${idmedico}`);
  }
}
