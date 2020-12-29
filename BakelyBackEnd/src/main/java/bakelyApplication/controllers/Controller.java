package bakelyApplication.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import bakelyApplication.models.Customer;
import bakelyApplication.models.Shef;
import bakelyApplication.service.Service;
import bakelyApplication.view.View;

@RestController
@CrossOrigin(origins={"http://localhost:4200"})
@RequestMapping("/")
public class Controller {
	
	@Autowired
	View io;
	
	@Autowired
	Service service;
	
	@RequestMapping(path = "/shef-sign-up/add", method = RequestMethod.POST)
	public Shef addShef(@RequestBody Shef newShef) {
		service.addShef(newShef);
		return newShef;
	}
	
	@RequestMapping(path = "/sign-up/add", method = RequestMethod.POST)
	public Customer addCustomer(@RequestBody Customer newCustomer) {
		service.addCustomer(newCustomer);
		return newCustomer;
	}
	
}