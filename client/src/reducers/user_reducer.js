import {
  LOGIN_USER_SUCCESS_ACTION,
  LOGIN_USER_FAILURE_ACTION,
  SIGNUP_USER_SUCCESS_ACTION,
  SIGNUP_USER_FAILURE_ACTION,
  UPLOAD_POST_SUCCESS_ACTION,
  UPLOAD_POST_FAILURE_ACTION,
  GET_POST_SUCCESS_ACTION,
  GET_POST_FAILURE_ACTION
} from "../actions/Type";
import { toast } from "react-semantic-toasts";

const CANNON_STATE = {};

export default function (state = CANNON_STATE, action) {
  state = Object.assign({}, state, {});
  switch (action.type) {
    case LOGIN_USER_SUCCESS_ACTION:
      state.token = action.payload.token;
      setTimeout(() => {
        toast({
          type: "warning",
          title: action.payload.message,
          description: "",
          time: 3000,
        });
      }, 0);
      state.loginError = false;
      return state;
    case LOGIN_USER_FAILURE_ACTION:
      state.loginError = true;
      return state;

    case SIGNUP_USER_SUCCESS_ACTION:
      state.token = action.payload.token;
      setTimeout(() => {
        toast({
          type: "warning",
          title: action.payload.message,
          description: "",
          time: 3000,
        });
      }, 0);
      state.signupError = false;
      return state;
    case SIGNUP_USER_FAILURE_ACTION:
      state.signupError = true;
      return state;
    case UPLOAD_POST_SUCCESS_ACTION:
      state.posted =action.payload.save;
      state.postFailure = false;
      return state;
    case UPLOAD_POST_FAILURE_ACTION:
      state.postFailure = true;
      return state;
    case GET_POST_SUCCESS_ACTION:
      state.post = action.payload.imageData;
      state.postError = false;
      return state;
    case GET_POST_FAILURE_ACTION:
      state.postError = true;
      return state;

  }
  return state;
}
