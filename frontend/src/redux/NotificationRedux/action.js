import { NOTI_CLEAR, NOTI_REQUEST } from "./types";

export const showSuccess = (
  message,
  duration = 3000,
  vertical = "bottom",
  horizontal = "right"
) => async dispatch => {
  dispatch({
    type: NOTI_REQUEST,
    variant: "success",
    message,
    duration,
    vertical,
    horizontal,
  });
};

export const showError = (
  message,
  duration = 3000,
  vertical = "bottom",
  horizontal = "right"
) => async dispatch => {
  dispatch({
    type: NOTI_REQUEST,
    variant: "error",
    message,
    duration,
    vertical,
    horizontal,
  });
};

export const showInfo = (
  message,
  duration = 3000,
  vertical = "bottom",
  horizontal = "right"
) => async dispatch => {
  dispatch({
    type: NOTI_REQUEST,
    variant: "info",
    message,
    duration,
    vertical,
    horizontal,
  });
};

export const clearNoti = () => async dispatch => {
  dispatch({
    type: NOTI_CLEAR,
  });
};
