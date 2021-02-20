import { auth, db } from '../../firebase';

import * as actionTypes from './actionTypes';

export const login = (email, password) => {
    console.log("in actions folder reight before dispatching login start", email, password);
    return dispatch => {
        dispatch(loadingStart());
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log(userCredential);
                const userData = db.collection("users").doc(email).get();
                console.log("This is the userData", userData);
                dispatch(loginSuccess(userCredential.user));
            })
            .catch(err => {
                console.log("error was", err.code);
                let message = '';
                switch (err.code) {
                    case 'auth/invalid-email': message = 'invalid-email';
                    case 'auth/user-disabled': message = 'user-disabled';
                    case 'auth/user-not-found': message = 'user-not-found';
                    case 'auth/wrong-password': message = 'wrong-password';
                    default:
                        break;
                }
                dispatch(loginFail(message));
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



