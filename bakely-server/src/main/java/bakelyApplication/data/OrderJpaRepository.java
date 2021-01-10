package bakelyApplication.data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import bakelyApplication.models.Order;

@Repository
@Transactional
public class OrderJpaRepository {

	@PersistenceContext
	EntityManager entityManger;

	public Order findByOrderNumber(int orderNumber) {
		return entityManger.find(Order.class, orderNumber);
	}

}
