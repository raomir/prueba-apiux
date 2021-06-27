package com.apiux.prueba.utils.validator;

import org.springframework.stereotype.Component;

import com.apiux.prueba.persistence.entities.Tarea;
import com.apiux.prueba.utils.validator.exceptions.ApiNotFound;
import com.apiux.prueba.utils.validator.exceptions.ApiUnprocessableEntity;

@Component
public class TareaValidatorImple implements TareaValidator{

	@Override
	public void validator(Tarea tarea) throws ApiUnprocessableEntity {
		
		// Validación de identificador
		if (tarea.getIdentificador() == null) {
			this.message("El identificador es obligatorio");
		} 
		
		// Validación de descripción
		if (tarea.getDescripcion() == null || tarea.getDescripcion().isEmpty()) {
			this.message("La descripción es obligatoria");
		}
		
		// Validación de activo
		if (tarea.getActivo() == null) {
			this.message("El campo activo es obligatorio");
		}
	}
	
	private void message(String message) throws ApiUnprocessableEntity {
		throw new ApiUnprocessableEntity(message);
	}

	@Override
	public void error(String message) throws ApiNotFound {
		throw new ApiNotFound(message);
	}

}
