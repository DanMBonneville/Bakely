package bakelyApplication.view;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import bakelyApplication.userIO.User;

@Component
public class View {

	@Autowired
	User user;		
	
}
