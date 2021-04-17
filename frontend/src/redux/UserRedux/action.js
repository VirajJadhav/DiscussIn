import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./types";
import axios from "axios";

const backendURL = global.config.backendURL;

export const checkUser = userName => async dispatch => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await axios.get(
      `${backendURL}/auth/verify/user/${userName}`
    );
    dispatch({
      type: USER_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: USER_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const getUserData = userName => async dispatch => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await axios.get(`${backendURL}/auth/user/${userName}`);
    dispatch({
      type: USER_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: USER_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};
