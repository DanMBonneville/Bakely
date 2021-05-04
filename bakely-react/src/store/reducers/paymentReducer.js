import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    client_secret: null,
    paymentsloadingComplete: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CLIENT_SETUP_SECRET: return updateClientSetupSecret(state, action);
        case actionTypes.PAYMENTS_LOADING_COMPLETE: return loadingComplete(state, action);
        default: return state;
    }
};

const updateClientSetupSecret = (state, action) => {
	return updateObject(state, { 
		client_secret: action.client_setup_secret
	});
}

const loadingComplete = (state, action) => {
	return updateObject(state, { 
		paymentsloadingComplete: true
	});
}

export default reducer;