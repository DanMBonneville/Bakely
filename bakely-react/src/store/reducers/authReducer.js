import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    user: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_START: return signUpStart(state, action);
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.CHECK_AUTH_STATE: return checkAuthState(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

const signUpStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        error: null,
        loading: false
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const logout = (state, action) => {
    return updateObject(state, { user: null});
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const checkAuthState = (state, action) => {
    return updateObject(state, { user: action.user })
}

export default authReducer;