import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['index', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource!: MatTableDataSource<Medico>; 

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private medicoService: MedicoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.medicoService.medicoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(medico?: Medico) {
    let med = medico != null ? medico : new Medico();

    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: med
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  eliminar(medico: Medico) {

    this.medicoService.eliminar(medico.idMedico).pipe(switchMap(() => {
      return this.medicoService.listar();
    })).subscribe(data => {
      this.medicoService.medicoCambio.next(data);
      this.medicoService.mensajeCambio.next("Se elimino");
    });

    /*this.medicoService.eliminar(medico.idMedico).subscribe(() => {
      this.medicoService.listar().subscribe(medicos => {
        this.medicoService.medicoCambio.next(medicos);
        this.medicoService.mensajeCambio.next("Se elimino");
      });
    });*/
  }

}
