import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tarea } from '../interfaces/tarea';
import { TareaService } from '../services/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  public id = 0;
  public frm;

  constructor(
    private tareaService: TareaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

    //obtiene el id que se envia por la url
    this.id = this.activatedRoute.snapshot.params['id']
  }


  ngOnInit() {
    this.frm = new FormGroup({
      identificador: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      activo: new FormControl(true, Validators.required),
    });

    if (this.id != 0 && this.id !== undefined) {
      this.obtenerData(this.id);
    }
  }

  obtenerData(id) {
    this.tareaService.obtenerDatos(id).subscribe(
      (data) => {
        this.frm.controls.identificador.setValue(data.identificador);
        this.frm.controls.descripcion.setValue(data.descripcion);
        this.frm.controls.activo.setValue(data.activo);
      }, (error) => {
        alert(error.error.message)
      })
  }

  /**
   * Método que se encargado de guardar una tarea o actualizarla
   */
  saveTarea() {
    if (this.frm.invalid) {
      return false;
    }

    this.tareaService.save(this.frm.value, this.id).subscribe(
      (data) => {
        swal.fire({
          title: 'Desea guardar la tarea?',
          text: '',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Si',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          focusCancel: true
        }).then((result) => {
          if (result.value) {
            if (this.id != 0 && this.id != undefined) {
              swal.fire(
                'Actualizado',
                'La tarea se actualizó satisfactoriamente',
                'success'
              )
            } else {
              swal.fire(
                'Guardado',
                'La tarea se guardó satisfactoriamente',
                'success'
              )
            }
            this.router.navigate(['/home']);
          }
        });
      }, (error) => {
        swal.fire(
          'Error',
          error.error.message,
          'error'
        )
      })
  }
}
