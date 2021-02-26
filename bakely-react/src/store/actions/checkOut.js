import { Stripe } from '../../firebase';
import { db } from '../../firebase';

import * as actionTypes from './actionTypes';

export const createStripeSession = (email) => {
    const user = await db.collection('users').where('email', '==', email).get()[0];
    const stripeAccount = user.stripeAccount ?? 'acct_1IODhWJIqj2eXYKr';
    return dispatch => {
        dispatch(loadingStart());
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Make sure the user is added here
                dispatch(loginSuccess(userCredential.user));
            })
            .catch(err => {
                console.log("error was", err.code);
                switch (err.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    default:
                        break;
                }
                dispatch(loginFail(err.response.data.error));
            });
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



