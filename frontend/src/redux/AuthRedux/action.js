import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_REQUEST } from "./types";
import axios from "axios";

const backendURL = global.config.backendURL;

export const login = data => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/auth/login`, data);
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

export const checkUser = userName => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const response = await axios.get(
      `${backendURL}/auth/verify/user/${userName}`
    );
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

export const getUserData = userName => async dispatch => {
  dispatch({
    type: AUTH_REQUEST,
  });
  try {
    const response = await axios.get(`${backendURL}/auth/user/${userName}`);
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
