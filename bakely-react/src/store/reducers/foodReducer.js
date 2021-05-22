import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    foodItems: [],
    selectedFoodItem: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MENU_ITEM: return addFoodItemToStore(state, action);
        case actionTypes.EDIT_MENU_ITEM: return editFoodItem(state, action);
        case actionTypes.CLEAR_FOOD_ITEMS: return clearFoodItems(state);
        case actionTypes.REMOVE_MENU_ITEM: return removeFoodItem(state, action);
        case actionTypes.SET_SELECTED_ITEM: return setSelectedItem(state, action);
        default: return state;
    }
};

const addFoodItemToStore = (state, action) => {
    let newFoodList = [...state.foodItems];
    const newFoodItem = {
        ...action.foodItemToAdd,
        foodId: action.foodId,
    };
    newFoodList.push(newFoodItem);
	return updateObject(state, { 
		foodItems: newFoodList
	})
}

const editFoodItem = (state, action) => {
    let newFoodList = [...state.foodItems];
    const newFoodItem = {...action.foodItemToAdd};
    let index = newFoodList.length > 0 ? 
        newFoodList.findIndex(item => item.foodId === newFoodItem.foodId): -1;
    if(index > -1){
        newFoodList.splice(index, 1, newFoodItem);
    } else{
        newFoodList.push(newFoodItem);
    }
	return updateObject(state, { 
		foodItems: newFoodList
	})
}

const removeFoodItem = (state, action) => {
    let newFoodList = [...state.foodItems];
    let index = newFoodList.length > 0 ? 
        newFoodList.findIndex(item => item.foodId === action.foodId): -1;
    newFoodList.splice(index, 1);
	return updateObject(state, { 
		foodItems: newFoodList
	});
}

const clearFoodItems = (state) => {
    return updateObject(state, { 
		foodItems: []
	})
}

const setSelectedItem = (state, action) => {
    const selectedItem = state.foodItems.find(item => {
        return item.foodId === action.selectedItemId;
    });
    return updateObject(state,  {
        selectedFoodItem: selectedItem
    });
}

export default reducer;