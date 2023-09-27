import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultaListaExamenDTO } from 'src/app/_dto/consultaListaExamenDTO';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';

@Component({
  selector: 'app-dialogo-detalle',
  templateUrl: './dialogo-detalle.component.html',
  styleUrls: ['./dialogo-detalle.component.css']
  
})
export class DialogoDetalleComponent implements OnInit {

  consulta!: Consulta;
  examenes!: ConsultaListaExamenDTO[];

  constructor(private dialogRef: MatDialogRef<DialogoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta, private consultaService : ConsultaService) {    }

  ngOnInit() {
    this.consulta = this.data;
    console.log(this.consulta);
    this.listarExamenes();

  }

  listarExamenes(){
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe(data => {
      this.examenes = data;
      console.log(this.examenes);
      
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  

}
