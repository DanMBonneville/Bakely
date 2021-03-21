import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    foodItems: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MENU_ITEM: return addFoodItem(state, action);
        case actionTypes.SET_FOOD_ITEMS: return setAllFoodItems(state, action);
        default: return state;
    }
};

const addFoodItem = (state, action) => {
    let newFoodList = [...state.foodItems];
    let newfoodItem = {
        ...action.foodItemToAdd,
        id: action.id
    };
    newFoodList.push(newfoodItem)
	return updateObject(state, { 
		foodItems: newFoodList
	})
}

const setAllFoodItems = (state, action) => {
    console.log("Within the reducer with food items:", action.foodItems);
    return updateObject( state, {
        footItems: action.foodItems
    })
}

export default reducer;