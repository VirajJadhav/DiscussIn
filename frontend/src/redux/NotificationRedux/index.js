import { NOTI_REQUEST, NOTI_CLEAR } from "./types";

const initialState = {
  message: "",
  duration: 0,
  show: false,
  vertical: "bottom",
  horizontal: "right",
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTI_REQUEST:
      return {
        variant: action.variant,
        message: action.message,
        duration:
          action.duration !== undefined && action.duration !== null
            ? action.duration
            : 3000,
        vertical:
          action.vertical !== undefined && action.vertical !== null
            ? action.vertical
            : "bottom",
        horizontal:
          action.horizontal !== undefined && action.horizontal !== null
            ? action.horizontal
            : "right",
        show: true,
      };
    case NOTI_CLEAR:
      return {
        show: false,
      };
    default:
      return state;
  }
};
