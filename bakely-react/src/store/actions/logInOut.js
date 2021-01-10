import axios from 'axios';

import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            //dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const login = (email, password) => {
    console.log("in actions folder reight before dispatching login start", email, password);
    return dispatch => {
        dispatch(loginStart());
        let username = email;
        const postBody = {
            // read as the username on the server
            username,
            password
        };
        let url = 'http://localhost:8080/authenticate';
        axios.post(url, postBody)
            .then(response => {
                console.log("This is the response", response.data);
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localstorage api is baked into the browser
                // this isn't working, I might delet this later
                localStorage.setItem('token', JSON.stringify(response.data.token));
                // localStorage.setItem('expirationDate', expirationDate);
                dispatch(loginSuccess(response));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(loginFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('username');
                dispatch(loginSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};