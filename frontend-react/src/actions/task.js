import {
    LIST_TASK,
    FIND_TAREA,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from "./types";

import TaskDataService from "../services/task.service";

// Obtener todas las tareas
export const getAll = () => async (dispatch) => {
    try {
        const res = await TaskDataService.gatAll();

        dispatch({
            type: LIST_TASK,
            payload: res.data
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

// Obtener todas las tareas
export const getFindById = (id) => async (dispatch) => {
    try {
        const res = await TaskDataService.getById;

        dispatch({
            type: FIND_TAREA,
            payload: res.data
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

// Guardar tareas
export const createTask = (identificador, descripcion, activo, id) => async (dispatch) => {
    try {
        let res = null;
        let message = null;

        if ( id !== 0 && id !== undefined ) {
            res = await TaskDataService.update(id, { identificador, descripcion, activo });
            message = 'Se actualizó el registro';
        } else {
            res = await TaskDataService.create({ identificador, descripcion, activo });
            message = 'Registro creado';
        }

        dispatch({
            type: CREATE_TASK,
            payload: res.data
        });

        return Promise.resolve({ data: res.data, message });
    } catch (error) {
        return Promise.reject(error);
    }
}

// Eliminar tarea
export const deleteTask = (id) => async (dispatch) => {
    try {
        const res = await TaskDataService.delete(id);

        dispatch({
            type: DELETE_TASK,
            payload: { id }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}