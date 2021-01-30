import * as actionTypes from './actionTypes'
import { auth, db } from '../../firebase';

/*
    Section: asyncronous communication with firebase server
*/
export const signUp = (user) => {
    console.log("User to sign up:", user);
    return dispatch => {
        dispatch(loadingStart());
        auth.createUserWithEmailAndPassword(user.data.email, user.data.password)
            .then(res => {
                console.log("User created succesfully with response: ", res);
                const newUser = { ...user };
                delete newUser.data.password;
                dispatch(saveUserToDataBase(newUser));
            })
            .catch(err => {
                console.log("Error while creating user with Email and Password : ", err);
                switch (err.code) {
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                    case 'auth/operation-not-allowed':
                    case 'auth/weak-password':
                    default:
                        break;
                }
            });

    }
}
export function saveUserToDataBase(user) {
    return dispatch => {
        console.log("User data: ", user);
        if (user.role === 'vendor') {
            dispatch(vendorSignUp(user));
        } else if (user.role === 'customer') {
            dispatch(customerSignUp(user));
        } else {
            console.log("User was not added to the database");
        }
    }
}
export function vendorSignUp(newVendor) {
    return dispatch => {
        db.collection('vendors').add(newVendor)
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
export function customerSignUp(newCustomer) {
    return dispatch => {
        db.collection('customers').add(newCustomer)
            .then(response => {
                console.log("Customer signed up successfully:", response.data);
                dispatch(signUpSuccess(newCustomer));
            })
            .catch(error => {
                dispatch(signUpFail(error));
            });
    };
};

/*
    Section: calls to reducers
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