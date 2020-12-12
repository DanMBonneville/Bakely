package bakelyApplication.models;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FoodItems")
public class FoodItem {

	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private int foodId;
	
	private String name;
	private String description;
	private String[] ingredients;
	private String allergies;
	private String portionSize;
	private BigDecimal price;
	
	public int getFoodId() {
		return foodId;
	}
	
	public String getName() {
		return name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public String[] getIngredients() {
		return ingredients;
	}
	
	public String getAllergies() {
		return allergies;
	}
	
	public String getPortionSize() {
		return portionSize;
	}
	
	public BigDecimal getPrice() {
		return price;
	}
	
	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public void setIngredients(String[] ingredients) {
		this.ingredients = ingredients;
	}
	
	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}
	
	public void setPortionSize(String portionSize) {
		this.portionSize = portionSize;
	}
	
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
}
