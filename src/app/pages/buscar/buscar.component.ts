import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FiltroConsultaDTO } from 'src/app/_dto/filtroConsultaDTO';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { UtilService } from 'src/app/_service/util.service';
import { DialogoDetalleComponent } from './dialogo-detalle/dialogo-detalle.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  maxFecha: Date = new Date(); 
  form!: FormGroup;
  displayedColumns = ['paciente', 'dni','medico', 'especialidad', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  progress: boolean = false;

  constructor(private consultaService: ConsultaService, private dialog: MatDialog, private utilService: UtilService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });

    this.utilService.estadoProgress.subscribe(data => {
      this.progress = data;
    });
    
    this.consultaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


  }

  buscar() {
    
    this.progress = true;
    let filtro = new FiltroConsultaDTO(this.form.value['dni'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);
    if (filtro.nombreCompleto) {
    filtro.nombreCompleto = filtro.nombreCompleto.toLowerCase();
      console.log(filtro);

    } else {
    filtro.nombreCompleto = ''; // O establece un valor predeterminado si es necesario
    }

    this.utilService.estadoProgress.next(true);

    setTimeout(() => {

    }, 2000);
    /*{
      "dni" : "785956",
      "nombreCompleto" : "Jaime",
      "fechaConsulta" : "20-08-2019"
    }*/

    if (filtro.fechaConsulta) {

      delete filtro.dni;
      delete filtro.nombreCompleto;

      console.log(filtro);

      this.consultaService.buscar(filtro).subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.utilService.estadoProgress.next(false);
        this.progress = false;
      });
    } else {
      delete filtro.fechaConsulta;

      if ( filtro.dni && filtro.dni.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }

      this.consultaService.buscar(filtro).subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.progress = false;
      });
    }

  }

  verDetalle(consulta: Consulta) {

    /*const dialogRef = this.dialog.open(DialogoDetalleComponent, {
      data: { consulta: consulta }
    });*/
    this.dialog.open(DialogoDetalleComponent, {
      width: '80%', 
      data: consulta
    });
  }

}
