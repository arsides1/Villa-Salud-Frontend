import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  displayedColumns = ['index', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private especialidadService: EspecialidadService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }
 
  ngOnInit() {
    this.especialidadService.especialidadCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.especialidadService.mensajeCambio.subscribe(data => { 
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.especialidadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(idEspecialidad: number) {
    this.especialidadService.eliminar(idEspecialidad).pipe(switchMap(() => {
      return this.especialidadService.listar();
    })).subscribe(data => {
      this.especialidadService.especialidadCambio.next(data);
      this.especialidadService.mensajeCambio.next('Se eliminó');
    });
  }
}
