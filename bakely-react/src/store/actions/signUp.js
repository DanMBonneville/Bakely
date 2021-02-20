import * as actionTypes from './actionTypes'
import { auth, db } from '../../firebase';

/*
    Section: Updating global state
*/

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    };
};
export const addVendor = (newVendor) => {
    return {
        type: actionTypes.ADD_VENDOR,
        newVendor: newVendor
    }
}
export const signUpSuccess = (user) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        user: user
    }
}
export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error
    }
}

/*
    Section: asyncronous communication with firebase server
*/
export const signUp = (user) => {
    console.log("User to sign up:", user);
    return dispatch => {
        dispatch(loadingStart());
        console.log("User before creating user with email and password", user);
        auth.createUserWithEmailAndPassword(user.data.email, user.data.password)
            .then(res => {
                console.log("User after creating with email and password: ", res);
                const newUser = { ...user };
                console.log("This is the new user right before we delete the password", newUser);
                delete newUser.data.password;
                dispatch(saveUserToDataBase(newUser));
            })
            .catch(err => {
                console.log("Error while creating user with Email and Password : ", err);
                let message = '';
                switch (err.code) {
                    case 'auth/email-already-in-use': message = "Email already in use";
                        break;
                    case 'auth/invalid-email': message = "Invalid Email";
                        break;
                    case 'auth/operation-not-allowed': message = "Operation not allowed";
                        break;
                    case 'auth/weak-password': message = "Password must fit some criteria... figure out what that is"
                        break
                    default:
                        break;
                }
                dispatch(signUpFail(message));
            });

    }
}
export function saveUserToDataBase(newUser) {
    return dispatch => {
        db.collection('users').doc(newUser.data.email).set(newUser)
            .then(response => {
                console.log("Customer signed up successfully:", response.data);
                dispatch(signUpSuccess(newUser));
            })
            .catch(error => {
                console.log("error adding user to the database");
                dispatch(signUpFail(error));
            });
    };
};

// figure outy flow later
export function vendorSignUp(newVendor) {
    return dispatch => {
        db.collection('vendors').doc(newVendor.data.email).set(newVendor)
            .then(response => {
                console.log("Vendor signed up successfully:" + response.data);
                dispatch(addVendor(newVendor));
                dispatch(signUpSuccess(newVendor));
            })
            .catch(error => {
                console.log("Error response", error.data);
                dispatch(signUpFail(error));
            });
    };
};