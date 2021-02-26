import { auth, db } from '../../firebase';
import * as actionTypes from './actionTypes';

/*
    Section: Updating global state
*/
export const loadingStart = () => {return { type: actionTypes.LOADING_START } };
export const loadingEnd = () => { return { type: actionTypes.LOADING_END } };
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
export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT,
        user: null
    };
};
export const signUpSuccess = (user) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        user: user
    }
};
export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error
    }
};
export const setCurrentUserData = (userData) => {
    return {
        type: actionTypes.SET_CURRENT_USER_DATA,
        userData: userData
    }
}
export const addVendor = (newVendor) => {
    return {
        type: actionTypes.ADD_VENDOR,
        newVendor: newVendor
    }
};
export const checkUserAuth = (user) => {
    return {
        type: actionTypes.CHECK_AUTH_STATE,
        user: user
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

/*
    Section: asyncronous communication with firebase server
*/
export const login = (user) => {
    return dispatch => {
    dispatch(loadingStart);
    db.collection("users").doc(user.UID).get()
        .then( userData => {
            if(!userData.exists){
                dispatch(signUp(user));
            } else{
                dispatch(setCurrentUserData(userData));
                dispatch(loginSuccess(user));
            }
        })
        .catch( err => {
            console.log("This is the error: ", err);
        })
    }
}
export const signUp = (user) => {
    console.log("User to sign up to firestore:", user);
    const userData = setUpUserData(user);
    return dispatch => {
        db.collection('users').doc(user.UID).set(userData)
            .then(() => {
                console.log("Customer signed up successfully");
                dispatch(signUpSuccess(user));
                dispatch(setCurrentUserData(userData));
            })
            .catch(error => {
                console.log("error adding user to the database", error);
                dispatch(signUpFail(error));
            });
    };
}
export const logout = () => {
    return dispatch => {
        dispatch(loadingStart());
        auth.signOut().then(() => {
            dispatch(logoutSuccess());
        });
    }
}
export const authListener = () => {
    return dispatch => {
        dispatch(loadingStart());
        auth.onAuthStateChanged(user => {
            console.log("user called on auth changed:", user);
            dispatch(loadingEnd());
            dispatch(checkUserAuth(user));
        })
    }
}

/*
*  helper methods
*/

const setUpUserData = (user) => {
    const email = user.user.email;
    const names = user.user.displayName.split(" ");
    return {
        email: email,
        firstName: names[0],
        LastName: names[names.length-1],
        address: '',
        stripeLink: ''
    }
}
