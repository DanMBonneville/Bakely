package bakelyApplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import bakelyApplication.service.Service;
import bakelyApplication.view.View;

@RestController
//@RequestMapping("/use this to connect REACT")
public class Controller {
	
	@Autowired
	View io;
	
	@Autowired
	Service service;
	
	
}