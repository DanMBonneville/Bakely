package bakelyApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bakelyApplication.data.CustomerJpaRepository;

@Component
public class Service {
	
	@Autowired
	CustomerJpaRepository repository;
	
}
