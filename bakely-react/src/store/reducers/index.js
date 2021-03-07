import { combineReducers } from 'redux';

import vendorReducer from './vendorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
    vendor: vendorReducer,
    auth: authReducer,
    user: userReducer
});