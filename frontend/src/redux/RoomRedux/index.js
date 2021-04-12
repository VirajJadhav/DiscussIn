import { ROOM_FAILURE, ROOM_REQUEST, ROOM_SUCCESS, CLEAR_STATE } from "./types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  payload: "",
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload || "Room Success",
        error: false,
        message: "",
      };
    case ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message || "Room Error",
      };
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};
