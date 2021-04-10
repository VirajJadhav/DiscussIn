import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from "./types";

export const login = (userName, password) => async dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      message: error.message,
    });
  }
};
