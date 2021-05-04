import * as actionTypes from './actionTypes';
import { db } from '../../firebase';
import axios from 'axios';
export const getClientSetupSecret = (uid)  => {
        return dispatch => {
            db.collection("stripe_customers").doc(uid).get().then(user => {
                    dispatch(updateClientSetupSecret(user.data().setup_secret));
                    return dispatch(paymentsLoadingComplete());
            }).catch(error => {
                console.log("Error in getting setup secret ", error);
            });
    };
};
export const createNewSetupIntent = (uid) => {
    return dispatch => {
        axios.post('https://us-central1-bakely-server.cloudfunctions.net/createNewSetupIntent',
        { uid: uid }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(res => {
            if(res.success) {
                return dispatch(getClientSetupSecret(uid));
            }
        }).catch(e => {
            console.log('Error in axios post', e);
        });
    };
};
export const updateClientSetupSecret = (client_setup_secret) => {
    return {
        type: actionTypes.GET_CLIENT_SETUP_SECRET,
        client_setup_secret: client_setup_secret
    }
};
export const storePaymentMethod = (payment_method_doc) => {
    return dispatch => {
        db.collection('payment_methods').add(payment_method_doc).then(res => {
            return {
                type: actionTypes.PAYMENTS_CARD_ADD_COMPLETE
            }
        }).catch(error => {
            console.log("Error in storing payment token ", error);
        });
    };
}
export const paymentsLoadingComplete = () => {
    return {
        type: actionTypes.PAYMENTS_LOADING_COMPLETE
    };
};


