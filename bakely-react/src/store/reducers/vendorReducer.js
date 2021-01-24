import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	vendors: [],
	error: ''
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.VENDOR_SIGN_UP_SUCCESS: return vendorSignUpSuccess(state, action);
		case actionTypes.VENDOR_SIGN_UP_FAIL: return vendorSignUpFail(state);
		default: return state;
	}
};

const vendorSignUpSuccess = (state, action) => {
	// id maybe is included as the email
	const newVendor = updateObject(action.vendorData);
	// old object with , updated properties 
	return updateObject(state, {
		vendors: state.vendors.concat(newVendor),
		loading: false,
	});
}

const vendorSignUpFail = (state) => {
	// Add a fail message here?
	return updateObject(state, {
		loading: false,
	});
}

export default reducer;