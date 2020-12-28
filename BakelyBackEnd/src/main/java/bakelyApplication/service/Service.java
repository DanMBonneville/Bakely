package bakelyApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bakelyApplication.data.CustomerJpaRepository;
import bakelyApplication.data.ShefJpaRepository;
import bakelyApplication.models.Shef;

@Component
public class Service {
	
	@Autowired
	CustomerJpaRepository customerRepository;
	
	@Autowired
	ShefJpaRepository shefRepository;
	
	public Shef addShef(Shef newShef) {
		return shefRepository.save(newShef);
	}
	
	
}
