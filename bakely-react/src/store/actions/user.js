import { db } from '../../firebase';
import * as actionTypes from './actionTypes';

export const loadingStart = () => { return { type: actionTypes.LOADING_START } };
export const loadingEnd = () => { return { type: actionTypes.LOADING_END } };

export const setSearchValue = (value) => { 
    return {
        type: actionTypes.SET_SEARCH_VALUE,
        searchValue: value
    }
}

export const updateRole = (role) => {
    return {
        type: actionTypes.UPDATE_ROLE,
        role: role
    }
}

// TODO: add vendor details when making a vendor
export const setUserRole = (user, role) => {
    return dispatch => {
        dispatch(loadingStart);
        db.collection("users").doc(user.uid).update({
            role: role
        }).then( ()=> {
            dispatch(updateRole(role));
        })
    }
}