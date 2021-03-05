import { combineReducers } from 'redux';

import vendorReducer from './vendorReducer';
import authReducer from './authReducer';
import customerReducer from './customerReducer';

export default combineReducers({
    vendor: vendorReducer,
    auth: authReducer,
    cust: customerReducer
});