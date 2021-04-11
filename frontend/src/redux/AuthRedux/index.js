import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from "./types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  payload: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload || "Auth Success",
        error: false,
        message: "",
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message || "Auth Error",
      };
    default:
      return state;
  }
};
