import { Examen } from './../_model/examen';
import { Consulta } from './../_model/consulta';

export class ConsultaListaExamenDTO{
    consulta!: Consulta;
    listExamen!: Examen[];
    nombre!: string;
    descripcion!: string;
}