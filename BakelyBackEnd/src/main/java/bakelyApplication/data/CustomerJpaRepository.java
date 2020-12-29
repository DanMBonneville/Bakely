package bakelyApplication.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bakelyApplication.models.Customer;

@Repository
public interface CustomerJpaRepository extends JpaRepository<Customer, Long>{
	
}

