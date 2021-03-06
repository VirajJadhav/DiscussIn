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
        ...initialState,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        error: false,
        loading: false,
        payload:
          action.payload !== undefined && action.payload !== null
            ? action.payload
            : "Auth Success",
        message: "",
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message || "Auth Error",
        payload: "",
      };
    default:
      return state;
  }
};
