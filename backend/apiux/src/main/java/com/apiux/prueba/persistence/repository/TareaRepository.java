package com.apiux.prueba.persistence.repository;

import org.springframework.data.repository.CrudRepository;

import com.apiux.prueba.persistence.entities.Tarea;

public interface TareaRepository extends CrudRepository<Tarea, Long>{
	
}
