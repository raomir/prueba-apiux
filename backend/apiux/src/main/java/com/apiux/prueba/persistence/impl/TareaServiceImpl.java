package com.apiux.prueba.persistence.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apiux.prueba.persistence.entities.Tarea;
import com.apiux.prueba.persistence.repository.TareaRepository;
import com.apiux.prueba.persistence.services.TareaService;

@Service
public class TareaServiceImpl implements TareaService{

	@Autowired
	private TareaRepository tareaRepository;

	@Override
	public List<Tarea> findAll() {
		return (List<Tarea>) tareaRepository.findAll();
	}

	@Override
	public Optional<Tarea> findById(Long idTarea) {
		// TODO Auto-generated method stub
		return tareaRepository.findById(idTarea);
	}
	
	@Override
	public Tarea save(Tarea tarea) {
		// TODO Auto-generated method stub
		return tareaRepository.save(tarea);
	}
	
	@Override
	public void update(Long idTarea, Tarea request) {
		Optional<Tarea> tareas = findById(idTarea);
		
		Tarea tarea = tareas.get();
		tarea.setIdentificador(request.getIdentificador());
		tarea.setDescripcion(request.getDescripcion());
		tarea.setActivo(request.getActivo());
		
		save(tarea);
	}

	@Override
	public boolean delete(Long idTarea) {
		// TODO Auto-generated method stub
		return findById(idTarea).map(tarea -> {
			tareaRepository.deleteById(idTarea);
			return true;
		}).orElse(false);
	}
}
