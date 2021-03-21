import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	vendors: []
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.GET_VENDORS: return getVendors(state, action);
		default: return state;
	}
};

const getVendors = (state, action) => {
	return updateObject(state, { 
		vendors: action.vendors 
	})
}

export default reducer;