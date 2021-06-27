import { Component, OnInit } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { TareaService } from '../services/tarea.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tarea: Tarea[];

  constructor(
    private tareaService: TareaService, 
    private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getTareas();
  }

  //método que se encarga de obtener todos los terceros registrados 
  getTareas() {
    this.tareaService.get().subscribe((data: Tarea[]) => {
      this.tarea = data;
    }, (error) => {
      alert(error.error.message)
    })
  }

  //método que se encarga de verificar si se elimina un tercero o no
  delete(id) {
    swal.fire({
      title: 'Desea eliminar la tarea?',
      text: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.tareaService.delete(id).subscribe((data) => {
          swal.fire(
            'Eliminado',
            'La tarea se eliminó satisfactoriamente',
            'success'
          )
          this.getTareas()
        }, (error) => {
          swal.fire(
            'Eliminado',
            error.error.messge,
            'success'
          )
        })
      }
    });

  }

}
