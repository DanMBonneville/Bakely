import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';


const initialState = {
	shefs: [],
	loading: false,
	bakerSignUpRedirectPath: '/'
}

const shefSignUpStart = (state) => {
	return updateObject(state, {
		loading: true
	});
}

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

const setBakerSignUpRedirectPath = (state, action) => {
    return updateObject(state, { bakerSignUpRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SHEF_SIGN_UP_START: return shefSignUpStart(state);
		case actionTypes.SHEF_SIGN_UP_SUCCESS: return shefSignUpSuccess(state, action);
		case actionTypes.SHEF_SIGN_UP_FAIL: return shefSignUpFail(state);
		case actionTypes.SET_BAKER_SIGN_UP_REDIRECT_PATH: return setBakerSignUpRedirectPath(state, action);
		default: return state;
	}
};

export default reducer;