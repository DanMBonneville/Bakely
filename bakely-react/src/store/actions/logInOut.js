import fire from '../../firebase';

import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user: user
    };
};
export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
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

export const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
        return {
            type: actionTypes.CHECK_AUTH_STATE,
            user: user
        }
    })
}

export const login = (email, password) => {
    console.log("in actions folder reight before dispatching login start", email, password);
    return dispatch => {
        dispatch(loginStart());
        fire.auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                dispatch(loginSuccess(response));
            })
            .catch(err => {
                switch(err.code){
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password': 
                    default : 
                        break;
                }
                dispatch(loginFail(err.response.data.error));
            });
    };
};

