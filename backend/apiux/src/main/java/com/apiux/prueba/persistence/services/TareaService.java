package com.apiux.prueba.persistence.services;

import java.util.List;
import java.util.Optional;

import com.apiux.prueba.persistence.entities.Tarea;

public interface TareaService {

	List<Tarea> findAll();
	
	Optional<Tarea> findById(Long idTarea);
	
	Tarea save(Tarea tarea);
	
	void update(Long idTarea, Tarea tarea);
	
	boolean delete(Long idTarea);
}
