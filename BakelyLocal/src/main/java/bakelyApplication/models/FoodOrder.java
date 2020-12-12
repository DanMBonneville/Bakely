package bakelyApplication.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FoodOrders")
public class FoodOrder {

	@Id
	@GeneratedValue( strategy= GenerationType.AUTO )
	private int id;
	private Order order;
	private FoodOrder foodOrder;
	
	public int getId() {
		return id;
	}
	
	public Order getOrder() {
		return order;
	}
	
	public FoodOrder getFoodOrder() {
		return foodOrder;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public void setOrder(Order order) {
		this.order = order;
	}
	
	public void setFoodOrder(FoodOrder foodOrder) {
		this.foodOrder = foodOrder;
	}

}
