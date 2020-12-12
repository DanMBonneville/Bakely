package bakelyApplication.data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import bakelyApplication.models.FoodItem;

@Repository
@Transactional
public class FoodItemJpaRepository {
	
	@PersistenceContext
	EntityManager entityManger;

	public FoodItem findByFoodId(int foodId) {
		return entityManger.find(FoodItem.class, foodId);
	}
	
}
