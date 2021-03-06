import * as actionTypes from './actionTypes';

export const createStripeSession = (email, uid)  => {
        return dispatch => {
            window.location.href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://us-central1-bakely-server.cloudfunctions.net/authorizeStripe&client_id=ca_IxdJMFzUMp2nNiM0vZpFcgUNqYp9hR68&state=' + uid; 
            return dispatch(loadingStart());
    };
};
export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    };
};


