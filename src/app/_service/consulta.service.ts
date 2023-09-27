import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultaListaExamenDTO } from '../_dto/consultaListaExamenDTO';
import { FiltroConsultaDTO } from '../_dto/filtroConsultaDTO';
import { Consulta } from '../_model/consulta';
import { ConsultaResumenDTO } from '../_dto/consultaResumenDTO';



@Injectable({ 
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `http://localhost:8080/consultas`;
 
  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }
  buscar(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }
  
  listar() {
    return this.http.get<Consulta[]>(this.url);
  }

  

  listarExamenPorConsulta(idConsulta: number){
    return this.http.get<ConsultaListaExamenDTO[]>(`http://localhost:8080/consultaexamenes/${idConsulta}`);
  }

  listarResumen() {
    return this.http.get<ConsultaResumenDTO[]>(`${this.url}/listarResumen`);
  }

  genererReporte(){
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob'
    });
  }

  guardarArchivo(data : File){
    let formdata : FormData = new FormData();
    formdata.append('file', data);    

    return this.http.post(`${this.url}/guardarArchivo`, formdata, {
      responseType: 'text'
    });
  }

  leerArchivo(){
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }
  
}
