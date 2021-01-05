import * as actionTypes from './actionTypes'
import axios from '../../axios-instance';

export const shefSignUpSuccess = (formData) => {
    return {
        type: actionTypes.SHEF_SIGN_UP_SUCCESS,
        shefData: formData
        // don't think we need to update the store right away after updating the backend
        // but if we did, it would go right here
    }
}

export const shefSignUpFail = (error) => {
    return {
        type: actionTypes.SHEF_SIGN_UP_FAIL
    }
}

//set loading to true for the spinner
export const shefSignUpStart = () => {
    return {
        type: actionTypes.SHEF_SIGN_UP_START
	}
}

export const customerSignUpSuccess = (formData) => {
    return {
        type: actionTypes.CUSTOMER_SIGN_UP_SUCCESS,
        shefData: formData
    }
}

export const customerSignUpFail = (error) => {
    return {
        type: actionTypes.CUSTOMER_SIGN_UP_FAIL
    }
}

export const customerSignUpStart = () => {
    return {
        type: actionTypes.CUSTOMER_SIGN_UP_START
    }
}

// add token here
export const shefSignUp = (newShef) => {
    return dispatch => {
        dispatch(shefSignUpStart());
        axios.post('/shef-sign-up/add', newShef.shefData)
            .then(response => {
                // potentially pass response.data.name as a param for an id later
                console.log("Success response: " + response.data )
                dispatch(shefSignUpSuccess(newShef));
            })
            .catch(error => {
                console.log(error.data);
                dispatch(shefSignUpFail(error));
            });
    };
};

// add token here too
export const customerSignUp = (newCustomer) => {
    return dispatch => {
        dispatch(customerSignUpStart());
        axios.post('/sign-up/add', newCustomer.customerData)
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