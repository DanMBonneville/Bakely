package bakelyApplication.data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import bakelyApplication.models.Customer;

@Repository
@Transactional
public class CustomerJpaRepository {

	@PersistenceContext
	EntityManager entityManger;
	
	public Customer findByUserName(String userName) {
		return entityManger.find(Customer.class, userName);
	}
	
}
