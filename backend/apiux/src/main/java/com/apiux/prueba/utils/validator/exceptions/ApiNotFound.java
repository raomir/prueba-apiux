package com.apiux.prueba.utils.validator.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ApiNotFound extends Exception{

	public ApiNotFound(String message) {
		super(message);
	}
}
