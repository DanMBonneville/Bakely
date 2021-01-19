import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    customerRedirectPath: '/'
}

const customerSignUpStart = (state) => {
	return updateObject(state, {
		loading: true
	});
}

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

const setCustomerRedirectPath = (state, action) => {
    return updateObject(state, { customerRedirectPath: action.path })
}

const customerReducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.CUSTOMER_SIGN_UP_START: return customerSignUpStart(state);
		case actionTypes.CUSTOMER_SIGN_UP_SUCCESS: return customerSignUpSuccess(state, action);
        case actionTypes.CUSTOMER_SIGN_UP_FAIL: return customerSignUpFail(state);
        case actionTypes.SET_CUSTOMER_SIGN_UP_REDIRECT_PATH: return setCustomerRedirectPath(state, action);
		default: return state;
	}
};

export default customerReducer;