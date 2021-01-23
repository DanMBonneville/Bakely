import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	// will I need this ?
	// yes for recent orders and stuff
	error: ''
}

const customerReducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.CUSTOMER_SIGN_UP_SUCCESS: return customerSignUpSuccess(state, action);
        case actionTypes.CUSTOMER_SIGN_UP_FAIL: return customerSignUpFail(state);
		default: return state;
	}
};

const customerSignUpSuccess = (state, action) => {
    console.log("Customer action page", action);
	return updateObject(state, {
		loading: false
	});
}

const customerSignUpFail = (state) => {
	// Add a fail message here?
	return updateObject(state, {
		loading: false
	});
}

export default customerReducer;