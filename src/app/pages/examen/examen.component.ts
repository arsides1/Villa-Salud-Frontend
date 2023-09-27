import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns = ['index', 'nombre', 'descripcion', 'acciones'];
  dataSource!: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  mensaje!: string;

  constructor(private examenService: ExamenService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {

    /*let obs1 = this.examenService.listar();
    let obs2 = this.examenService.listarPorId(1);

    forkJoin(obs1, obs2).subscribe(data => {
      console.log(data);
    });*/


    this.examenService.examenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  eliminar(idExamen: number) {
    this.examenService.eliminar(idExamen).pipe(switchMap(() => {
      return this.examenService.listar();
    })).subscribe(data => {
      this.examenService.examenCambio.next(data);
      this.examenService.mensajeCambio.next('Se eliminó');
    });

  }


}
