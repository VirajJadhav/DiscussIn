import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  payload: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload || "",
        error: false,
        message: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message || "Error occured in login",
      };
    default:
      return state;
  }
};
