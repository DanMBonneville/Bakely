import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';


const initialState = {
	shefs: []
	//loading: false
}

const shefSignUpSuccess = (state, action) => {
	// id maybe is included as the email
	const newShef = updateObject(action.shefData);
	// old object with , updated properties 
	return updateObject(state, {
		shefs: state.shefs.concat(newShef)
	});
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SHEF_SIGN_UP_START: console.log("shef_sign_up start in reducer");
			return state;
		case actionTypes.SHEF_SIGN_UP_SUCCESS: return shefSignUpSuccess(state, action);
		case actionTypes.SHEF_SIGN_UP_FAIL:
		default: return state;
	}
};

export default reducer;