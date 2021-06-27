package com.apiux.prueba.utils.validator;

import org.springframework.stereotype.Service;

import com.apiux.prueba.persistence.entities.Tarea;
import com.apiux.prueba.utils.validator.exceptions.ApiNotFound;
import com.apiux.prueba.utils.validator.exceptions.ApiUnprocessableEntity;

@Service
public interface TareaValidator {

	void validator(Tarea tarea) throws ApiUnprocessableEntity;
	
	void error(String message) throws ApiNotFound;
}
