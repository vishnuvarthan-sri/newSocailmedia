import axios from 'axios';
import config from '../config';

export const API_URL = config['api_url'];

// axios.defaults.baseURL = API_URL;

  
  export const LOGIN_USER_SUCCESS_ACTION='login_user_success';
  export const LOGIN_USER_FAILURE_ACTION ='login_user_failure';
  export const SIGNUP_USER_SUCCESS_ACTION='signup_user_success';
  export const SIGNUP_USER_FAILURE_ACTION ='signup_user_failure';
  export const UPLOAD_POST_SUCCESS_ACTION='upload_post_success';
  export const UPLOAD_POST_FAILURE_ACTION='upload_post_failure';
  export const GET_POST_SUCCESS_ACTION='get_post_success';
  export const GET_POST_FAILURE_ACTION='get_post_failure';
