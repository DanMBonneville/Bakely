package bakelyApplication.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Customers")
public class Customer {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "serial")
	private Long id;
	
	private String email;
	private String zipCode;
	private String phoneNumber;
	private String password;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	public String getZipcode() {
		return zipCode;
	}

	public void setZipcode(String zipcode) {
		this.zipCode = zipcode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
