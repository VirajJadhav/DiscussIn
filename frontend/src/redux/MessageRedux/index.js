import { MESSAGE_FAILURE, MESSAGE_REQUEST, MESSAGE_SUCCESS } from "./types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  payload: "",
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        payload:
          action.payload !== undefined && action.payload !== null
            ? action.payload
            : "Message Success",
        error: false,
        message: "",
      };
    case MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message || "Message Error",
        payload: "",
      };
    default:
      return state;
  }
};
