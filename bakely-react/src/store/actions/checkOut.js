import { auth } from '../../firebase';
//import Stripe from 'stripe';
import * as actionTypes from './actionTypes';

//const STRIPE_PUBLISHABLE_KEY = 'pk_test_51ILi2SDaQgsm4ztYtijcHsltKu6gNMVrjrHiwubwYDibixx2BKSxzrlpOZID5iBoNTDf8MQrpvNZYcgkW1SNpop600C81GkYoA';

export const createStripeSession = (email, password)  => {
        return dispatch => {
            console.log('called too soon');
            window.location.href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/home&client_id=ca_IxdJMFzUMp2nNiM0vZpFcgUNqYp9hR68&state=1abcdefghi'; 
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



