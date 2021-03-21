import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    user: null,
    loading: false,
    loginError: '',
    signUpError: '',
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_START: return loadingStart(state);
        case actionTypes.LOADING_END: return loadingEnd(state);
        case actionTypes.LOGIN_SUCCESS: return login(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.SIGN_UP_SUCCESS: return signUpCustomer(state, action);
		case actionTypes.SIGN_UP_FAIL: return signUnFail(state, action);
        case actionTypes.CHECK_AUTH_STATE: return checkAuthState(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};
const loadingStart = (state) => {return updateObject(state, { error: null, loading: true })};
const loadingEnd = (state) => {return updateObject(state, {loading: false, stripeSetUp: true})}
const login = (state, action) => {
    console.log("Login Successful", action.user);
    return updateObject(state, {
        user: action.user,
        loginError: null
    });
};
const loginFail = (state, action) => {
    console.log("Login Failed");
    return updateObject(state, {
        user: null,
        loginError: action.error
    });
};
const logout = (state) => {
    return updateObject(state, { user: null });
};
const signUpCustomer = (state, action) => {
    return updateObject(state, {
        user: action.user,
        singUpError: null
    });
}
const signUnFail = (state, action) => {
    console.log("Login Failed");
    return updateObject(state, {
        user: null,
        signUpError: action.error
    });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}
const checkAuthState = (state, action) => {
    return updateObject(state, { user: action.user })
}

export default authReducer;