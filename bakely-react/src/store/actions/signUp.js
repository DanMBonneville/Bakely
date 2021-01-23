import * as actionTypes from './actionTypes'
import firebase from '../../firebase';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGN_UP_START
    }
}

export const vendorSignUpSuccess = (formData) => {
    return {
        type: actionTypes.VENDOR_SIGN_UP_SUCCESS,
        vendorData: formData
        // don't think we need to update the store right away after updating the backend
        // but if we did, it would go right here
    }
}

export const vendorSignUpFail = (error) => {
    return {
        type: actionTypes.VENDOR_SIGN_UP_FAIL
    }
}

export const customerSignUpSuccess = (formData) => {
    return {
        type: actionTypes.CUSTOMER_SIGN_UP_SUCCESS,
        vendorData: formData
    }
}

export const customerSignUpFail = (error) => {
    return {
        type: actionTypes.CUSTOMER_SIGN_UP_FAIL
    }
}

export const signUp = (user, role) => {
    return dispatch => {
        dispatch(signUpStart());
        firebase.auth()
            .createUserWithEmailAndPassword(user.data.email, user.data.password)
            .then(response => {
                console.log("The response from create user with email and password is ", response);
                const newUser = {...user};
                delete newUser.password;
                if(role === vendor){
                    vendorSignUp(newUser);
                }else if(role === customer){
                    customerSignUp(newUser);
                }
            })
            .catch(err => {
                console.log("What should I do with this err? : ", err)
            });
    }
}

export const vendorSignUp = (newVendor) => {
    return dispatch => {
        firebase.firestore.collection('vendors').add(newVendor)
            .then(response => {
                // potentially pass response.data.name as a param for an id later
                console.log("Success response: " + response.data )
                dispatch(vendorSignUpSuccess(newVendor));
            })
            .catch(error => {
                console.log(error.data);
                dispatch(vendorSignUpFail(error));
            });
    };
};

export const customerSignUp = (newCustomer) => {
    return dispatch => {
        dispatch(customerSignUpStart());
        firebase.firestore.collection('customers').add(newCustomer)
            .then(response => {
                // potentially pass response.data.name as a param for an id later
                console.log("Success response: " + response.data)
                dispatch(customerSignUpSuccess(newCustomer));
            })
            .catch(error => {
                console.log(error.data);
                dispatch(customerSignUpFail(error));
            });
    };
};