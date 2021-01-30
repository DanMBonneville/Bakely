import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	vendors: [],
	error: ''
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.ADD_VENDOR: return addVendor(state, action);
		default: return state;
	}
};

const addVendor = (state, action) => {
	return updateObject(state, {
		vendors: state.vendors.concat(action.newVendor),
		error: ''
	});
}

export default reducer;