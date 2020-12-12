package bakelyApplication.models;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import antlr.collections.List;

@Entity
@Table( name = "Orders")
public class Order {

	@Id
	private int orderNumber;
	@OneToMany( targetEntity = FoodItem.class) 
	private List foodItemList;
	private Customer cust;
	private BigDecimal totalPrice;
	
	public List getFoodItemList() {
		return foodItemList;
	}
	
	public int getOrderNumber() {
		return orderNumber;
	}
	
	public Customer getCust() {
		return cust;
	}
	
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	
	public void setFoodItemList(List foodItemList) {
		this.foodItemList = foodItemList;
	}
	
	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}
	
	public void setCust(Customer cust) {
		this.cust = cust;
	}
	
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
}
