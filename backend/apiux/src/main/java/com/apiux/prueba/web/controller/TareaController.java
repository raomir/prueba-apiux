package com.apiux.prueba.web.controller;

import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apiux.prueba.persistence.entities.Tarea;
import com.apiux.prueba.persistence.impl.TareaServiceImpl;
import com.apiux.prueba.utils.validator.TareaValidatorImple;
import com.apiux.prueba.utils.validator.exceptions.ApiNotFound;
import com.apiux.prueba.utils.validator.exceptions.ApiUnprocessableEntity;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin("*")
@RestController
@RequestMapping("/tareas")
public class TareaController {

	@Autowired
	private TareaServiceImpl tareaServiceImpl;
	
	@Autowired
	private TareaValidatorImple tareaValidatorImpl;
	
	// Mostrar todos las tareas
	@GetMapping()
	@ApiOperation("Muestra todas las tareas creadas")
	@ApiResponse(code = 200, message = "OK")
	public ResponseEntity<List<Tarea>> getAll() {
		return new ResponseEntity<List<Tarea>>(tareaServiceImpl.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ApiOperation("Muestra la tarea filtrada por el id")
	@ApiResponse(code = 200, message = "OK")
	public ResponseEntity<Optional<Tarea>> getFindById(
			@ApiParam(value = "El id de la tarea a buscar", required = true, example = "25" )
			@PathVariable("id") Long idTarea) {
		
		return new ResponseEntity<Optional<Tarea>>(tareaServiceImpl.findById(idTarea), HttpStatus.OK);
	}
	
	// Guardar tareas
	@PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation("Guarda la tarea, la fecha creación se guarda automaticamente con la fecha actual")
	@ApiResponses({
		@ApiResponse(code = 200, message = "OK"),
		@ApiResponse(code = 422, message = "El campo es obligatorio"),
	})
	public ResponseEntity<Object> save(
			@ApiParam(value = "Solamente se require el identificador de la tarea, la descripción y si está vigente la tarea", 
					required = true)
			@RequestBody Tarea tarea) throws ApiUnprocessableEntity {
		
		tareaValidatorImpl.validator(tarea);
		tareaServiceImpl.save(tarea);
		return ResponseEntity.ok(Boolean.TRUE);
	}
	
	// Actualizar tarea
	@PutMapping("/update/{id}")
	@ApiOperation("Actualiza la tarea ya creada")
	@ApiResponses({
		@ApiResponse(code = 201, message = "Actualizado"),
		@ApiResponse(code = 422, message = "El campo es obligatorio"),
	})
	public ResponseEntity<?> update(
			@ApiParam(value = "Solamente son requeridos los campos identificador, descripción y vigente, para poder actualizar la tarea",
					required = true, example = "25")
			@PathVariable("id") Long idTarea, 
			@RequestBody Tarea tarea) throws ApiUnprocessableEntity {
		
		tareaValidatorImpl.validator(tarea);
		tareaServiceImpl.update(idTarea, tarea);
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
	
	// Eliminar tareas
	@DeleteMapping("/delete/{id}")
	@ApiOperation("Elimina una tarea")
	@ApiResponses({
		@ApiResponse(code = 200, message = "OK"),
		@ApiResponse(code = 404, message = "No se encontró la tarea"),
	})
	public ResponseEntity<Object> delete(
			@ApiParam(value = "Id de la tarea existente a eliminar", required = true, example = "25")
			@PathVariable("id") Long idTarea) throws ApiNotFound {
		
		if (tareaServiceImpl.delete(idTarea)) {
			return new ResponseEntity<Object>(HttpStatus.OK);
		} else {
			tareaValidatorImpl.error("No se encontro la tarea");
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
	}
}

