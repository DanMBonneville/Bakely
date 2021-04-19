import * as actionTypes from '../actions/actionTypes';

import { updateObject } from "../../shared/utility";

const initialState = {
	userData: {
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		stripeLink: '',
		role: ''
	},
	vendorData: {
		pictureRef: '',
		ratingRef: '',
		availability: '',
		currentOrderRef: ''
	},
	searchValue: '',
	foodItems: [],
	recentOrders: [],
	favorites: [],
	error: ''
}

const userReducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SET_CURRENT_USER_DATA: return setCurrentUserData(state, action);
		case actionTypes.UPDATE_ROLE: return updateRole(state, action);
		case actionTypes.SET_SEARCH_VALUE: return setSearchValue(state, action);
		default: return state;
	}
};

const setSearchValue = (state, action) => {
	return updateObject(state, {
		searchValue: action.searchValue
	})
}

const setCurrentUserData = (state, action) => {
	return updateObject(state, {
		userData: action.userData
	})
}

const updateRole = (state, action) => {
	return updateObject(state, {
		userData: {
			...state.userData,
			role: action.role
		}
	})
}

export default userReducer;