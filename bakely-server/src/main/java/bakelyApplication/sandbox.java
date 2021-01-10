package bakelyApplication;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class sandbox {

	public static void main(String[] args) {
		//use this class to shallowly test methods
		
		String somePassword = "testPassword";
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		System.out.println(encoder.encode(somePassword));
		
	}

}
