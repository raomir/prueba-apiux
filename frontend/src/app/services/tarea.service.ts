import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from '../interfaces/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  //constante que contiene la url del apiRest
  private API_ENDPOINT = 'http://localhost:8090/apiux-prueba/api/tareas';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
   }

  // Método que se encarga de obtener todos las tareas
  get(){
    return this.httpClient.get(this.API_ENDPOINT);
  }

  obtenerDatos(id): Observable<any>{
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`);
  }

  /**
   * Método que se encarga de registrar una tarea
   * y recibe como parametro una interface que contiene todos los datos de la bd
   */
  save(tarea: Tarea, id): Observable<any>{
    if ( id == 0 || id == undefined) {
      return this.httpClient.post(this.API_ENDPOINT + '/save', tarea, {headers: this.headers})
    } else {
      return this.httpClient.put(this.API_ENDPOINT + '/update/'+ id, tarea, {headers: this.headers})
    }
  }

  /**
   * Método que se encarga de eliminar una tarea
   * @param id int, id de la tarea
   */
  delete(id) {
    return this.httpClient.delete(this.API_ENDPOINT + '/delete/' + id);
  }
}
