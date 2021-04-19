import { auth } from '../../firebase';
import * as actionTypes from './actionTypes';

export const createStripeSession = (email, uid)  => {
        return dispatch => {
            console.log('called too soon');
            window.location.href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://us-central1-bakely-server.cloudfunctions.net/authorizeStripe&client_id=ca_IxdJMFzUMp2nNiM0vZpFcgUNqYp9hR68&state=' + uid; 
            return dispatch(loadingStart());
    };
};
export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    };
};
export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const loginSuccess = (user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user: user
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
        user: null
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            //dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
export const loadingEnd = () => {
    return {
        type: actionTypes.LOADING_END
    };
}
export const authListener = () => {
    return dispatch => {
        dispatch(loadingStart());
        auth.onAuthStateChanged(user => {
            dispatch(loadingEnd());
            return {
                type: actionTypes.CHECK_AUTH_STATE,
                user: user
            }
        })
    }
}



