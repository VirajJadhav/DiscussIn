import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from "./types";

export const login = (userName, password) => {
  return async function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      console.log(userName, password);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        message: error.message,
      });
    }
  };
};
