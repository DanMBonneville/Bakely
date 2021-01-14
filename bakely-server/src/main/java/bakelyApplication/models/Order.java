package bakelyApplication.models;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import antlr.collections.List;

@Entity
@Table( name = "Orders")
public class Order {

	@Id
	private int orderNumber;
	private String custUserName;
	private BigDecimal totalPrice;
	
	public int getOrderNumber() {
		return orderNumber;
	}
	
	public String getCustUserName() {
		return custUserName;
	}
	
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	
	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}
	
	public void setCustUserName(String custUserName) {
		this.custUserName = custUserName;
	}
	
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
}
