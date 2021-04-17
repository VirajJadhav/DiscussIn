import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "./types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  payload: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        payload:
          action.payload !== undefined && action.payload !== null
            ? action.payload
            : "User Success",
        error: false,
        message: "",
      };
    case USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message || "User Error",
        payload: "",
      };
    default:
      return state;
  }
};
