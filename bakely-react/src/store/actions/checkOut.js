import { auth, db } from '../../firebase';
//import Stripe from 'stripe';
import * as actionTypes from './actionTypes';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51ILi2SDaQgsm4ztYtijcHsltKu6gNMVrjrHiwubwYDibixx2BKSxzrlpOZID5iBoNTDf8MQrpvNZYcgkW1SNpop600C81GkYoA';

export const createStripeSession = (email, password)  => {
    const user = db.collection('users').where('email', '==', email).get().then((dbObj) => { return dbObj.stripeAccount ? dbObj.stripeAccount : 'acct_1IODhWJIqj2eXYKr' });
    console.log(user);

        return dispatch => {
        dispatch(loadingStart());
        /*const stripe = new Stripe(STRIPE_PUBLISHABLE_KEY);
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');
        cardElement.on('change', ({ error }) => {
        const displayError = document.getElementById('error-message');
        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
        });*/
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



