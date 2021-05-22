import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	vendors: []
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SET_ALL_VENDORS: return setVendors(state, action);
		default: return state;
	}
};

const setVendors = (state, action) => {
	console.log("I am in the vendor reducer with this action: ", action);
	return updateObject(state, {
		vendors: action.vendors
	})
}

export default reducer;