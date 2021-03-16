import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
	vendorData: {
		pictureRef: '',
		ratingRef: '',
		menuId: '',
		availability: '',
		currentOrderRef: ''
	},
	error: ''
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.ADD_VENDOR: return addVendor(state, action);
		default: return state;
	}
};

export default reducer;