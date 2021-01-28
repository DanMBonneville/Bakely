import * as actionTypes from './actionTypes'
import { auth, db } from '../../firebase';

export const signUp = (user) => {
    return dispatch => {
        dispatch(loadingStart());
        auth.createUserWithEmailAndPassword(user.data.email, user.data.password)
            .then( res => {
                console.log("User created succesfully with response: ", res);
                setPermissionsForUser(res.user.uid, user.role)
                    .then( res => {
                        const newUser = {...user};
                        delete newUser.data.password;
                        saveUserToDataBase(newUser)
                    });
            })
            .catch(err => {
                console.log("Error while creating user with Email and Password : ", err);
                switch(err.code){
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                    case 'auth/operation-not-allowed':
                    case 'auth/weak-password': 
                    default : 
                        break;
                }
            });
        
    }
}

function setPermissionsForUser(uid, role){
    console.log("Setting permissions...");
    const isVendor = (role === 'vendor');
    return auth.setCustomUserClaims(uid, {vendor: isVendor});
}

function saveUserToDataBase(user){
    console.log("User data: ", user);
    if(user.role === 'vendor'){
        vendorSignUp(user);
    }else if(user.role === 'customer'){
        customerSignUp(user);
    }else{
        console.log("User was not added to the database");
    }
}

function vendorSignUp(newVendor) {
    return dispatch => {
        db.collection('vendors').add(newVendor)
            .then(response => {
                console.log("Success response: " + response.data )
                dispatch(vendorSignUpSuccess(newVendor));
            })
            .catch(error => {
                console.log("Error response", error.data);
                dispatch(vendorSignUpFail(error));
            });
    };
};

function customerSignUp(newCustomer) {
    return dispatch => {
        db.collection('customers').add(newCustomer)
            .then(response => {
                dispatch(customerSignUpSuccess(newCustomer));
            })
            .catch(error => {
                dispatch(customerSignUpFail(error));
            });
    };
};

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    };
};
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