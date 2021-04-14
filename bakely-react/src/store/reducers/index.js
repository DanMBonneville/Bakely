import { combineReducers } from 'redux';

import vendorReducer from './vendorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import checkoutReducer from './checkoutReducer';
import foodReducer from './foodReducer';

export default combineReducers({
    vendor: vendorReducer,
    auth: authReducer,
    user: userReducer,
    checkout: checkoutReducer,
    food: foodReducer
});