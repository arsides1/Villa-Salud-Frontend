import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Examen } from 'src/app/_model/examen';
import { ExamenService } from 'src/app/_service/examen.service';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  id!: number;
  examen!: Examen;
  form!: FormGroup;
  edicion: boolean = false;


  constructor(private examenService: ExamenService, private route: ActivatedRoute, private router: Router) {
    this.examen = new Examen();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.examenService.listarPorId(this.id).subscribe(data => {
        let id = data.idExamen;
        let nombre = data.nombre;
        let descripcion = data.descripcion

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'descripcion': new FormControl(descripcion)
        });
      });
    }
  }

  operar() {
    this.examen.idExamen = this.form.value['id'];
    this.examen.nombre = this.form.value['nombre'];
    this.examen.descripcion = this.form.value['descripcion'];

    if (this.examen != null && this.examen.idExamen > 0) {
      this.examenService.modificar(this.examen).pipe(switchMap(() => {
        return this.examenService.listar();
      })).subscribe(data => {
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next("Se modifico");
      });
    } else {
      this.examenService.registrar(this.examen).subscribe(data => {
        this.examenService.listar().subscribe(especialidad => {
          this.examenService.examenCambio.next(especialidad);
          this.examenService.mensajeCambio.next("Se registro");
        });
      });
    }

    this.router.navigate(['examen']);
  }

}
