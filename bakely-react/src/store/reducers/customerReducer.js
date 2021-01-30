// import * as actionTypes from '../actions/actionTypes';

// import { updateObject } from '../../shared/utility';

const initialState = {
	recentOrders: [],
	favorites: [],
	error: ''
}

const customerReducer = (state = initialState, action) => {
	switch ( action.type ) {
		default: return state;
	}
};

export default customerReducer;