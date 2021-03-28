import axios from 'axios';
// import { template } from 'underscore';
import * as types from './Type';

export const login = (email,psw) => {
    return function(dispatch) {
        axios
            .post( '/login',{email:email,psw:psw})
            .then(function(response) {
                
                dispatch({
                    type: types.LOGIN_USER_SUCCESS_ACTION,
                    payload: response.data
                });
            })
            .catch(function(error) {
                dispatch({
                    type: types.LOGIN_USER_FAILURE_ACTION,
                    payload: error
                });
            });
    };
};

export const signup = (email,uname,psw,Cnpsw) => {
    return function(dispatch) {
        axios
            .post( '/signup',{email:email,psw:psw,uname:uname,Cnpsw:Cnpsw})
            .then(function(response) {
                
                dispatch({
                    type: types.SIGNUP_USER_SUCCESS_ACTION,
                    payload: response.data
                });
            })
            .catch(function(error) {
                dispatch({
                    type: types.SIGNUP_USER_FAILURE_ACTION,
                    payload: error
                });
            });
    };
};

export const upload = (photo,text) => {
    let file = new FormData();
    file.append('photo',photo)
    file.append('text',text)
    return function(dispatch) {
        axios
            .post('/page',file)
            .then(function(response) {
                
                dispatch({
                    type: types.UPLOAD_POST_SUCCESS_ACTION,
                    payload: response.data
                });
            })
            .catch(function(error) {
                dispatch({
                    type: types.UPLOAD_POST_FAILURE_ACTION,
                    payload: error
                });
            });
    };
};
export const image = () => {
    return function(dispatch) {
        axios
            .get('/image')
            .then(function(response) {
                
                dispatch({
                    type: types.GET_POST_SUCCESS_ACTION,
                    payload: response.data
                });
            })
            .catch(function(error) {
                dispatch({
                    type: types.GET_POST_FAILURE_ACTION,
                    payload: error
                });
            });
    };
};