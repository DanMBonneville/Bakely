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
	
	private int orderNumber;
	private int foodId;
	
	public int getId() {
		return id;
	}
	public void setId(int orderNumber) {
		this.orderNumber = orderNumber;
	}
	public int getOrderNumber() {
		return orderNumber;
	}
	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}
	public int getFoodId() {
		return foodId;
	}
	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}

}
