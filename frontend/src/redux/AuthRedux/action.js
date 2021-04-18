import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_REQUEST } from "./types";
import axios from "axios";

const backendURL = global.config.backendURL;

export const login = data => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/auth/login`, data);
    const token = response.data.result.token;
    localStorage.setItem("tokendiscussin", token);
    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data.result.user,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const register = data => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/auth/signup`, data);
    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};
