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
    console.log("shefSignUpStart");
    return {
        type: actionTypes.SHEF_SIGN_UP_START
	}
}

// add token here
export const shefSignUp = (newShef) => {
    console.log("preparing to post new shef to the server: ");
    console.log(newShef);
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