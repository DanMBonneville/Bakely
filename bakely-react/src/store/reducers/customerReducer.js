import * as actionTypes from '../actions/actionTypes';

import { updateObject } from "../../shared/utility";

// import { updateObject } from '../../shared/utility';

const initialState = {
	userData: {
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		stripeLink: ''
	},
	recentOrders: [],
	favorites: [],
	error: ''
}

const customerReducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SET_CURRENT_USER_DATA: return setCurrentUserData(state, action);
		default: return state;
	}
};

const setCurrentUserData = (state, action) => {
	return updateObject(state, {
		userData: action.userData
	})
}

export default customerReducer;