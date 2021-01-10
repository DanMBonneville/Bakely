package bakelyApplication.data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import bakelyApplication.models.FoodOrder;

@Repository
@Transactional
public class FoodOrderJpaRepository {
	
	@PersistenceContext
	EntityManager entityManger;

	public FoodOrder findById(int id) {
		return entityManger.find(FoodOrder.class, id);
	}

}
