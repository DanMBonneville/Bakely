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

export const setUserRole = (user, role) => {
    return dispatch => {
        console.log("What is this user: ", user);
        console.log("What is the role: ", role);
        dispatch(loadingStart);
        console.log("this is the uid", user.uid);
        db.collection("users").doc(user.uid).update({
            role: role
        }).then(
            dispatch(updateRole(role))
        )
        
    }
}