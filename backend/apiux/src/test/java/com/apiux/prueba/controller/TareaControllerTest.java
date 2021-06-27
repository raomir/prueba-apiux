package com.apiux.prueba.controller;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.apiux.prueba.persistence.entities.Tarea;
import com.apiux.prueba.persistence.impl.TareaServiceImpl;
import com.apiux.prueba.utils.validator.TareaValidatorImple;
import com.apiux.prueba.utils.validator.exceptions.ApiNotFound;
import com.apiux.prueba.utils.validator.exceptions.ApiUnprocessableEntity;
import com.apiux.prueba.web.controller.TareaController;

public class TareaControllerTest {
	
	private static final Integer IDENTIFICADOR = 12345;
	private static final String DESCRIPCION = "Descripción de la tarea";
	private static final Boolean VIGENTE = true;
	
	private static final Long TAREA_ID = 25L;
	private static final HttpStatus SUCCESS_CODE = HttpStatus.OK;
	private static final HttpStatus CREATED_STATUS = HttpStatus.CREATED;
	private static final HttpStatus NOT_FOUND_STATUS = HttpStatus.NOT_FOUND;
	
	public static final Optional<Tarea> TAREA_REST = Optional.of(new Tarea());
	public static final ArrayList<Tarea> TAREA_LIST = new ArrayList<>();
	public static final Tarea CREATE_TAREA = new Tarea();
	
	@Mock
	private TareaServiceImpl tareaServiceImpl;
	
	@Mock
	private TareaValidatorImple tareaValidatorImpl;
	
	@InjectMocks
	TareaController tareaController;
	
	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
		
		TAREA_REST.map(tarea -> {
			tarea.setIdTarea(TAREA_ID);
			tarea.setIdentificador(IDENTIFICADOR);
			tarea.setDescripcion(DESCRIPCION);
			tarea.setActivo(VIGENTE);
			tarea.setFechaCreacion();
			return tarea;
		});
		
		CREATE_TAREA.setIdentificador(IDENTIFICADOR);
		CREATE_TAREA.setDescripcion(DESCRIPCION);
		CREATE_TAREA.setActivo(VIGENTE);
		CREATE_TAREA.setFechaCreacion();
		
		Mockito.when(tareaServiceImpl.findAll()).thenReturn(TAREA_LIST);
		Mockito.when(tareaServiceImpl.findById(TAREA_ID)).thenReturn(TAREA_REST);
		Mockito.when(tareaServiceImpl.save(CREATE_TAREA)).thenReturn(CREATE_TAREA);
	}
	
	@Test
	public void getAllTest() {
		final ResponseEntity<List<Tarea>> response = tareaController.getAll();
		
		assertEquals(response.getStatusCode(), SUCCESS_CODE);
		assertEquals(response.getBody(), TAREA_LIST);
	}
	
	@Test
	public void getFindByIdTest() {
		final ResponseEntity<Optional<Tarea>> response = tareaController.getFindById(TAREA_ID);
		
		assertEquals(response.getStatusCode(), SUCCESS_CODE);
		assertEquals(response.getBody(), TAREA_REST);
	}
	
	@Test
	public void saveTest() throws ApiUnprocessableEntity {
		final ResponseEntity<Object> response = tareaController.save(CREATE_TAREA);
		
		assertEquals(response.getStatusCode(), SUCCESS_CODE);
		assertEquals(response.getBody(), true);
	}
	
	@Test
	public void updateTest() throws ApiUnprocessableEntity {
		final ResponseEntity<?> response = tareaController.update(TAREA_ID, CREATE_TAREA);
		assertEquals(response.getStatusCode(), CREATED_STATUS);
		assertEquals(response.getBody(), true);
	}
	
	@Test 
	public void deleteTest() throws ApiNotFound, ApiUnprocessableEntity {		
		Tarea tarea = new Tarea();
		tarea.setIdTarea(TAREA_ID);
		tarea.setIdentificador(IDENTIFICADOR);
		tarea.setDescripcion(DESCRIPCION);
		tarea.setActivo(VIGENTE);
		tarea.setFechaCreacion();
		
		List<Tarea> tareas = new ArrayList<>();
		tareas.add(tarea);
		
		tareaController.save(tarea);
		final ResponseEntity<Object> response = tareaController.delete(tarea.getIdTarea());
		assertEquals(response.getStatusCode(), NOT_FOUND_STATUS);
	}
	
}
