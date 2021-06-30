import http from '../http-common';

class TaskDataService {

    // Método que se encarga de obtener todos las tareas
    gatAll() {
        return http.get();
    }

    // Método que se encarga de obtener una tarea en especifico 
    getById(id) {
        return http.get(`/${id}`);
    }

    /**
     * Método encargado de guardar una tarea
     * @param {Object} data, objeto con la información de la tarea
     */
    create(data) {
        return http.post("/save", data);
    }

    /**
     * Método encargado de actualizar una tarea
     * @param {int} id de la tarea a actualizar
     * @param {Object} data, objeto con la información de la tarea
     */
    update(id, data) {
        return http.put(`/update/${id}`, data);
    }

    /**
     * Método encargado de eliminar una tareas
     * @param {int} id de la tarea a eliminar
     */
    delete(id) {
        return http.delete(`/delete/${id}`);
    }
}

export default new TaskDataService();