import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	shefs: [],
	error: ''
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SHEF_SIGN_UP_SUCCESS: return shefSignUpSuccess(state, action);
		case actionTypes.SHEF_SIGN_UP_FAIL: return shefSignUpFail(state);
		default: return state;
	}
};

const shefSignUpSuccess = (state, action) => {
	// id maybe is included as the email
	const newShef = updateObject(action.shefData);
	// old object with , updated properties 
	return updateObject(state, {
		shefs: state.shefs.concat(newShef),
		loading: false,
	});
}

const shefSignUpFail = (state) => {
	// Add a fail message here?
	return updateObject(state, {
		loading: false,
	});
}

export default reducer;