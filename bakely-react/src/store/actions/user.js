import { auth, db } from '../../firebase';
import * as actionTypes from './actionTypes';

export const loadingStart = () => { return { type: actionTypes.LOADING_START } };
export const loadingEnd = () => { return { type: actionTypes.LOADING_END } };


export const updateRole = (role) => {
    return {
        type: actionTypes.UPDATE_ROLE,
        role: role
    }
}

export const 

export const addMenuItem = () => {
    return dispatch => {
        dispatch(loadingStart);
        // add connection here
    }
}

export const setUserRole = (user, role) => {
    return dispatch => {
        dispatch(loadingStart);
        db.collection("users").doc(user.uid).update({
            role: role
        }).then(
            dispatch(updateRole(role))
        )
        
    }
}