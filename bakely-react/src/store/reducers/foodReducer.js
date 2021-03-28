import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    foodItems: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MENU_ITEM: return addFoodItemToStore(state, action);
        case actionTypes.CLEAR_FOOD_ITEMS: return clearFoodItems(state);
        default: return state;
    }
};

const addFoodItemToStore = (state, action) => {
    let newFoodList = [...state.foodItems];
    const newFoodItem = {
        ...action.foodItemToAdd,
        foodId: action.foodId,
    };
    let index = newFoodList.length > 0 ? 
        newFoodList.findIndex(item => item.foodId === action.foodId): -1;
    if(index > -1){
        newFoodList.splice(index, 0, newFoodItem);
    } else{
        newFoodList.push(newFoodItem);
    }
	return updateObject(state, { 
		foodItems: newFoodList
	})
}

const clearFoodItems = (state) => {
    return updateObject(state, { 
		foodItems: []
	})
}

export default reducer;