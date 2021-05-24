import { db } from '../../firebase';
import * as actionTypes from './actionTypes';

export const setVendors = (vendors) => {
    return {
        type: actionTypes.SET_ALL_VENDORS,
        vendors: vendors
    }
}

export const clearVendors = () => {
    return dispatch => dispatch(setVendors([]));
}

export const setAllVendors = () => {
    return dispatch => {
        dispatch(clearVendors());
        db.collection("users").get().then(users => {
            const vendors = users.docs.filter(user => {
                return user.data().role === "vendor";
            })
            dispatch(setVendors(vendors));
        })
    }
}