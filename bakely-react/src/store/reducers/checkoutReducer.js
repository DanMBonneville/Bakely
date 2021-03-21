import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    user: null,
    error: null,
    loading: false,
    redirectPath: '/'
};

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CHECKOUT_SESSION: return createSession(state);
        case actionTypes.INITIALIZE_CHECKOUT_SESSION: return initializeSession(state, action);
        case actionTypes.CHECKOUT_CONFIRMED: return confirmCheckout(state);
        case actionTypes.CANCEL_CHECKOUT: return checkoutCancelled(state);
        default: return state;
    }
};
const initializeSession = (state, action) => {
    return updateObject(state, { loading: false, sessionId: action.sessionId});
};
const createSession = (state) => {
    return updateObject(state, { error: null, loading: true });
};

const confirmCheckout = (state, action) => {
    return updateObject(state, { sessionId: null, invoiceNumber: action.invoiceNumber, loading: false });
};
const checkoutCancelled = (state) => {
    return updateObject(state, { sessionId: null, loading: false })
}

export default checkoutReducer;